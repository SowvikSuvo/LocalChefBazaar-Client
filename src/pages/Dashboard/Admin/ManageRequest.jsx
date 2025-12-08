import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/requests");
      return res.data.filter((r) => r.requestStatus === "pending");
    },
  });

  const handleAction = async (request, action) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${action} this request.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/admin/requests/${request._id}`, {
      action,
      email: request.userEmail,
      requestType: request.requestType,
    });

    if (res.data.success) {
      Swal.fire("Success!", res.data.message, "success");
      refetch();
    }
  };

  return (
    <div className="my-5 p-5">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Manage Requests
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
              <th>Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, i) => (
              <motion.tr
                key={req._id}
                className="hover:bg-orange-50 transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="font-semibold">{i + 1}</td>
                <td className="font-medium">{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    {req.requestType}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                      req.requestStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800 animate-pulse"
                        : req.requestStatus === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>
                <td>
                  <motion.button
                    whileHover={{
                      scale: req.requestStatus === "pending" ? 1.05 : 1,
                    }}
                    whileTap={{
                      scale: req.requestStatus === "pending" ? 0.95 : 1,
                    }}
                    className="btn btn-success btn-sm mr-2 text-white font-semibold shadow-md"
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAction(req, "accept")}
                  >
                    Accept
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: req.requestStatus === "pending" ? 1.05 : 1,
                    }}
                    whileTap={{
                      scale: req.requestStatus === "pending" ? 0.95 : 1,
                    }}
                    className="btn btn-error btn-sm text-white font-semibold shadow-md"
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAction(req, "reject")}
                  >
                    Reject
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ManageRequest;
