import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { loginApi } from "../services/authService";

import { Mail, Lock, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  if (errors[name]) {
    setErrors({
      ...errors,
      [name]: "",
    });
  }
};

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) {
  return;
}

try {
  setLoading(true);
      

      const response = await loginApi(formData);

      localStorage.setItem("token", response.token);

      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Login Successful");

      if (response.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  // console.log(formData);

  return (

    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

      <div className="mb-8 rounded-3xl border border-blue-100 bg-blue-50 p-5">
  <div className="flex items-center gap-3 text-[#0B2E59]">
    <ShieldCheck size={22} />
    <span className="font-semibold">
      Secure Government Authentication
    </span>
  </div>

  <p className="mt-3 text-sm text-slate-600">
    Login securely to lodge complaints, track grievance status,
    receive updates and communicate with departments.
  </p>
</div>
      <h2 className="text-5xl font-bold text-[#0B2E59]">
  Welcome Back
</h2>

<p className="mt-3 text-lg text-slate-500">
  Access your grievance dashboard
</p>
<Input
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter Email Address"
  icon={<Mail size={20} />}
  error={errors.email}
/>

<Input
  label="Password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter Password"
  icon={<Lock size={20} />}
  error={errors.password}
/>
{/* 
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )} */}

      <Button type="submit" disabled={loading}>
        {loading ? "Logging In..." : "Login"}
      </Button>

      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
