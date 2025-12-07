import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle Make Fraud
  const handleMakeFraud = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark ${user.displayName} as fraud.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark fraud",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/fraud/${user.email}`);
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark fraud");
    }
  };

  return (
    <div className="p-5">
      {" "}
      <h1 className="text-3xl font-bold mb-5 text-center">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.status === "fraud" ? (
                    <span className="text-red-500 font-bold">Fraud</span>
                  ) : (
                    user.status
                  )}
                </td>
                <td>
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleMakeFraud(user)}
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
