import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white rounded-3xl shadow-2xl p-10 sm:p-16 max-w-lg w-full text-center flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl text-orange-500 mb-4"
        >
          ⚡
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 animate-text">
          Something Went Wrong!
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl">
          Oops! It seems like this page doesn’t exist or something went wrong.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-orange-300 shadow-lg rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-300"
          >
            <FaArrowLeft /> Go Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-lg rounded-xl text-white font-semibold hover:brightness-105 transition-all duration-300"
          >
            <FaHome /> Take Me Home
          </motion.button>
        </div>

        <motion.div
          className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-pink-300 opacity-50 filter blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-300 opacity-50 filter blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default ErrorPage;
