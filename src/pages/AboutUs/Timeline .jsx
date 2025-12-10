import { motion } from "framer-motion";

const events = [
  { year: "2022", text: "Idea born from a small kitchen in Barisal." },
  { year: "2023", text: "MVP launch with 20 home chefs." },
  { year: "2024", text: "Reached 10,000 monthly customers." },
  { year: "2025", text: "Expanded across Bangladesh." },
];

const Timeline = () => {
  return (
    <section className="py-16 bg-orange-50">
      <h2 className="text-3xl text-center font-bold text-orange-700 mb-10">
        Our Journey
      </h2>

      <div className="container mx-auto px-6">
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-6 p-6 bg-white rounded-xl shadow-md"
          >
            <h4 className="font-bold text-orange-600 text-xl">{e.year}</h4>
            <p className="text-gray-700">{e.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
