import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const reviewSliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 1 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        setReviews(res.data.data); // Adjust based on your API response
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  return (
    <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 py-20 rounded-3xl shadow-lg">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-12 text-center">
        What Our Customers Say
      </h2>

      {reviews.length > 0 ? (
        <Slider {...reviewSliderSettings}>
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              className="p-4"
              whileHover={{ scale: 1.03 }}
            >
              <div
                className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between 
                h-[200px] sm:h-[200px] md:h-[240px] lg:h-[260px] border border-gray-100 
                hover:shadow-purple-400 transition-all duration-300"
              >
                <h2 className="text-xl font-bold mb-2 text-orange-700">
                  {review.mealName}
                </h2>
                {/* Comment */}
                <p
                  className="text-gray-700 text-lg mb-6 italic overflow-hidden overflow-ellipsis 
                max-h-[120px] sm:max-h-[150px] md:max-h-[170px]"
                >
                  "{review.comment}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={review.reviewerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-300"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex mt-1 gap-1 text-yellow-400">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </section>
  );
};

export default ReviewsSection;
