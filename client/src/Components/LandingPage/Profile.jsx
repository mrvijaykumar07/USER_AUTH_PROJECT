import { useContext, useState } from "react";
import axios from "axios"; // ✅ Import Axios for API requests
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../Data/DataProvider";

export default function Profile() {
  const navigate = useNavigate();
   


  const {fname,setFname,setLname,lname,setEmail,email,verified,isLoggedIn, setIsLoggedIn}=useContext(DataContext);



  const handleLogout = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/api/logout`,
        { withCredentials: true }
      );
    
      setFname("");
      setLname("");
      setEmail("");
      setIsLoggedIn(false); // 👈 data refetch on logout
      alert("Logged out successfully!");
      navigate("/");
    }
     catch (error) {
      console.error("Logout failed:", error);
    }
  };

  
  const handleUpdateProfile = () => {
    navigate("/edit");
  };
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      // Implement delete account logic
      console.log("Account deleted");
      navigate("/");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="w-96 p-6 bg-white rounded-2xl shadow-lg relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        onClick={() => navigate("/")}
      >
        ✖
      </button>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center mb-4">
          <FaUser size={40} className="text-gray-500" />
        </div>
        <Link to="/profile" className="text-xl font-bold text-blue-600 hover:underline">
          {fname }  { lname}
        </Link>
        <p className="text-green-600 font-medium">
  {verified ? "You are verified" : "You are not verified"}
</p>



        <button onClick={handleUpdateProfile} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Update
        </button>


        <button onClick={handleDeleteAccount} className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
          Delete Account
        </button>
        <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  </div>
  );
}
