import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="p-6 bg-white rounded-2xl shadow-md"
      >
        <Target size={40} className="text-orange-600 mb-3" />
        <h3 className="text-xl font-bold mb-2 text-orange-700">Our Mission</h3>
        <p className="text-gray-600">
          To empower home chefs and provide customers with affordable, healthy,
          homemade meals anytime.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="p-6 bg-white rounded-2xl shadow-md"
      >
        <Eye size={40} className="text-orange-600 mb-3" />
        <h3 className="text-xl font-bold mb-2 text-orange-700">Our Vision</h3>
        <p className="text-gray-600">
          To build Bangladesh’s largest home food marketplace.
        </p>
      </motion.div>
    </section>
  );
};

export default MissionVision;
