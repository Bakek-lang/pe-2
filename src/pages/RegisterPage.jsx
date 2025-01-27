import { useState } from "react";
import { validateEmail } from "../js/errorHandling/validate/validateEmail";
import { validateName } from "../js/errorHandling/validate/validateName";
import { validatePassword } from "../js/errorHandling/validate/validatePassword";
import { registerUser } from "../js/API/registerFetch";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
      console.log("Validation failed");
      return;
    }

    try {
      const result = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      console.log("Registration successful!", result);
    } catch (error) {
      console.log("Registration failed!", error.message);
    }

    console.log("validation works");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <button type="submit">Register</button>
        {errors.api && <div className="error">{errors.api}</div>}
      </form>
    </div>
  );
}
