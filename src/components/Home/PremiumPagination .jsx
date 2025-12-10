import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PremiumPagination = ({
  currentPage,
  totalMeals,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalMeals / itemsPerPage);

  const MotionButton = ({ children, disabled, onClick }) => (
    <motion.button
      whileHover={!disabled ? { scale: 1.15 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-xl backdrop-blur-xl border 
        border-white/40 shadow-md 
        transition
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "bg-white/20 hover:bg-white/30"
        }`}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="flex justify-center mt-12 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-5 px-8 py-4
        bg-white/25 backdrop-blur-2xl
        border border-white/40 rounded-3xl shadow-xl"
      >
        {/* Prev */}
        <motion.button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          <span className="flex items-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent justify-center font-semibold ">
            <ChevronLeft className="w-6 h-6 text-orange-600" />
            Prev
          </span>
        </motion.button>

        {/* Page Indicator */}
        <motion.span
          key={currentPage}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-xl font-semibold text-orange-700"
        >
          {currentPage} / {totalPages}
        </motion.span>

        {/* Next */}
        <motion.button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
        >
          <span className="flex items-center justify-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent font-semibold ">
            Next
            <ChevronRight className="w-6 h-6 text-orange-600" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PremiumPagination;
