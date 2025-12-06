import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Star, Heart } from "lucide-react";
import Swal from "sweetalert2";

const MealsDetailsWithReviews = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  // Fetch meal details
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosSecure.get(`/meals/${id}`);
        setMeal(res.data.data);
      } catch (err) {
        console.error("Failed to fetch meal data:", err);
      }
    };
    fetchMeal();
  }, [id, axiosSecure]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewRes = await axiosSecure.get(`/reviews/${id}`);
        setReviews(reviewRes.data.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [id, axiosSecure]);

  // Submit review
  const submitReview = async () => {
    if (!user)
      return Swal.fire("Error", "Please login to submit a review", "error");

    const reviewData = {
      foodId: id,
      reviewerName: user.name || user.displayName || "Anonymous",
      reviewerImage: user.photoURL || "https://i.ibb.co/sample-user.jpg",
      rating: Number(newReview.rating) || 5,
      comment: newReview.comment.trim(),
      date: new Date().toISOString(),
    };

    if (!reviewData.comment)
      return Swal.fire("Error", "Review comment cannot be empty", "error");

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.success) {
        const reviewWithId = { ...reviewData, _id: res.data.data.insertedId };
        setReviews([reviewWithId, ...reviews]);
        Swal.fire("Success", "Review submitted successfully!", "success");
        setNewReview({ rating: 5, comment: "" });
      }
    } catch (err) {
      console.error("Submit review error:", err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  // Add to favorites
  const addToFavorites = async () => {
    if (!user)
      return Swal.fire("Error", "Please login to add favorites", "error");
    if (!meal) return Swal.fire("Info", "Meal data not loaded yet", "info");

    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: Number(meal.price),
      addedTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);
      Swal.fire(
        res.data.success ? "Success" : "Info",
        res.data.message,
        res.data.success ? "success" : "info"
      );
    } catch (err) {
      console.error("Add to favorites error:", err);
      Swal.fire("Error", "Failed to add favorite", "error");
    }
  };

  if (!meal)
    return <p className="text-center py-10">Loading meal details...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Favorites Button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addToFavorites}
          className="bg-red-500 text-white px-6 py-2 rounded-xl shadow hover:bg-red-400 font-semibold flex items-center gap-2"
        >
          <Heart size={18} /> Add to Favorites
        </motion.button>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-3xl font-bold text-orange-700 mb-6">Reviews</h2>
        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {reviews.map((rev) => (
            <motion.div
              key={rev._id}
              className="bg-white rounded-xl shadow p-4 flex gap-4 items-start border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={rev.reviewerImage}
                alt={rev.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {rev.reviewerName}
                  </span>
                  <span className="text-yellow-500 font-bold flex items-center gap-1">
                    <Star size={16} fill="gold" /> {rev.rating}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{rev.comment}</p>
                <small className="text-gray-400">
                  {new Date(rev.date).toLocaleString()}
                </small>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Review */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-orange-700 mb-4">
            Give a Review
          </h3>
          <textarea
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ⭐
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitReview}
              className="bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-orange-500"
            >
              Submit Review
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetailsWithReviews;
