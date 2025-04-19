import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CreateUser from './Components/CreateUser';
import Edit from './Components/Edit';
import ShowAllUserData from './Components/ShowAllUserData';
import Login from './Components/Login';
import VerifyUser from './Components/VerifyUser';
import AuthPage from './Components/AuthPage';
import Profile from './Components/LandingPage/Profile';
import MainPage from './Components/LandingPage/MainPage';

import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes>
      {/* MainPage as the layout wrapper for all routes */}
      <Route path="/" element={<MainPage />}>
        <Route path="create" element={<CreateUser />} />
        <Route path="api/edit/:id" element={<Edit />} />
        <Route path="getall" element={<ShowAllUserData />} />
        <Route path="verify" element={<VerifyUser />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Routes that should not include the navbar */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;
