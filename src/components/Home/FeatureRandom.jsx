import { motion } from "framer-motion";
import { ShieldCheck, Truck, Star, Wallet } from "lucide-react";

const FeatureRandom = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-orange-600" />,
    title: "Safe & Hygienic",
    desc: "All meals are prepared by verified home cooks with high-quality ingredients.",
  },
  {
    icon: <Truck className="w-10 h-10 text-orange-600" />,
    title: "Fast Delivery",
    desc: "Get your homemade meal delivered fresh and on time.",
  },
  {
    icon: <Star className="w-10 h-10 text-orange-600" />,
    title: "Top Rated Chefs",
    desc: "Choose from highly reviewed home chefs in your local area.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-orange-600" />,
    title: "Affordable Pricing",
    desc: "Healthy meals at prices lower than restaurants.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 rounded-3xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
          Why LocalChefBazaar?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FeatureRandom.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
