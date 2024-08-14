import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/DashBoard";
import Analyse from "./pages/Analyse";
import AddPortfolio from "./pages/AddPortfolio";
import { useState, useEffect } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('access') || sessionStorage.getItem('access');
    if (token) {
        setIsLoggedIn(true);
        setName(localStorage.getItem('name') || sessionStorage.getItem('name'));
        setEmail(localStorage.getItem('email') || sessionStorage.getItem('email'));
    } else {
        setIsLoggedIn(false);
    }
}, []);

  return (
    <div className="md:h-screen bg-purple-100">
      <BrowserRouter>
        <ToastContainer />
        <AppNavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
        <div>
          <Routes>
            <Route
              path="/"
              exact
              element={<Home isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="register"
              exact
              element={<Register setIsLoggedIn={setIsLoggedIn} setName={setName} setEmail={setEmail} />}
            />
            <Route
              path="login"
              exact
              element={<Login setIsLoggedIn={setIsLoggedIn} setName={setName} setEmail={setEmail} />}
            />
            <Route
              path="forgotPassword"
              exact
              element={<ForgotPassword isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="resetPassword"
              element={<ResetPassword isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="profile"
              exact
              element={
                isLoggedIn ? (
                  <Profile isLoggedIn={isLoggedIn} name={name} email={email} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="dashboard"
              exact
              element={
                isLoggedIn ? (
                  <Dashboard isLoggedIn={isLoggedIn} name={name} email={email} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="analyse"
              exact
              element={
                isLoggedIn ? (
                  <Analyse isLoggedIn={isLoggedIn} name={name} email={email} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
             <Route
              path="addportfolio"
              exact
              element={
                isLoggedIn ? (
                  <AddPortfolio isLoggedIn={isLoggedIn} name={name} email={email} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          
          
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
