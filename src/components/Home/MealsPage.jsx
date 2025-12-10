import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { ChefHat, MapPin, Star, DollarSign, Search } from "lucide-react";

import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PremiumPagination from "./PremiumPagination ";

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

  const searchMeals = async (text) => {
    if (!text.trim()) {
      setIsSearching(false);
      loadMeals();
      return;
    }

    try {
      setSearchLoading(true);
      setIsSearching(true);

      const res = await axiosSecure.get(`/search-meals?query=${text}`);
      setMeals(res.data.data);
      setTotalMeals(res.data.data.length);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) loadMeals();
  }, [sortOrder, currentPage]);

  useEffect(() => {
    const delay = setTimeout(() => {
      searchMeals(searchText);
    }, 400); // 400ms debounce
    return () => clearTimeout(delay);
  }, [searchText]);

  if (loading && !isSearching) return <LoadingSpinner />;

  return (
    <Container>
      <div className="container mx-auto px-6 py-10 bg-orange-50 min-h-screen rounded-2xl">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent text-center mb-8"
        >
          Daily Meals
        </motion.h1>

        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-lg">
            <Search
              className="absolute left-3 top-3 text-orange-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Search meals by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {searchLoading && (
          <p className="text-center text-orange-600 font-medium mb-4 animate-pulse">
            Searching...
          </p>
        )}

        {!isSearching && (
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
        )}

        {/* Meals Grid */}
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

        {/* Pagination only when not searching */}
        {!isSearching && (
          <PremiumPagination
            totalMeals={totalMeals}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </Container>
  );
};

export default MealsPage;
