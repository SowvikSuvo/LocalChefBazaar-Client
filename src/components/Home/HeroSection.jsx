import { motion } from "framer-motion";
import heroImage from "../../assets/images/banner.avif"; // your chicken banner
import Container from "../Shared/Container";

const HeroSection = () => {
  return (
    <Container>
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:px-12">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-orange-600 mb-4">
            Fresh Chicken Delivered Daily
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Order the juiciest chicken meals, straight to your doorstep.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition"
          >
            Order Now
          </motion.button>
        </motion.div>
      </section>
    </Container>
  );
};

export default HeroSection;
