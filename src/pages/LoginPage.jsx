import { useEffect, useState } from "react";
import { validateEmail } from "../js/errorHandling/validate/validateEmail";
import { loginUser } from "../js/API/loginFetch";
import { validatePassword } from "../js/errorHandling/validate/validatePassword";
import useAuthStore from "../js/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../js/store/useNotificationStore";

export default function LoginPage() {
  const { addNotification } = useNotificationStore();
  useEffect(() => {
    document.title = "Login | Holidaze";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useAuthStore();
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
      const user = await loginUser(formData.email, formData.password);
      setUser(user, user.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);
      addNotification(`${error.message}`, "error");
      setErrors({ form: "Invalid email or password." });
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">Login</h1>
        <form className="wax-w-xl py-8 px-4" onSubmit={handleSubmit}>
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
          {errors.form && <div className="text-red-500">{errors.form}</div>}
          <button
            className="bg-blue-500 rounded-lg py-2 px-4 mt-2 text-white  "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
