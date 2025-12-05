import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const CreateMeal = () => {
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);

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
      const imgURL = await uploadImageBB();

      const mealData = {
        ...data,
        foodImage: imgURL,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        rating: Math.min(data.rating, 5),
        createdAt: new Date(),
      };
      console.log(mealData);

      await axios.post("/your-api-endpoint", mealData);
      toast.success("Meal created successfully!");
      reset();
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Error creating meal");
    }
  };

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-orange-300"
      >
        <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">
          Create New Meal
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Food Name
            </label>
            <input
              type="text"
              placeholder="Food Name"
              {...register("foodName", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Chef Name
            </label>
            <input
              type="text"
              placeholder="Chef Name"
              {...register("chefName", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col items-start">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-orange-700">Price</label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-orange-700">
                Rating (0-5)
              </label>
              <input
                type="number"
                placeholder="Rating (0-5)"
                {...register("rating", { min: 0, max: 5 })}
                className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Ingredients
            </label>
            <textarea
              placeholder="Ingredients (comma separated)"
              {...register("ingredients", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              placeholder="Estimated Delivery Time"
              {...register("estimatedDeliveryTime", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-orange-700">
              Chef Experience
            </label>
            <textarea
              placeholder="Chef Experience"
              {...register("chefExperience", { required: true })}
              className="w-full p-3 border rounded-lg border-orange-400 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col">
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
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-500 transition-all"
          >
            Create Meal
          </motion.button>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default CreateMeal;
