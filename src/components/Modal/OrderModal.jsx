import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  Utensils,
  BadgeDollarSign,
  Package,
  Hash,
  User,
  MapPin,
} from "lucide-react";

const OrderModal = ({ isOpen, closeModal, meal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    if (!userAddress) {
      Swal.fire("Error", "Please enter your delivery address.", "error");
      return;
    }

    const totalPrice = meal.price * quantity;

    Swal.fire({
      title: `Total Price: ${totalPrice} TK`,
      text: "Want to confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderData = {
          foodId: meal._id,
          chefName: meal.chefName,
          mealName: meal.foodName,
          price: meal.price,
          quantity,
          chefId: meal.chefId,
          userEmail: user?.email,
          userAddress,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
          paymentStatus: "Pending",
        };

        axiosSecure
          .post("/orders", orderData)
          .then(() => {
            Swal.fire("Successfully Ordered!", "", "success");
            closeModal();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] backdrop-blur-md bg-black/40 animate-fadeIn">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-7 relative animate-scaleIn">
        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-orange-600 text-center">
          Confirm Your Order
        </h2>

        <p className="text-gray-500 text-center mt-1 mb-5">
          Please review your order details below.
        </p>

        {/* FORM */}
        <div className="space-y-4">
          {/* Meal Name */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <Utensils size={18} /> Meal Name
            </label>
            <input
              value={meal.foodName}
              disabled
              className="w-full p-3 rounded-xl border bg-gray-100 font-medium"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <BadgeDollarSign size={18} /> Price (TK)
            </label>
            <input
              value={meal.price}
              disabled
              className="w-full p-3 rounded-xl border bg-gray-100 font-medium"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <Package size={18} /> Quantity
            </label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <Hash size={18} /> Chef ID
            </label>
            <input
              value={meal.chefId}
              disabled
              className="w-full p-3 rounded-xl border bg-gray-100 font-medium"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <User size={18} /> Your Email
            </label>
            <input
              value={user.email}
              disabled
              className="w-full p-3 rounded-xl border bg-gray-100 font-medium"
            />
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <MapPin size={18} /> Delivery Address
            </label>
            <input
              type="text"
              required
              placeholder="Enter delivery address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={closeModal}
            className="flex-1 py-3 border rounded-xl hover:bg-gray-100 font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmOrder}
            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-95 transition"
          >
            Confirm Order
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
      `}</style>
    </div>
  );
};

export default OrderModal;
