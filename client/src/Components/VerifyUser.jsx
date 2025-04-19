import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  const verifyOTP = async () => {
    if (!otp) {
      setErrorMessage("Please enter OTP!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/verifyOTP", { email, otp }, { withCredentials: true });

      if (response.data.success) {
        alert("Email verified successfully!");
        navigate("/login"); // Redirect to login after success
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to verify OTP.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Email</h2>

        {/* Show Email */}
        {email && <p className="text-gray-600 text-sm mb-2">OTP sent to: <strong>{email}</strong></p>}

        {/* Show Error Message */}
        {errorMessage && <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>}

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border mt-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Verify Button */}
        <button 
          onClick={verifyOTP} 
          className={`w-full text-white py-2 mt-3 rounded-lg transition ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
