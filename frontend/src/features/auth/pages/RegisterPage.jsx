import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { registerApi } from "../services/authService";

const RegisterPage = () => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
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

      await registerApi(formData);

      toast.success(
        "Registration Successful"
      );

      window.location.href =
        "/login";

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
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
        Register
      </h2>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
      />

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
            ? "Registering..."
            : "Register"
        }
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600"
        >
          Login
        </Link>
      </p>

    </form>
  );
};

export default RegisterPage;