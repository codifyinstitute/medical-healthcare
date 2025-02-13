import './Combine.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

const Signup = () => {
    const [signUpData, setSignUpData] = useState({
        Name: "",
        Email: "",
        Pass: "",
        Contact: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handelSignUpData = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const storeSignUpData = async (e) => {
        e.preventDefault();

        const { Name, Email, Pass, Contact } = signUpData;

        try {
            const response = await fetch("https://api-5e1h.onrender.com/medical/user/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Name, Email, Pass, Contact, Address: {} })
            });

            const responseData = await response.json();
            if (response.status === 201) {
                alert("Data Added");
                setSignUpData({ Name: "", Email: "", Pass: "", Contact: "" });
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="signup-main">
            <div className="signup-container">
                <div className="signup-form">
                    <h2>Create your New Account</h2>
                    <div className="center-align">
                        <label htmlFor="Name">Name</label>
                        <input type="text" placeholder='Enter your Full Name' name='Name' id='Name' onChange={handelSignUpData} value={signUpData.Name} />
                    </div>
                    <div className="center-align">
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder='Enter your Email' name='Email' id='Email' onChange={handelSignUpData} value={signUpData.Email} />
                    </div>
                    <div className="center-align">
                        <label htmlFor="Pass">Password</label>
                        <div className="password-input">
                            <input type={showPassword ? "text" : "password"} placeholder='Enter your Password' name='Pass' id='Pass' onChange={handelSignUpData} value={signUpData.Pass} />
                            <span className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                            </span>
                        </div>
                    </div>
                    <div className="center-align">
                        <label htmlFor="Contact">Contact</label>
                        <input type="tel" placeholder='Enter your Contact Number' name='Contact' id='Contact' onChange={handelSignUpData} value={signUpData.Contact} />
                    </div>
                    <button onClick={storeSignUpData}>Create Account</button>
                </div>
                <div className="already-login">
                    <p>Already have an account?</p>
                    <Link to="/Login"><button>Log in</button></Link>
                </div>
            </div>
        </section>
    );
};

export default Signup;
