import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowAllUserData = () => {
  const [alldata, setAlldata] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getall`);

      if (response.data && response.data.length > 0) {
        setAlldata(response.data);
      } else {
        console.log("No users found");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteuser/${id}`);

    setAlldata(alldata.filter(user => user._id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated data:", alldata);
  }, [alldata]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-semibold mb-6">Here All User Data:</h2>

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">E-mail</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {alldata.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.fname}</td>
                <td className="px-4 py-2 border">{user.lname}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border flex justify-center gap-4">
                  <Link to={`/api/edit/${user._id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowAllUserData;
