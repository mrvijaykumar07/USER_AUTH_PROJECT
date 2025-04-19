import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../Data/DataProvider";

const Navbar = () => {
   const {isLoggedIn, setIsLoggedIn ,fname,lname } = useContext(DataContext); 

  const navigate = useNavigate();

 

  // ✅ Check authentication status on component mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/check-auth`, { withCredentials: true })
      .then((response) => {
        console.log("Auth response:", response.data); // Debugging
        if (response.data.authenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      });
  }, []);
  
  
  

  // ✅ Handle User Icon Click (Toggle Dropdown)
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile"); // Redirect to profile if logged in
    } else {
     navigate("/login") 
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">MyLogo</div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
        <li><Link to="/blog" className="hover:text-gray-900">Blog</Link></li>
      </ul>

      {/* ✅ User Icon with Conditional Dropdown */}
      <div className="relative flex gap-2">
        <div>
        {fname}  {lname}
        </div>
        <FaUser 
          className="text-gray-700 cursor-pointer hover:text-gray-900" 
          size={20} 
          onClick={handleUserClick} 
        />

      </div>

      
    </nav>
  );
};

export default Navbar;
