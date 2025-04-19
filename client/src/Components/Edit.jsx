import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [oneData, setOneData] = useState({});

  const newData = {
    fname: firstName,
    lname: lastName,
    email,
    password,
  };

  const fetchSingleUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getoneuser/${id}`
      );
      setOneData(response.data);
      setFirstName(response.data.fName || "");
      setLastName(response.data.lName || "");
      setEmail(response.data.email || "");
      setPassword(response.data.password || "");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchSingleUserData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update/${id}`, newData);
      navigate("/");
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update User Data</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
