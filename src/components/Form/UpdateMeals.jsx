import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);

  // Fetch Single Meal
  const { data: mealData, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data.data;
    },
  });

  // Upload image to ImgBB
  const uploadImageBB = async () => {
    if (!imageFile) return mealData.foodImage;

    const form = new FormData();
    form.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_BB_Key
    }`;
    const res = await axios.post(url, form);

    return res.data.data.display_url;
  };

  // Submit Update Form
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const imgURL = await uploadImageBB();

    const updatedMeal = {
      foodName: form.foodName.value,
      chefName: form.chefName.value,
      price: Number(form.price.value),
      rating: Number(form.rating.value),
      ingredients: form.ingredients.value.split(",").map((i) => i.trim()),
      estimatedDeliveryTime: form.estimatedDeliveryTime.value,
      chefExperience: form.chefExperience.value,
      deliveryArea: form.deliveryArea.value,
      foodImage: imgURL,
    };

    const res = await axiosSecure.patch(`/meals/${id}`, updatedMeal);

    if (res.data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Meal updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/my-meals");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const meal = mealData;

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-orange-300"
      >
        <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">
          Update Meal
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Food Name */}
          <motion.div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              defaultValue={meal.foodName}
              className="w-full p-3 border rounded-lg border-orange-400"
            />
          </motion.div>

          {/* Chef Name */}
          <motion.div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Chef Name
            </label>
            <input
              type="text"
              name="chefName"
              defaultValue={meal.chefName}
              className="w-full p-3 border rounded-lg border-orange-400"
            />
          </motion.div>

          {/* Image */}
          <motion.div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="p-2 border rounded-lg border-orange-400 bg-orange-100"
            />

            <img
              src={imageFile ? URL.createObjectURL(imageFile) : meal.foodImage}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          </motion.div>

          {/* Price & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="flex flex-col">
              <label className="mb-1 font-medium text-orange-700">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={meal.price}
                className="w-full p-3 border rounded-lg border-orange-400"
              />
            </motion.div>

            <motion.div className="flex flex-col">
              <label className="mb-1 font-medium text-orange-700">
                Rating (0-5)
              </label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                defaultValue={meal.rating}
                className="w-full p-3 border rounded-lg border-orange-400"
              />
            </motion.div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              defaultValue={meal.ingredients.join(", ")}
              className="w-full p-3 border rounded-lg border-orange-400"
            />
          </div>

          {/* Delivery Area */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Delivery Area
            </label>
            <input
              type="text"
              name="deliveryArea"
              defaultValue={meal.deliveryArea}
              className="p-3 border rounded-lg border-orange-400"
            />
          </div>

          {/* Estimated Delivery Time */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              name="estimatedDeliveryTime"
              defaultValue={meal.estimatedDeliveryTime}
              className="w-full p-3 border rounded-lg border-orange-400"
            />
          </div>

          {/* Chef Experience */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Chef Experience
            </label>
            <textarea
              name="chefExperience"
              defaultValue={meal.chefExperience}
              className="w-full p-3 border rounded-lg border-orange-400"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-500 transition-all"
          >
            Update Meal
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateMeal;
