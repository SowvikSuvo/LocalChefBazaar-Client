import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/profile banner.jpg";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserShield,
  FaCheckCircle,
  FaIdBadge,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  console.log("User Data:", userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.uid}`);
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, axiosSecure]);

  const handleRequest = async (requestType) => {
    if (!userData) return;

    const requestData = {
      _id: userData._id,
      userName: userData.name || user.displayName,
      userEmail: userData.email,
      requestType,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/admin/requests", requestData);
      Swal.fire(
        "Request Sent!",
        `Your ${requestType} request is pending.`,
        "success"
      );
    } catch (err) {
      console.error("Failed to send request:", err);
      Swal.fire("Error", "Failed to send request.", "error");
    }
  };

  if (!user || !userData)
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4 rounded-3xl">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl md:w-4/5 lg:w-3/5 overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {/* Cover Image */}
        <div className="relative">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-56 object-cover mb-4 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-pink-400/30 to-purple-400/30 animate-pulse rounded-t-3xl" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 -mt-8">
          <motion.img
            alt="profile"
            src={user?.photoURL}
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1 }}
          />

          <motion.p
            className="mt-2 px-4 py-1 text-xs text-white bg-lime-500 rounded-full font-semibold shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {userData.role || "user"}
          </motion.p>

          <motion.p
            className="mt-2 text-xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            User Id: {user?.uid}
          </motion.p>

          {/* User Info Card */}
          <motion.div
            className="w-full p-6 mt-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-inner border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaUser className="text-orange-500" />
                <span className="font-semibold">Name:</span> {user?.displayName}
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <span className="font-semibold">Email:</span> {user?.email}
              </p>

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Address:</span>{" "}
                {userData?.address || "N/A"}
              </p>

              <p className="flex items-center gap-2">
                <FaUserShield className="text-purple-500" />
                <span className="font-semibold">Role:</span>{" "}
                {userData?.role || "user"}
              </p>

              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span className="font-semibold">Status:</span>{" "}
                {userData.status || "active"}
              </p>

              {userData.role === "chef" && (
                <p className="flex items-center gap-2">
                  <FaIdBadge className="text-pink-500" />
                  <span className="font-semibold">Chef ID:</span>{" "}
                  {userData.chefId}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6 justify-center flex-wrap">
              {userData.role === "user" && (
                <motion.button
                  onClick={() => handleRequest("chef")}
                  className="bg-lime-500 px-6 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  whileHover={{ scale: 1.08 }}
                >
                  Be a Chef
                </motion.button>
              )}

              {userData.role !== "admin" && (
                <motion.button
                  onClick={() => handleRequest("admin")}
                  className="bg-blue-500 px-6 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  whileHover={{ scale: 1.08 }}
                >
                  Be an Admin
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
