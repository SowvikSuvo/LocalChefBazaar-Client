import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { motion } from "framer-motion";
import { ChefHat, MapPin, Star, DollarSign } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadMeals = async () => {
    const res = await axiosSecure.get(`/meals?sort=${sortOrder}`);
    setMeals(res.data.data);
  };

  useEffect(() => {
    loadMeals();
  }, [sortOrder, loadMeals]);

  return (
    <div className="container mx-auto px-6 py-10 bg-orange-50 min-h-screen rounded-2xl">
      {/* PAGE HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-orange-700 text-center mb-8"
      >
        Daily Meals
      </motion.h1>

      {/* SORT BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="px-6 py-3 flex items-center gap-2 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-500 mx-auto mb-10"
      >
        <DollarSign size={20} />
        Sort by Price:{" "}
        <span className="font-bold">
          {sortOrder === "asc" ? "Low → High" : "High → Low"}
        </span>
      </motion.button>

      {/* MEALS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-200"
          >
            {/* IMAGE */}
            <img src={meal.foodImage} className="w-full h-52 object-cover" />

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-orange-700 mb-2">
                {meal.foodName}
              </h2>

              {/* CHEF NAME */}
              <div className="flex items-center gap-2 text-gray-700">
                <ChefHat size={18} className="text-orange-600" />
                <span className="font-medium">{meal.chefName}</span>
              </div>

              {/* CHEF ID */}
              <p className="text-gray-500 text-sm mb-2">
                Chef ID: {meal.chefId}
              </p>

              {/* DELIVERY AREA */}
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin size={18} className="text-orange-600" />
                <span>{meal.deliveryArea}</span>
              </div>

              {/* PRICE & RATING */}
              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-1 text-orange-700">
                  <DollarSign size={18} />
                  <span className="font-bold text-lg">{meal.price}</span>
                </div>

                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={18} fill="gold" />
                  <span className="font-medium">{meal.rating}</span>
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  navigate(`/meal/${meal._id}`);
                }}
                className="mt-5 w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition"
              >
                See Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
