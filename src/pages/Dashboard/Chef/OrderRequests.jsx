import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OrderRequests = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const chefId = `chef_${user?.uid.slice(0, 6)}`;

  // Fetch orders for this chef
  useEffect(() => {
    if (authLoading) return; // wait until auth initializes
    if (!user) return; // user not logged in

    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/orders/by-chef");
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Fetch Orders Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading, chefId, axiosSecure]);

  // Update order status and reflect locally
  const updateStatus = async (orderId, status) => {
    try {
      await axiosSecure.patch(`/orders/status/${orderId}`, {
        orderStatus: status,
      });

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === orderId ? { ...o, orderStatus: status } : o
        )
      );
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  };

  if (authLoading || loading)
    return <p className="text-center mt-20 text-lg">Loading...</p>;

  if (!orders.length)
    return <p className="text-center mt-20 text-lg">No orders found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Order Requests</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const { orderStatus } = order;
          const isPending = orderStatus === "pending";
          const isAccepted = orderStatus === "accepted";
          const isDelivered = orderStatus === "delivered";
          const isCancelled = orderStatus === "cancelled";

          return (
            <motion.div
              key={order._id}
              className="border rounded-xl p-5 shadow-md bg-white"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,165,0,0.05)",
              }}
            >
              <h2 className="text-xl font-bold">{order.mealName}</h2>
              <p>Price: {order.price} TK</p>
              <p>Quantity: {order.quantity}</p>
              <p>User Email: {order.userEmail}</p>
              <p>Address: {order.userAddress}</p>
              <p>Payment Status: {order.paymentStatus || "Pending"}</p>
              <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
              <p className="font-semibold mt-2">
                Status:{" "}
                <span
                  className={
                    isPending
                      ? "text-yellow-500"
                      : isAccepted
                      ? "text-blue-500"
                      : isDelivered
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {orderStatus}
                </span>
              </p>

              {/* Buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => updateStatus(order._id, "cancelled")}
                  disabled={!isPending}
                  className={`w-full py-2 rounded-lg text-white ${
                    !isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => updateStatus(order._id, "accepted")}
                  disabled={!isPending}
                  className={`w-full py-2 rounded-lg text-white ${
                    !isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  disabled={!isAccepted}
                  className={`w-full py-2 rounded-lg text-white ${
                    !isAccepted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Deliver
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequests;
