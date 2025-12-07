import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/requests");
      return res.data.filter((r) => r.requestStatus === "pending");
    },
  });

  // Unified Accept/Reject Handler
  const handleAction = async (request, action) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${action} this request.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/admin/requests/${request._id}`, {
      action,
      email: request.userEmail, // FIXED
      requestType: request.requestType, // FIXED
    });

    if (res.data.success) {
      Swal.fire("Success!", res.data.message, "success");
      refetch();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 text-center">Manage Requests</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Request Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.userName}</td>
              <td>{req.userEmail}</td>
              <td>{req.requestType}</td>
              <td className="capitalize">{req.requestStatus}</td>
              <td>{new Date(req.requestTime).toLocaleString()}</td>

              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  disabled={req.requestStatus !== "pending"}
                  onClick={() => handleAction(req, "accept")}
                >
                  Accept
                </button>

                <button
                  className="btn btn-error btn-sm"
                  disabled={req.requestStatus !== "pending"}
                  onClick={() => handleAction(req, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequest;
