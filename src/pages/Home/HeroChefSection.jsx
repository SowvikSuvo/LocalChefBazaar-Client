import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroChefSection = () => {
  return (
    <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-20 px-6 rounded-3xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Fresh Homemade Meals
            <span className="block text-yellow-300">Made by Local Chefs</span>
          </h1>

          <p className="text-lg opacity-90">
            Order delicious, healthy, homemade meals from talented chefs in your
            area. Real food, real people — delivered fresh.
          </p>

          <motion.a
            href="/meals"
            whileHover={{ scale: 1.08 }}
            className="inline-flex items-center bg-white text-orange-600 font-bold px-6 py-3 rounded-full shadow-xl"
          >
            Explore Meals <ArrowRight className="ml-2" />
          </motion.a>
        </motion.div>

        {/* Right Food Image */}
        <motion.img
          src="/image9.jpg"
          alt="fresh food"
          className="w-full rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
};

export default HeroChefSection;
