import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  Package,
  BadgeDollarSign,
  Clock,
  User,
  Hash,
  CreditCard,
  CircleCheck,
} from "lucide-react";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePayment = async (order) => {
    try {
      const paymentInfo = {
        order,
        userEmail: user?.email,
      };

      const result = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Processing payment for order:", order);
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get(
          `/orders?userEmail=${user.email}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email, axiosSecure]);

  if (loading)
    return (
      <div className="text-center mt-10 text-lg md:text-xl font-medium text-gray-700">
        Loading...
      </div>
    );
  if (!orders.length)
    return (
      <div className="text-center mt-10 text-lg md:text-xl font-medium text-gray-700">
        No orders found.
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-10 text-center">
        My Orders
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow relative flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl md:text-2xl font-semibold text-orange-600 mb-5 truncate">
                {order.mealName}
              </h3>

              <div className="space-y-2 text-gray-700 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <Package size={18} />{" "}
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.quantity}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeDollarSign size={18} />{" "}
                  <span className="font-semibold">Price:</span> {order.price} TK
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={18} />{" "}
                  <span className="font-semibold">Delivery Time:</span>{" "}
                  {new Date(order.orderTime).toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <User size={18} />{" "}
                  <span className="font-semibold">Chef Name:</span>{" "}
                  {order.chefName || "Unknown"}
                </p>
                <p className="flex items-center gap-2">
                  <Hash size={16} />{" "}
                  <span className="font-semibold">Chef ID:</span>{" "}
                  <span className="text-gray-500 text-xs md:text-sm">
                    {order.chefId}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <CircleCheck size={18} />{" "}
                  <span className="font-semibold ">Order Status:</span>{" "}
                  <span className="text-yellow-500">{order.orderStatus}</span>
                </p>
                <p className="flex items-center gap-2 ">
                  <CreditCard size={18} />{" "}
                  <span className="font-semibold ">Payment Status:</span>{" "}
                  <span className="text-yellow-500">{order.paymentStatus}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handlePayment(order)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition duration-300`}
            >
              Pay Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
