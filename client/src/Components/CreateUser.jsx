import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/create`,
        {
          fname: firstName,
          lname: lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      
      console.log("User created successfully:", response.data);
      navigate("/");
      
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      alert("Failed to create user. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Create User</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <div className="font-medium text-gray-700 mb-1">First Name</div>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-1">Last Name</div>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-1">E-Mail</div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-1">Password</div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <br />
          <hr />

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
