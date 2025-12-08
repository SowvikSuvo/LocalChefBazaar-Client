import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, address, imageUrl } = data;

    let finalImageUrl =
      imageUrl?.trim() || "https://i.ibb.co/8mN9R6q/default-user.png";

    try {
      const result = await createUser(email, password);
      if (!result?.user) throw new Error("User creation failed");

      await updateUserProfile(name, finalImageUrl);

      await axiosSecure.post(
        `/users`,
        {
          uid: result.user.uid,
          name,
          email,
          address,
          image: finalImageUrl,
          role: "user",
          status: "active",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.code || error.message || "Signup failed");
    }
  };

  const fieldVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.12, duration: 0.4, type: "spring" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-orange-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6"
        >
          Create Your Account
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <label className="text-gray-700 text-sm">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <label className="text-gray-700 text-sm">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <label className="text-gray-700 text-sm">Profile Image URL</label>
            <input
              {...register("imageUrl", {
                required: "Profile Image URL is required",
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="https://example.com/photo.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-xs">{errors.imageUrl.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <label className="text-gray-700 text-sm">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="*******"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            <label className="text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
              placeholder="*******"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white w-full rounded-lg py-3 font-semibold text-lg 
        shadow-lg hover:from-orange-500 hover:via-red-600 hover:to-pink-600 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-center text-gray-600 mt-4"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 font-semibold hover:underline hover:text-orange-600"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
