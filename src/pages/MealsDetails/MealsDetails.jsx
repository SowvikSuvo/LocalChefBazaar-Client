import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import {
  ChefHat,
  MapPin,
  Star,
  DollarSign,
  Clock,
  ClipboardList,
} from "lucide-react";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import MealsDetailsWithReviews from "./MealsDetailsWithReviews";

const MealsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosSecure.get(`/meals/${id}`);
        setMeal(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (!user) {
      navigate("/login");
    } else {
      fetchMeal();
    }
  }, [id, user]);

  const closeModal = () => setIsOpen(false);

  if (!meal)
    return (
      <div className="text-center mt-20 text-orange-600 font-bold text-xl">
        Loading...
      </div>
    );

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-10 py-10"
      >
        {/* LEFT: IMAGE */}{" "}
        <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-orange-200">
          {" "}
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-96 object-cover rounded-xl "
          />{" "}
        </div>
        {/* RIGHT: DETAILS */}
        <div className="flex-1 flex flex-col gap-6">
          {/* FOOD NAME */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-orange-700"
          >
            {meal.foodName}
          </motion.h1>

          {/* CHEF NAME & ID */}
          <div className="flex items-center gap-4 text-gray-700 font-medium">
            <ChefHat className="text-orange-600" size={24} />
            <span>{meal.chefName}</span>
            <span className="ml-auto flex items-center gap-1 text-gray-500 text-sm">
              <ClipboardList size={18} className="text-gray-400" />
              {meal.chefId}
            </span>
          </div>

          {/* PRICE & RATING */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-orange-700 font-bold text-xl">
              <DollarSign size={21} />
              {meal.price}
            </div>
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <Star size={22} fill="gold" /> {meal.rating}
            </div>
          </div>

          {/* DELIVERY & TIME */}
          <div className="flex-col items-center gap-6 mt-4 text-gray-700">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={18} className="text-orange-600" />
              <p className="text-orange-600">Delivery Area:</p>
              {meal.deliveryArea}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={18} className="text-orange-600" />
              <p className="text-orange-600">Estimated Time:</p>
              {meal.estimatedDeliveryTime}
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <ClipboardList size={20} /> Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {meal.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* CHEF EXPERIENCE */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">
              Chef's Experience
            </h3>
            <p className="text-gray-600">{meal.chefExperience}</p>
          </div>

          {/* ORDER BUTTON */}
          <motion.div whileHover={{ scale: 1.03 }} className="mt-8">
            <Button onClick={() => setIsOpen(true)} label="Order Now" />
          </motion.div>

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
        </div>
      </motion.div>
      <MealsDetailsWithReviews></MealsDetailsWithReviews>
    </Container>
  );
};

export default MealsDetails;
