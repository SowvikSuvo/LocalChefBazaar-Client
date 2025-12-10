import { motion } from "framer-motion";
import { ChefHat, ShoppingBag, Bike } from "lucide-react";

const steps = [
  {
    icon: <ChefHat size={40} />,
    title: "Pick Your Meal",
    text: "Choose from hundreds of home-cooked meals by verified chefs.",
  },
  {
    icon: <ShoppingBag size={40} />,
    title: "Place Your Order",
    text: "Order easily from your phone and pay securely.",
  },
  {
    icon: <Bike size={40} />,
    title: "Get Fast Delivery",
    text: "Meals delivered hot and fresh to your doorstep.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-orange-100 rounded-2xl">
      <h2 className="text-3xl text-center font-bold text-orange-700 mb-10">
        How It Works
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 bg-white rounded-2xl shadow-md"
          >
            <div className="text-orange-600 mx-auto mb-3">{s.icon}</div>
            <h4 className="font-bold text-orange-700 text-xl mb-2">
              {s.title}
            </h4>
            <p className="text-gray-600">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
