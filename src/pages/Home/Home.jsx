import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaArrowRight, FaLeaf, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewsSection from "./ReviewsSection";
import Container from "../../components/Shared/Container";
import { Typewriter } from "react-simple-typewriter";

const heroImages = [
  "/image9.jpg",
  "/image3.jpg",
  "/image1.jpg",
  "/image10.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image11.jpg",
  "/image6.jpg",
  "/image2.jpg",
  "/image8.jpg",
];

const heroSliderSettings = {
  dots: true,
  infinite: true,
  speed: 1200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
};

const HomePage = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await axiosSecure.get("/meals");
      setMeals(res.data.data);
    };
    fetchMeals();
  }, [axiosSecure]);

  return (
    <Container>
      <div className="space-y-20">
        {/* Hero Section */}
        <motion.section className="relative h-[60vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden rounded-2xl">
          {/* Hero Image Slider */}
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Slider {...heroSliderSettings}>
              {heroImages.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={`hero-${idx}`}
                    className="w-full h-[60vh] object-cover filter brightness-75"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white px-2 flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 min-h-[4rem] bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              {/* min-h ensures text container height is fixed */}
              <span>
                <Typewriter
                  words={[
                    "Discover Delicious Meals",
                    "Freshly Cooked",
                    "Delivered To Your Doorstep",
                    "Savor the Taste of Perfection",
                    "Healthy & Nutritious",
                    "Straight from Our Kitchen to Your Door",
                    "Irresistible Meals, Every Time",
                    "Fresh, Flavorful, Fast",
                    "From Our Stove to Your Table",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-6">
              Enjoy freshly prepared meals every single day
            </p>

            {/* Button separated from typewriter text */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/meals"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
              >
                Order Now <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Daily Meals Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Daily Meals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <img
                  src={meal.foodImage}
                  alt={meal.mealName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {meal.mealName}
                  </h3>
                  <p className="text-gray-600">{meal.ingredients.join(", ")}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-orange-500">
                      ${meal.price}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <FaStar /> {meal.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* Extra Section */}
        <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 rounded-3xl shadow-lg">
          <motion.div
            className="md:w-1/2 mb-6 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Healthy & Fresh Ingredients
            </h2>
            <p className="text-gray-700 mb-6">
              Our meals are made with the freshest ingredients to ensure quality
              and taste.
            </p>
            <motion.button
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform"
              whileHover={{ scale: 1.1 }}
            >
              Learn More
            </motion.button>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaLeaf className="text-green-500 text-9xl animate-bounce" />
          </motion.div>
        </section>
      </div>
    </Container>
  );
};

export default HomePage;
