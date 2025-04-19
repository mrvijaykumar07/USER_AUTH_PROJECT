import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false); // ✅ New state for "Verify Email"
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (activeTab === "register" && (!firstName || !lastName || !agreeTerms))) {
      alert("Please fill all fields and agree to the terms!");
      return;
    }

    setLoading(true);
    try {
      const baseURL = process.env.REACT_APP_API_URL;
      const url = activeTab === "register"
        ? `${baseURL}/api/create`
        : `${baseURL}/api/login`;
        
      const payload = activeTab === "register" ? { fname: firstName, lname: lastName, email, password } : { email, password };
      const response = await axios.post(url, payload, { withCredentials: true });

      if (response.data.success) {
        if (activeTab === "login") {
      
          alert("Login successful!");
          if (rememberMe) localStorage.setItem("email", email);
          navigate("/");
        } else {
          alert("Registration successful! You can now log in.");
          setActiveTab("login");
        }
      } else {
        if (response.data.verifyEmail) {
          setShowVerifyButton(true);  // ✅ Show "Verify Email" button
          alert("Please verify your email before logging in.");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-96">
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center ${activeTab === "login" ? "border-b-2 border-blue-500 font-semibold text-blue-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center ${activeTab === "register" ? "border-b-2 border-blue-500 font-semibold text-blue-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && (
            <>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />
            </>
          )}
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />
          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} /> Remember me
            </label>
            {activeTab === "login" && <a href="#" className="text-blue-500">Forgot password?</a>}
          </div>
          {activeTab === "register" && (
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} /> I agree to the <a href="#" className="text-blue-500">terms and conditions</a>
            </label>
          )}
          <button type="submit" disabled={loading} className={`w-full p-3 rounded-lg text-white font-semibold ${activeTab === "register" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} transition`}> 
            {loading ? "Processing..." : activeTab === "register" ? "Sign up" : "Sign in"}
          </button>

          {/* ✅ Show "Verify Email" Button if User is Not Verified */}
          {showVerifyButton && (
            <button 
              onClick={() => alert("Check your email for the verification link!")}
              className="w-full p-3 mt-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
            >
              Verify Email
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
