import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParam.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post("/payment-success", { sessionId })
        .then(() => {
          setTimeout(() => navigate("/dashboard/my-orders"), 3000);
        })
        .catch((error) => {
          console.error("Error recording payment success:", error);
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="mb-6"
      >
        <CheckCircle className="text-green-500 w-24 h-24" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-green-500 text-4xl font-bold text-center"
      >
        Payment Successful
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="mt-4 text-gray-700 text-center"
      >
        Thank you for your payment. Redirecting to your orders...
      </motion.p>

      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="mt-10 text-green-500 text-6xl"
      >
        💚
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
