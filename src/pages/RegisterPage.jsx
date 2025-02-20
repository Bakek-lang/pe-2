import { useEffect, useState } from "react";
import { validateEmail } from "../js/errorHandling/validate/validateEmail";
import { validateName } from "../js/errorHandling/validate/validateName";
import { validatePassword } from "../js/errorHandling/validate/validatePassword";
import { registerUser } from "../js/API/registerFetch";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  useEffect(() => {
    document.title = "Register | Holidaze";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please use a 'stud.noroff.no' email address.";
    }

    if (!validateName(formData.name)) {
      newErrors.name =
        "Name can only contain letters, numbers and underscores.";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }

    try {
      const result = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration failed!", error.message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Register</h1>
      <form className="max-w-xl py-8 px-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border rounded w-full py-2 px-4 border-black"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border rounded w-full py-2 px-4 border-black"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border rounded w-full py-2 px-4 border-black"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>

        <button
          className="bg-blue-500 rounded-lg py-2 px-4 mt-2 text-white  "
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
