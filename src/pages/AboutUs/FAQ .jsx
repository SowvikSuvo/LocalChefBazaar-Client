import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <section className="py-16 bg-orange-100 rounded-2xl">
      <h2 className="text-3xl text-center text-orange-700 font-bold mb-10">
        Frequently Asked Questions
      </h2>

      <div className="container mx-auto px-6 max-w-2xl">
        {[
          {
            q: "How do I order food?",
            a: "Just select your meal → checkout → delivery arrives.",
          },
          {
            q: "Are the chefs verified?",
            a: "Yes! All chefs are identity-verified and food-safety checked.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-5 mb-4 rounded-xl shadow-md"
          >
            <h4 className="font-bold text-orange-700">{f.q}</h4>
            <p className="text-gray-600 mt-1">{f.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
