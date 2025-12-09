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
  AreaChart,
  Area,
  CartesianGrid,
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

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 mt-12 border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-extrabold text-2xl text-gray-800">
              Overall Statistics
            </h3>
            <p className="text-green-600 font-medium flex items-center gap-1 mt-1">
              <span className="text-lg">▲</span> 8.6% increase from last week
            </p>
          </div>

          <div className="relative">
            <select className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none outline-none hover:bg-gray-200 transition">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={[
              { day: "Mon", amount: totalPayments * 0.12 },
              { day: "Tue", amount: totalPayments * 0.18 },
              { day: "Wed", amount: totalPayments * 0.09 },
              { day: "Thu", amount: totalPayments * 0.05 },
              { day: "Fri", amount: totalPayments * 0.14 },
              { day: "Sat", amount: totalPayments * 0.22 },
              { day: "Sun", amount: totalPayments * 0.15 },
            ]}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            {/* Animated Gradient */}
            <defs>
              <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bbf07d" stopOpacity={0.9}>
                  <animate
                    attributeName="stopColor"
                    values="#bbf07d; #d4ffa2; #bbf07d"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#d7ffb8" stopOpacity={0.15}>
                  <animate
                    attributeName="stopColor"
                    values="#d7ffb8; #c6ff99; #d7ffb8"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            {/* Axes */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7f8c8d", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7f8c8d", fontSize: 13 }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #e7e7e7",
                boxShadow: "0px 8px 25px rgba(0,0,0,0.08)",
                padding: "10px 16px",
              }}
              formatter={(value) => [
                `$${Math.round(value).toLocaleString()}`,
                <span className="flex items-center gap-1">💰 Earnings</span>,
              ]}
            />

            {/* Animated Line + Fill */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8CD83F"
              strokeWidth={4}
              fill="url(#premiumGradient)"
              animationDuration={1200}
              dot={{ r: 5, fill: "#8CD83F", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

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
