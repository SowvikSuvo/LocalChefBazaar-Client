import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import {
  BsFillCartPlusFill,
  BsCheckCircleFill,
  BsClockFill,
} from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data.data;
    },
    retry: 1, // optional
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (error)
    return <p className="text-center mt-20 text-lg">Failed to load stats</p>;

  const {
    totalOrders,
    ordersPending,
    ordersDelivered,
    totalPayments,
    totalUsers,
  } = data;

  const pieData = [
    { name: "Pending", value: ordersPending },
    { name: "Delivered", value: ordersDelivered },
  ];

  const barData = [
    { name: "Orders", Pending: ordersPending, Delivered: ordersDelivered },
    { name: "Revenue", Revenue: totalPayments },
  ];

  return (
    <div className="p-6 space-y-8 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
        Platform Overview
      </h1>
      {/* Small Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4"
        >
          <div className="bg-orange-500 text-white p-4 rounded-full">
            <FaDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Payment Amount</p>
            <h3 className="text-xl font-bold">${totalPayments}</h3>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4"
        >
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <BsFillCartPlusFill size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <h3 className="text-xl font-bold">{totalOrders}</h3>
          </div>
        </motion.div>

        {/* Orders Pending */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4"
        >
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <BsClockFill size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders Pending</p>
            <h3 className="text-xl font-bold">{ordersPending}</h3>
          </div>
        </motion.div>

        {/* Orders Delivered */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4"
        >
          <div className="bg-green-500 text-white p-4 rounded-full">
            <BsCheckCircleFill size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders Delivered</p>
            <h3 className="text-xl font-bold">{ordersDelivered}</h3>
          </div>
        </motion.div>

        {/* Total Users */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 col-span-1 sm:col-span-2 lg:col-span-1"
        >
          <div className="bg-green-600 text-white p-4 rounded-full">
            <FaUserAlt size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-xl font-bold">{totalUsers}</h3>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart for Orders */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="font-bold text-lg mb-4">Orders Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Orders & Revenue */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="font-bold text-lg mb-4">Orders & Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Pending" stackId="a" fill="#FFBB28" />
              <Bar dataKey="Delivered" stackId="a" fill="#00C49F" />
              <Bar dataKey="Revenue" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
