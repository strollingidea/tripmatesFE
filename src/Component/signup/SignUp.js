import { useState } from "react";
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import './SignUp.scss';
import Logo from '../../Images/logo.png';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [active, setActive] = useState(false); // false -> login, true -> signup
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1️⃣ Validation
        let validationErrors = {};
        if (!formData.email) validationErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = "Invalid email";

        if (!formData.password) validationErrors.password = "Password is required";
        else if (formData.password.length < 6) validationErrors.password = "Password must be at least 6 characters";

        if (active && !formData.name) validationErrors.name = "Full name is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // 2️⃣ API call
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}api/auth/${active ? "signup" : "login"}`,
                formData
            );

            if (response.data.token) {
                // Save token & user info in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                toast.success(active ? "Signup successful" : "Login successful");
                navigate("/plantrip");
            } else {
                toast.info(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signUpWrapper appmain">
            <div className="signup">
                <div className="logo">
                    <a href="/">
                        <img src={Logo} alt='Lost in Mountains'/>
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    {active && (
                        <div>
                            <input 
                                name="name" 
                                type="text" 
                                placeholder="Full name" 
                                onChange={handleChange} 
                            />
                            {errors.name && <p className="errors">{errors.name}</p>}
                        </div>
                    )}
                    <div>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Email" 
                            onChange={handleChange} 
                        />
                        {errors.email && <p className="errors">{errors.email}</p>}
                    </div>
                    <div>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={handleChange} 
                        />
                        {errors.password && <p className="errors">{errors.password}</p>}
                    </div>

                    <button type="submit">
                        {loading ? <ClipLoader size={20} color="#fff" /> : active ? "Sign Up" : "Login"}
                    </button>
                </form>

                <p className="alternate">
                    {active ? "Already have an account?" : "New to Lost in Mountains?"} 
                    <span onClick={() => setActive(!active)}>
                        {active ? " Login" : " Create account"}
                    </span>
                </p>
            </div>
        </div>
    );
};
