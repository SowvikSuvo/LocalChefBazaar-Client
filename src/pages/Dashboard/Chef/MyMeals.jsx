import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Trash2,
  Edit3,
  ChefHat,
  Clock,
  Star,
  Package,
  ChefHatIcon,
  CircleUserRound,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch meals created by chef
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["myMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-meals/${user.email}`);
      return res.data.data;
    },
  });

  // Delete meal
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this meal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/meals/${id}`);
    if (res.data.success) {
      Swal.fire("Deleted!", "Meal removed successfully", "success");
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 rounded-2xl">
      {/* Glassy Background Overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-500/20 to-purple-600/20 blur-3xl" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="p-6 max-w-7xl mx-auto ">
        {/* Epic Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-12 "
        >
          <h1 className="text-4xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 drop-shadow-2xl ">
            My Delicious Meals
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Crafted with love • Ready to serve
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {meals.map((meal, i) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
              whileHover={{
                y: -12,
                scale: 1.04,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30 shadow-2xl ring-1 ring-white/20">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-500/0 to-purple-600/0 group-hover:from-orange-400/20 group-hover:via-pink-500/20 group-hover:to-purple-600/30 transition-all duration-500" />

                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Shiny Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">
                      {meal.rating}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-purple-700 transition-colors">
                    {meal.foodName}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        ${meal.price}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {meal.estimatedDeliveryTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <ChefHat className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        {meal.chefName}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {meal.ingredients.join(" • ")}
                    </p>
                    <p className="flex items-center text-xs text-gray-500 line-clamp-2">
                      <CircleUserRound className="w-4 h-4 text-gray-400 inline-block mr-1" />
                      <span>{meal.chefId}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(meal._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Link
                        to={`/dashboard/update-meal/${meal._id}`}
                        className="block text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Update
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {meals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <p className="text-xl text-gray-500 font-medium">
              No meals added yet
            </p>
            <p className="text-gray-400 mt-2">
              Start creating your delicious menu!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyMeals;
