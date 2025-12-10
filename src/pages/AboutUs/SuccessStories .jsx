import { motion } from "framer-motion";

const SuccessStories = () => {
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-orange-700 mb-10">
        Chef Success Stories
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-6 bg-white shadow-lg rounded-2xl"
          >
            <h3 className="font-bold text-lg text-orange-600">
              Chef {i} Success Story
            </h3>
            <p className="text-gray-600 mt-2">
              Started as a home cook… now serving 500+ customers monthly!
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
