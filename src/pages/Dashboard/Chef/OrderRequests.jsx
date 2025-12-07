import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const OrderRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chef-orders", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/by-chef/${user?.uid}`);
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    try {
      const result = await axiosSecure.patch(`/orders/status/${id}`, {
        orderStatus: status,
      });

      if (result.data.modifiedCount > 0) {
        Swal.fire("Success!", `Order ${status} successfully!`, "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update order!", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Order Requests</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-5 shadow-md bg-white"
          >
            <h2 className="text-xl font-bold">{order.mealName}</h2>
            <p className="text-gray-600">Price: ${order.price}</p>
            <p>Quantity: {order.quantity}</p>
            <p>User: {order.userEmail}</p>
            <p>Address: {order.userAddress}</p>
            <p className="font-semibold mt-2">
              Status:{" "}
              <span
                className={
                  order.orderStatus === "pending"
                    ? "text-yellow-500"
                    : order.orderStatus === "accepted"
                    ? "text-blue-500"
                    : order.orderStatus === "delivered"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {order.orderStatus}
              </span>
            </p>

            <div className="mt-4 space-y-2">
              {/* Cancel Button */}
              <button
                onClick={() => updateStatus(order._id, "cancelled")}
                disabled={
                  order.orderStatus !== "pending" ||
                  order.orderStatus === "cancelled"
                }
                className={`w-full py-2 rounded-lg text-white ${
                  order.orderStatus !== "pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Cancel
              </button>

              {/* Accept Button */}
              <button
                onClick={() => updateStatus(order._id, "accepted")}
                disabled={
                  order.orderStatus !== "pending" ||
                  order.orderStatus === "accepted"
                }
                className={`w-full py-2 rounded-lg text-white ${
                  order.orderStatus !== "pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Accept
              </button>

              {/* Deliver Button */}
              <button
                onClick={() => updateStatus(order._id, "delivered")}
                disabled={order.orderStatus !== "accepted"}
                className={`w-full py-2 rounded-lg text-white ${
                  order.orderStatus !== "accepted"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Deliver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderRequests;
