import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { ChefHat, MapPin, Star, DollarSign } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PremiumPagination from "./PremiumPagination ";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalMeals, setTotalMeals] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadMeals = async () => {
    try {
      setLoading(true);

      const url = sortOrder
        ? `/meals?sortBy=price&sort=${sortOrder}&page=${currentPage}&limit=${itemsPerPage}`
        : `/meals?page=${currentPage}&limit=${itemsPerPage}`;

      const res = await axiosSecure.get(url);
      setMeals(res.data.data);
      setTotalMeals(res.data.total);
    } catch (err) {
      console.error("Failed to load meals:", err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, [sortOrder, currentPage]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <Container>
      <div className="container mx-auto px-6 py-10 bg-orange-50 min-h-screen rounded-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent text-center mb-8"
        >
          Daily Meals
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-6 py-3 flex items-center gap-2 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-500 mx-auto mb-10"
        >
          <DollarSign size={20} />
          Sort by Price:{" "}
          <span className="font-bold">
            {sortOrder === "asc"
              ? "Low → High"
              : sortOrder === "desc"
              ? "High → Low"
              : "Click"}
          </span>
        </motion.button>

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
              <img src={meal.foodImage} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-bold text-orange-700 mb-2">
                  {meal.foodName}
                </h2>

                <div className="flex items-center gap-2 text-gray-700">
                  <ChefHat size={18} className="text-orange-600" />
                  <span className="font-medium">{meal.chefName}</span>
                </div>

                <p className="text-gray-500 text-sm mb-2">
                  Chef ID: {meal.chefId}
                </p>

                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <MapPin size={18} className="text-orange-600" />
                  <span>{meal.deliveryArea}</span>
                </div>

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

        <PremiumPagination
          totalMeals={totalMeals}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Container>
  );
};

export default MealsPage;
