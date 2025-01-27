import { useState } from "react";
import { validateEmail } from "../js/errorHandling/validate/validateEmail";

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
      newErrors.email = "Invalid email address";
    }

    console.log("this doesnt even get logged");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    console.log("validation works");
    console.log("formData", formData);
    console.log("new errors: ", errors);
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
