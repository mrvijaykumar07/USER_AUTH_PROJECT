import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [barbar,setBarbar]=useState(true);
  const [verified,setVerified]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 Add this

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Pehle Token Check Karo
        const authRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/check-auth`, { withCredentials: true });

        console.log("Checking id in token");

        if (authRes.data.authenticated) {
          const userId = authRes.data.userId; // ✅ Middleware se mila ID
          console.log("userId",userId);
          // ✅ Ab User Data Fetch Karo             
          const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/getoneuser/${userId}`, { withCredentials: true });

          console.log("Data",userRes);
          // ✅ Context me Store Karo
          setFname(userRes.data.fname);
          setLname(userRes.data.lname);
          setEmail(userRes.data.email);
          setVerified(userRes.data.isVerified)
        }
      } catch (error) {
        console.error("User fetch error:", error);
        // setFname(""); 
        // setLname("");
        // setEmail("");
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  return <DataContext.Provider value={{ fname, setFname,lname,setLname, email, setEmail, verified,setVerified, barbar, setBarbar, isLoggedIn, setIsLoggedIn }}>{children}</DataContext.Provider>;
};

export default DataProvider;
