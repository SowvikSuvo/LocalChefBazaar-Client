import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch meals created by chef
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["myMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-meals/${user.email}`);
      return res.data.data;
    },
  });

  // Delete meal
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this meal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/meals/${id}`);
    if (res.data.success) {
      Swal.fire("Deleted!", "Meal removed successfully", "success");
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5 text-center">My Meals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div className="card bg-base-100 shadow-xl" key={meal._id}>
            <figure className="h-48 w-full overflow-hidden rounded">
              <img
                className="w-full h-full object-cover"
                src={meal.foodImage}
                alt={meal.foodName}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{meal.foodName}</h2>

              <p>
                <strong>Price:</strong> ${meal.price}
              </p>
              <p>
                <strong>Rating:</strong> {meal.rating}
              </p>
              <p>
                <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
              </p>
              <p>
                <strong>Delivery:</strong> {meal.estimatedDeliveryTime}
              </p>
              <p>
                <strong>Chef:</strong> {meal.chefName}
              </p>
              <p>
                <strong>Chef ID:</strong> {meal.chefId}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

                <Link
                  to={`/dashboard/update-meal/${meal._id}`}
                  className="btn btn-info btn-sm"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
