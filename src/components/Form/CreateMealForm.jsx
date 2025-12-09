import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";

const CreateMealFrom = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);

  const shortChefId = `chef_${user?.uid.slice(0, 6)}`;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      foodName: "",
      chefName: "",
      price: "",
      rating: 0,
      ingredients: "",
      estimatedDeliveryTime: "",
      chefExperience: "",
      userEmail: user?.email || "",
      chefId: shortChefId,
      deliveryArea: "",
    },
  });

  const uploadImageBB = async () => {
    if (!imageFile) return "";
    const form = new FormData();
    form.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_BB_Key
    }`;
    const res = await axios.post(url, form);
    return res.data.data.display_url;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const imgURL = await uploadImageBB();

      const mealData = {
        ...data,
        price: Number(data.price),
        foodImage: imgURL,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        rating: Math.min(data.rating, 5),
        createdAt: new Date(),
        deliveryArea: data.deliveryArea,
      };

      await axiosSecure.post("/create-meals", mealData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Meal created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/meals");
      reset();
      setImageFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center  bg-orange-50 rounded-lg shadow-md p-6 animate-pulse">
        <LoadingSpinner className="w-16 h-16  " />

        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-2 text-center drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          Uploading Your Image
        </motion.h2>

        <motion.p
          className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent text-center text-sm mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Please wait a moment while we process your meal image...
        </motion.p>

        <div className="flex space-x-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-full shadow-lg"
              animate={{ y: [0, -15, 0], scale: [1, 1.5, 1] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            ></motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-orange-300"
      >
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-2xl font-bold text-orange-700 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 drop-shadow-2xl"
        >
          Create a Delicious Meal
        </motion.h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -620 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              Food Name
            </label>
            <input
              type="text"
              placeholder="Food Name"
              {...register("foodName", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -600 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              Chef Name
            </label>
            <input
              type="text"
              placeholder="Chef Name"
              {...register("chefName", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -630 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <label className="mb-1 font-medium text-orange-700">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("foodImage")}
              onChange={(e) => setImageFile(e.target.files[0])}
              className=" p-2 border rounded-lg border-orange-400 cursor-pointer bg-orange-100"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <label className="mb-1 font-medium text-orange-700">Price</label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <label className="mb-1 font-medium text-orange-700">
                Rating (0-5)
              </label>
              <input
                type="number"
                placeholder="Rating (0-5)"
                {...register("rating", { min: 0, max: 5 })}
                className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              Ingredients
            </label>
            <textarea
              placeholder="Ingredients (comma separated)"
              {...register("ingredients", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:col-span-2"
          >
            <label className="mb-1 font-medium text-orange-700">
              Delivery Area
            </label>
            <input
              type="text"
              placeholder="e.g., Mirpur, Banani, Dhanmondi"
              {...register("deliveryArea", { required: true })}
              className="p-3 border rounded-lg border-orange-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              placeholder="Estimated Delivery Time"
              {...register("estimatedDeliveryTime", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              Chef Experience
            </label>
            <textarea
              placeholder="Chef Experience"
              {...register("chefExperience", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <label className="mb-1 font-medium text-orange-700">
              User Email
            </label>
            <input
              type="email"
              placeholder="User Email"
              {...register("userEmail")}
              readOnly
              className="w-full p-3 border rounded-lg bg-orange-100 border-orange-400"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3  bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 drop-shadow-2xl text-white rounded-lg shadow-md hover:bg-orange-500 transition-all"
          >
            Create Meal
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateMealFrom;
