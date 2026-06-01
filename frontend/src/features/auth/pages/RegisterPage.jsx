import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { registerApi, checkEmailExists } from "../services/authService";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
     <div className="text-center">
  <h2 className="text-4xl font-bold text-[#0B2E59]">
    Create Account
  </h2>

  <p className="mt-2 text-slate-500">
    Register to submit and track grievances
  </p>

  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3">
    <ShieldCheck
      size={18}
      className="text-green-600"
    />

    <span className="text-sm font-medium text-green-700">
      Secure Government Registration
    </span>
  </div>
</div>

<Input
  label="Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter Full Name"
  error={errors.name}
  icon={<User size={18} />}
/>

      {/* {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} */}

<Input
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter Email Address"
  error={errors.email}
  autoComplete="off"
  icon={<Mail size={18} />}
/>

      {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}

 <Input
  label="Password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Create Password"
  error={errors.password}
  autoComplete="new-password"
  icon={<Lock size={18} />}
/>
{/* 
<div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
  <p className="text-sm font-semibold text-[#0B2E59]">
    Password Requirements
  </p>

  <ul className="mt-2 text-xs text-slate-600 space-y-1">
    <li>• Minimum 8 characters</li>
    <li>• One uppercase letter</li>
    <li>• One special character</li>
  </ul>
</div> */}
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
  icon={<Lock size={18} />}
/>
{/* 
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )} */}

    <Button
  type="submit"
  disabled={loading}
  className="w-full rounded-2xl py-4 text-lg font-semibold"
>
  {loading
    ? "Creating Account..."
    : "Create Account"}
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
