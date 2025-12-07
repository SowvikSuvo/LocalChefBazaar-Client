import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FavoriteMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite meals
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/favorites/${user.email}`);
        setFavorites(res.data.data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user?.email, axiosSecure]);

  // Delete favorite meal
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      if (res.data.success) {
        Swal.fire(
          "Removed!",
          "Meal removed from favorites successfully.",
          "success"
        );
        setFavorites(favorites.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading)
    return (
      <p className="text-center text-xl font-medium p-10 animate-pulse">
        Loading favorite meals...{" "}
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {" "}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
        My Favorite Meals{" "}
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You have no favorite meals yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full border border-orange-200 divide-y divide-orange-200">
            <thead className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Meal</th>
                <th className="px-6 py-3 text-left font-medium">Chef</th>
                <th className="px-6 py-3 text-left font-medium">Price</th>
                <th className="px-6 py-3 text-left font-medium">Added</th>
                <th className="px-6 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-200">
              {favorites.map((meal) => (
                <motion.tr
                  key={meal._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,165,0,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="hover:shadow-md"
                >
                  <td className="px-6 py-4 font-semibold text-orange-700">
                    {meal.mealName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{meal.chefName}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {meal.price ? `$${meal.price}` : "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(meal.addedTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                      onClick={() => handleDelete(meal._id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeal;
