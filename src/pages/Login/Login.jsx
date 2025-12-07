import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };


  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: "spring" },
    },
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
        className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-orange-100"
        initial="hidden"
        animate="visible"
        variants={cardVariant}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-orange-600 mb-6"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          Log In
        </motion.h1>
        <motion.p
          className="text-sm text-gray-500 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          Sign in to access your account
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <motion.div
            custom={1}
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
          >
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            custom={2}
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
          >
            <label className="text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-2 focus:ring-orange-400 focus:border-orange-500 outline-none transition"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            custom={3}
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="bg-orange-500 text-white w-full rounded-lg py-3 font-semibold text-lg 
            shadow-lg hover:bg-orange-600 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Log In"
            )}
          </motion.button>
        </form>

        <motion.p
          className="text-sm text-center text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
