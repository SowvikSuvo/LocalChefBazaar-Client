import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  DollarSign,
  Hash,
  Mail,
  MapPinned,
  CreditCard,
  Clock,
  PackageCheck,
  XCircle,
  CheckCircle2,
  Truck,
  Package2,
  PackageCheckIcon,
  PackageSearchIcon,
  Package,
} from "lucide-react";

const OrderRequests = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for this chef
  useEffect(() => {
    if (authLoading) return; // wait until auth initializes
    if (!user) return; // user not logged in

    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/orders/by-chef");
        console.log("Fetched Orders:", res.data.data); // Should show real orders now
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Fetch Orders Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading, axiosSecure]);

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

  if (authLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto p-6  bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 rounded-2xl">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="text-center mb-12 "
      >
        <h1 className="text-4xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 drop-shadow-2xl ">
          Order Requests
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-medium">
          Made with care • Served with perfection
        </p>
      </motion.div>{" "}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const { orderStatus } = order;
          const isPending = orderStatus === "pending";
          const isAccepted = orderStatus === "accepted";
          const isDelivered = orderStatus === "delivered";

          return (
            <motion.div
              key={order._id}
              className="border rounded-2xl p-5 shadow-xl bg-white/80 backdrop-blur-md 
             hover:shadow-[0_8px_30px_rgba(255,165,0,0.3)] 
             transition-all duration-300"
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Title */}
              <h2 className="text-xl font-bold text-orange-600 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-orange-500" />
                {order.mealName}
              </h2>

              {/* Price */}
              <p className="flex items-center gap-2 mt-2 text-gray-700">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Price: ${order.price} USD</span>
              </p>

              {/* Quantity */}
              <p className="flex items-center gap-2 text-gray-700">
                <Hash className="w-4 h-4 text-purple-500" />
                Quantity: {order.quantity}
              </p>

              {/* Email */}
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-blue-500" />
                {order.userEmail}
              </p>

              {/* Address */}
              <p className="flex items-center gap-2 text-gray-700">
                <MapPinned className="w-4 h-4 text-red-500" />
                {order.userAddress}
              </p>

              {/* Payment Status */}
              <p className="flex items-center gap-2 text-gray-700">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Payment:{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </p>

              {/* Time */}
              <p className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-gray-500" />
                {new Date(order.orderTime).toLocaleString()}
              </p>

              {/* Order Status */}
              <p className="font-semibold mt-3 flex items-center gap-2">
                Status:
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
              <div className="mt-5 space-y-2">
                {/* Cancel */}
                <button
                  onClick={() => updateStatus(order._id, "cancelled")}
                  disabled={!isPending}
                  className={`w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 transition-all ${
                    !isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <XCircle className="w-4 h-4" /> Cancel
                </button>

                {/* Accept */}
                <button
                  onClick={() => updateStatus(order._id, "accepted")}
                  disabled={!isPending}
                  className={`w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 transition-all ${
                    !isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Accept
                </button>

                {/* Deliver */}
                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  disabled={!isAccepted}
                  className={`w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 transition-all ${
                    !isAccepted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <Truck className="w-4 h-4" /> Deliver
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      {orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <PackageSearchIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <p className="text-xl text-gray-500 font-medium">
            You haven't received any order requests yet
          </p>
          <p className="text-gray-400 mt-2">
            Start building your irresistible menu! <br /> Hungry customers will
            show up soon!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OrderRequests;
