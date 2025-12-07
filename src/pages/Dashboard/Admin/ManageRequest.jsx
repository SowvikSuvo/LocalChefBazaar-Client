import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/admin/requests");
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure]);

  const handleAccept = async (request) => {
    try {
      // Update user role
      let updateData = {};
      if (request.requestType === "chef") {
        const chefId = `chef-${Math.floor(1000 + Math.random() * 9000)}`;
        updateData = { role: "chef", chefId };
      } else if (request.requestType === "admin") {
        updateData = { role: "admin" };
      }

      await axios.patch(`/users/role/${request.userEmail}`, updateData);

      // Update request status
      await axios.patch(`/admin/requests/${request._id}`, {
        requestStatus: "approved",
      });

      Swal.fire("Success", "Request approved successfully!", "success");
      fetchRequests();
    } catch (err) {
      console.error("Failed to approve request:", err);
      Swal.fire("Error", "Failed to approve request", "error");
    }
  };

  const handleReject = async (request) => {
    try {
      await axiosSecure.patch(`/admin/requests/${request._id}`, {
        requestStatus: "rejected",
      });
      Swal.fire("Rejected", "Request rejected successfully!", "info");
      fetchRequests();
    } catch (err) {
      console.error("Failed to reject request:", err);
      Swal.fire("Error", "Failed to reject request", "error");
    }
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div className="p-4">
      {" "}
      <h2 className="text-2xl font-bold mb-4">Manage User Requests</h2>{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full bg-white border rounded-lg">
          {" "}
          <thead className="bg-gray-200">
            {" "}
            <tr>
              {" "}
              <th className="py-2 px-4 border">User Name</th>{" "}
              <th className="py-2 px-4 border">User Email</th>{" "}
              <th className="py-2 px-4 border">Request Type</th>{" "}
              <th className="py-2 px-4 border">Request Status</th>{" "}
              <th className="py-2 px-4 border">Request Time</th>{" "}
              <th className="py-2 px-4 border">Actions</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center">
                {" "}
                <td className="py-2 px-4 border">{req.userName}</td>{" "}
                <td className="py-2 px-4 border">{req.userEmail}</td>{" "}
                <td className="py-2 px-4 border">{req.requestType}</td>{" "}
                <td className="py-2 px-4 border">{req.requestStatus}</td>{" "}
                <td className="py-2 px-4 border">
                  {new Date(req.requestTime).toLocaleString()}
                </td>{" "}
                <td className="py-2 px-4 border flex justify-center gap-2">
                  <button
                    className={`px-3 py-1 rounded-lg text-white ${
                      req.requestStatus === "pending"
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAccept(req)}
                  >
                    Accept{" "}
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg text-white ${
                      req.requestStatus === "pending"
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleReject(req)}
                  >
                    Reject{" "}
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
};

export default ManageRequests;
