import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle Make Fraud
  const handleMakeFraud = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark ${user.displayName} as fraud.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark fraud",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/fraud/${user.email}`);
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark fraud");
    }
  };

  return (
    <div className="p-6">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Manage Users
      </motion.h1>

      {/* Card container */}
      <motion.div
        className="overflow-x-auto rounded-2xl shadow-lg bg-white/30 backdrop-blur-xl border border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <tr>
              <th>SL</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <motion.tr
                key={user._id}
                className="hover:bg-orange-50 transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="font-semibold">{i + 1}</td>
                <td className="font-medium">{user.displayName}</td>
                <td>{user.email}</td>

                {/* Role Badge */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status Badge */}
                <td>
                  {user.status === "fraud" ? (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-600 animate-pulse">
                      Fraud
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      {user.status}
                    </span>
                  )}
                </td>

                {/* Action Button */}
                <td>
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-error btn-sm text-white font-semibold shadow-md"
                      onClick={() => handleMakeFraud(user)}
                    >
                      Make Fraud
                    </motion.button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
