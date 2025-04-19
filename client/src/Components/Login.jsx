import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../Data/DataProvider"; // ✅ User Context Import

const Login = () => {
  const { setFname,setLname, setEmail ,isLoggedIn, setIsLoggedIn } = useContext(DataContext); // ✅ User Data Set Karne Ke Liye
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch User Data After Login
  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/getoneuser", {
  //       withCredentials: true,
  //     });

  //     if (res.data) {
  //       setFname(res.data.fname);
  //       setLname(res.data.fname);
  //       setEmail(res.data.email);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //   }
  // };

  // Login Function
  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password!");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setShowVerifyButton(false);
    
    try {

     
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`,
      formData,
      { withCredentials: true }
    );
    
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token); // ✅ Token Store in LocalStorage
        // fetchUser(); // ✅ Auto Fetch User Data
          setIsLoggedIn(true); // 👈 data re-fetch on login
    
        navigate("/");
      } else {
        setErrorMessage(response.data.message);
        if (response.data.verifyEmail === true) {
          setShowVerifyButton(true);
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to log in. Try again.");
    }

    setLoading(false);
  };

  // Function to send OTP
  const sendOTP = async () => {
    if (!formData.email) {
      alert("Please enter your email first!");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await axios.post(
       `${process.env.REACT_APP_API_URL}/api/sendOTP`,
        { email: formData.email },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("OTP sent successfully!");
        navigate(`/verify?email=${formData.email}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Failed to send OTP. Try again.");
    }

    setOtpLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>}

        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="font-medium text-gray-700 mb-1 block">E-Mail</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-1 block">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`w-full text-white py-2 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {showVerifyButton && (
          <button 
            onClick={sendOTP}
            className={`w-full mt-3 text-white py-2 rounded-lg transition ${
              otpLoading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            disabled={otpLoading}
          >
            {otpLoading ? "Sending OTP..." : "Verify Email"}
          </button>
        
        )}
       <div className="py-2 px-2 text-sm text-gray-700">
  New here?  
  <Link to="/create" className="text-green-600 font-semibold hover:underline"> Register</Link>
</div>

      </div>
    </div>
  );
};

export default Login;
