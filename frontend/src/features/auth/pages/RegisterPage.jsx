import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { registerApi, checkEmailExists } from "../services/authService";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = async () => {
    const newErrors = {};

    // Name validation - length check
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must not exceed 50 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    } else {
      // Check if email already exists
      try {
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
          newErrors.email = "Email already registered";
        }
      } catch (error) {
        console.error("Error checking email:", error);
        // Don't block registration if check fails
      }
    }

    // Password validation - strength requirements
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special symbol (!@#$%^&*)";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      await registerApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      toast.success("Registration Successful");

      window.location.href = "/login";
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
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
      <h2 className="text-3xl font-bold text-center text-[#0B2E59]">
        Register
      </h2>

 <Input
  label="Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter Name"
  error={errors.name}
/>

      {/* {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} */}

  <Input
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter Email"
  error={errors.email}
  autoComplete="off"
/>

      {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}

   <Input
  label="Password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter Password"
  error={errors.password}
  autoComplete="new-password"
/>
      {/* {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )} */}

 <Input
  label="Confirm Password"
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm Password"
  error={errors.confirmPassword}
  autoComplete="new-password"
/>
{/* 
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )} */}

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
