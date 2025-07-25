import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { fetchUsername } from "../features/userdata/usernameSlice";
import MainLogo from "../assets/Main-Logo.png";

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = type === "signup";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
        formData,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Success");

      if (res.data.success) {
        // Fetch username to update Redux store
        await dispatch(fetchUsername());
        // Redirect to Home
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-800 to-amber-100">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <img src={MainLogo} alt="Logo" className="mx-auto mb-6 h-24" />

        <h1 className="text-2xl font-bold mb-4 font-robotoserif">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300 font-quicksand"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300 font-quicksand"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300 font-quicksand"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-2 font-quicksand"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-gray-700 font-quicksand">{message}</p>

        {/* Links */}
        <div className="mt-4">
          {isSignup ? (
            <p className="text-sm font-quicksand">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline font-medium">
                Log In
              </Link>
            </p>
          ) : (
            <p className="text-sm font-quicksand">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline font-medium">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
