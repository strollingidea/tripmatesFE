import { useState } from "react"
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import './SignUp.scss'
import Logo from '../../Images/logo.png'

export const SignUp = () => {
    const [active, setActive] = useState(false);
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        let validationErrors = {};


        if (!formData.email) {
            validationErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {

            validationErrors.email = "Please enter a valid email address.";
        }


        if (!formData.password) {
            validationErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {

            validationErrors.password = "Password must be at least 6 characters.";
        }


        if (active && !formData.name) {
            validationErrors.name = "Full name is required.";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }



        try {
            setloading(true)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/${active ? "register-user" : "login-user"}`, formData);
            console.log(response.data);
            var form = document.getElementById("myForm");

            if (response.data.success)
                form.reset();

            toast.info(response.data.message);

        } catch (error) {
            console.log(error, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        } finally {
            setloading(false)
        }

    };


    return (
        <div className="signUpWrapper">

            <div className="signup">

                {/* <h2>{active ? "Sign Up" : "Login"} </h2> */}
                {/* <p>{active ? "To create an account,  Please enter your details below" : " Welcome Back, Please enter your details to log in"}
                </p> */}

                <div className="logo">
                <a href="/">
                    <img src={Logo} alt='Lost in Mountains'/>
                </a>
                </div>

                <form id="myForm" onSubmit={handleSubmit}>
                    {/* <div>
                        {active && (<input name="name" type="text" placeholder="Full name" onChange={handleChange} />)}
                        {errors.name && (<p className="errors">{errors.name}</p>)}
                    </div> */}
                    <div>
                        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                        {errors.email && (<p className="errors">{errors.email}</p>)}
                    </div>
                    <div>
                        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                        {errors.password && (<p className="errors">{errors.password}</p>)}
                    </div>
                    <button type="submit">{loading ? <ClipLoader size={20} color="#fff" /> : active ? "Sign Up" : "Login"} </button>
                </form>
                <p className="alternate" >{active ? "Already have an account?" : "New to Lost in Mountains?"} <span onClick={() => setActive(!active)}>{active ? "Login" : " Create account"}</span></p>

            </div>

        </div>
    )
}
