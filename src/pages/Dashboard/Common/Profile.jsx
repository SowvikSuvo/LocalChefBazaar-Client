import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  // Fetch additional user info like address, role, status, chefId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users/${user?.uid}`); // replace with your API
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleRequest = async (requestType) => {
    if (!userData) return;

    const requestData = {
      _id: userData._id,
      userName: userData.displayName,
      userEmail: userData.email,
      requestType,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      await axios.post("/api/admin/requests", requestData); // send to admin
      Swal.fire(
        "Request Sent!",
        `Your ${requestType} request is pending.`,
        "success"
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send request.", "error");
    }
  };

  if (!user || !userData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {" "}
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 overflow-hidden">
        {/* Cover Image */}{" "}
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full h-56 object-cover mb-4"
        />
        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 -mt-16">
          <img
            alt="profile"
            src={user?.photoURL}
            className="w-24 h-24 rounded-full border-2 border-white object-cover"
          />

          <p className="mt-2 p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            {userData.role || "user"}
          </p>

          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>

          {/* User Info Card */}
          <div className="w-full p-4 mt-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {user?.displayName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {userData.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {userData.role || "user"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {userData.status || "active"}
              </p>
              {userData.role === "chef" && (
                <p>
                  <span className="font-semibold">Chef ID:</span>{" "}
                  {userData.chefId}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4 justify-center">
              {userData.role === "user" && (
                <button
                  onClick={() => handleRequest("chef")}
                  className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700 transition"
                >
                  Be a Chef
                </button>
              )}

              {userData.role !== "admin" && (
                <button
                  onClick={() => handleRequest("admin")}
                  className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition"
                >
                  Be an Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
