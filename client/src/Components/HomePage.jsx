import React from "react";
import {  useNavigate } from "react-router-dom";
import MainPage from "./LandingPage/MainPage";
import axios from "axios"; // Import axios for API call

const App = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/logout`, {
        withCredentials: true,
      });
      

      if (response.data.success) {
        alert("Logout successful!");
        navigate("/login"); // Redirect to login page after logout
      } else {
        alert("Logout failed! Try again.");
      }
    } catch (error) {
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <>
      <MainPage />
      <div onClick={handleLogout}>g</div>
      {/* <div className="flex h-screen">
     
        <div className="w-64 bg-gray-800 text-white flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-6">MERN Auth</h2>
          <nav className="space-y-4">

            <Link to="/login" className="block py-2 px-4 rounded hover:bg-gray-700">
              Login
            </Link>
            <Link to="/create" className="block py-2 px-4 rounded hover:bg-gray-700">
              Create
            </Link>
            <button onClick={handleLogout} className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700">
              Logout
            </button>
            <Link to="/verify" className="block py-2 px-4 rounded hover:bg-gray-700">
              Verify Email
            </Link>
            <Link to="/change-password" className="block py-2 px-4 rounded hover:bg-gray-700">
              Change Password
            </Link>
            <Link to="/auth" className="block py-2 px-4 rounded hover:bg-gray-700">
              LOGIN/REGISTER
            </Link>
          </nav>
        </div>

      
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold">You are logged in _Your Name__</h1>
        </div>

        <ShowAllUserData />
      </div>
    </> */}
  </>
  );
};

export default App;
