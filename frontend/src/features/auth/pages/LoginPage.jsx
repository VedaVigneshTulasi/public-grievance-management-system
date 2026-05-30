import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { loginApi } from "../services/authService";

const LoginPage = () => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await loginApi(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      toast.success(
        "Login Successful"
      );

      if (
        response.user.role ===
        "admin"
      ) {

        window.location.href =
          "/admin";

      } else {

        window.location.href =
          "/dashboard";

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <h2 className="text-3xl font-bold text-center text-[#0B2E59]">
        Login
      </h2>

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {
          loading
            ? "Logging In..."
            : "Login"
        }
      </Button>

      <p className="text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600"
        >
          Register
        </Link>
      </p>

    </form>
  );
};

export default LoginPage;