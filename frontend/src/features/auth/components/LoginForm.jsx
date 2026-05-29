import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../../../api/axiosInstance";

import { AuthContext } from "../../../context/AuthContext";

import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/login",

        formData,
      );

      login(response.data);
      toast.success("Login successful");

      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
