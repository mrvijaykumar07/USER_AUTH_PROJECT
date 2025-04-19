import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Data/DataProvider";

const RegisterLogin = () => {
  const { setFname,setLname, setEmail } = useContext(DataContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/create";
    
    try {
      const response = await axios.post(url, formData, { withCredentials: true });
      if (response.data.success) {
        if (isLogin) {
          setFname(response.data.fname);
          setLname(response.data.lname);
          setEmail(response.data.email);
          localStorage.setItem("authToken", response.data.token);
        }
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[400px]">
        <div className="flex justify-between mb-4 border-b pb-2">
          <button className={`w-1/2 py-2 ${isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`w-1/2 py-2 ${!isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`} onClick={() => setIsLogin(false)}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">{isLogin ? "Log In" : "Register"}</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterLogin;