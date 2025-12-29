import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [active, setActive] = useState(false); // false = login, true = signup
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Validation
    let validationErrors = {};

    if (!formData.email)
      validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      validationErrors.email = "Invalid email";

    if (!formData.password)
      validationErrors.password = "Password is required";
    else if (formData.password.length < 6)
      validationErrors.password =
        "Password must be at least 6 characters";

    if (active && !formData.name)
      validationErrors.name = "Full name is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/${
          active ? "register" : "login"
        }`,
        formData
      );

      // ✅ LOGIN SUCCESS
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isLoggedIn", "true");

        toast.success(
          active ? "Signup successful 🎉" : "Login successful 🚀"
        );

        navigate("/dashboard");
      } else {
        toast.info(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signUpWrapper appmain">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          {/* NAME (Signup only) */}
          {active && (
            <div>
              <input
                name="name"
                type="text"
                placeholder="Full name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="errors">{errors.name}</p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="errors">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="errors">{errors.password}</p>
            )}
          </div>

          {/* SUBMIT */}
          <button type="submit" disabled={loading}>
            {loading ? (
              <ClipLoader size={18} color="#fff" />
            ) : active ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="alternate">
          {active
            ? "Already have an account?"
            : "New to TripMate?"}
          <span onClick={() => setActive(!active)}>
            {active ? " Login" : " Create account"}
          </span>
        </p>
      </div>
    </div>
  );
};
