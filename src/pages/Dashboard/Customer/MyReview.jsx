import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/my-reviews/${user.email}`);
        setReviews(res.data.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user?.email, axiosSecure]);

  // Delete review
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.success) {
        Swal.fire("Deleted!", "Review removed successfully", "success");
        setReviews(reviews.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Open edit modal
  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedRating(review.rating);
    setUpdatedComment(review.comment);
  };

  // Update review
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.put(`/reviews/${editingReview._id}`, {
        rating: Number(updatedRating),
        comment: updatedComment,
      });
      if (res.data.success) {
        Swal.fire("Updated!", "Review updated successfully", "success");
        setReviews(
          reviews.map((r) =>
            r._id === editingReview._id
              ? { ...r, rating: updatedRating, comment: updatedComment }
              : r
          )
        );
        setEditingReview(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {" "}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
        My Reviews{" "}
      </h1>
      {reviews.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          You have no reviews yet.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-tr from-white via-orange-50 to-orange-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-orange-200 flex flex-col justify-between transition-colors"
          >
            <div>
              <h2 className="text-xl font-bold mb-2 text-orange-700">
                {review.mealName}
              </h2>
              <p className="mb-1 font-medium text-gray-700">
                Rating:{" "}
                <span className="text-yellow-500 font-bold">
                  {review.rating} ⭐
                </span>
              </p>
              <p className="mb-1 text-gray-600">{review.comment}</p>
            </div>
            <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
              <span>{new Date(review.date).toLocaleString()}</span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition"
                  onClick={() => handleEdit(review)}
                >
                  Update
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Edit Modal */}
      <AnimatePresence>
        {editingReview && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 p-4 backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white via-orange-50 to-orange-100 p-6 rounded-3xl shadow-2xl w-full max-w-md border border-orange-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-orange-600">
                Edit Review
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={updatedRating}
                    onChange={(e) => setUpdatedRating(e.target.value)}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium mb-1">Comment</label>
                  <textarea
                    value={updatedComment}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <motion.button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Update
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyReview;
