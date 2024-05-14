import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import "./App.css";
import SignIn from "./components/Signin";

// Middleware
import { PrivateRoutes } from "./middleware/PrivateRoutes";
import { GuestRoutes } from "./middleware/GuestRoutes";
import MainPage from "./components/MainPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
