import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../../../api/axiosInstance";

const RegisterForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: "",

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
      "/auth/register",
      formData
    );
 
    console.log(response.data);
 
    navigate("/login");
 
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
    return (
        <form

            onSubmit={handleSubmit}

            className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-4">

                Register
            </h2>

            <input

                type="text"

                name="name"

                placeholder="Name"

                value={formData.name}

                onChange={handleChange}

                className="w-full border p-2 mb-4"

            />

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

            <input

                type="password"

                name="confirmPassword"

                placeholder="Confirm Password"

                value={formData.confirmPassword}

                onChange={handleChange}

                className="w-full border p-2 mb-4"

            />

            <button

                type="submit"

                className="bg-green-500 text-white px-4 py-2 w-full"
            >

                Register
            </button>
        </form>

    );

};

export default RegisterForm;
