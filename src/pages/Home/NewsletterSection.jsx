import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

const NewsletterSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 relative overflow-hidden rounded-3xl shadow-lg">
      {/* Floating Animated Background Circles */}
      <motion.div
        className="absolute w-72 h-72 bg-yellow-300 rounded-full opacity-30 top-[-50px] left-[-50px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-pink-300 rounded-full opacity-20 bottom-[-40px] right-[-40px]"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Stay Updated with Local Chef Bazaar!
        </motion.h2>

        <motion.p
          className="text-white/90 text-lg md:text-xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Get exclusive updates, offers, and the latest homemade dishes straight
          to your inbox.
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transition-all"
            />
            <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>
          <motion.button
            type="submit"
            className="px-8 py-3 bg-white text-red-500 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </motion.form>

        <motion.div
          className="mt-8 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Join thousands of food lovers and never miss a homemade delicacy!
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
