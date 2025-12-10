import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="py-20 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto text-center px-6"
      >
        <h1 className="text-5xl font-extrabold mb-6">About LocalChefBazaar</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Connecting home chefs with food lovers through fresh, homemade meals.
        </p>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-20 h-20 bg-white/10 rounded-full top-10 left-12"
        />
        <motion.div
          animate={{ y: [0, -60, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute w-16 h-16 bg-white/10 rounded-full bottom-10 right-16 rounded-b-2xl"
        />
      </div>
    </section>
  );
};

export default AboutHero;
