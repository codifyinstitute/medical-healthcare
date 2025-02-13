import React, { useState, useEffect } from 'react';
import "./Contact.css";
import Footer from './Layout/Footer';
import logo from "./../assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";

const Contact = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Subject: '',
        Message: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData };

        // Validate name field for alphabets only
        if (name === 'Name') {
            if (/^[a-zA-Z]*$/.test(value) || value === '') {
                newFormData[name] = value;
                setFormData(newFormData);
                // Clear error when user starts typing again
                if (errors[name]) {
                    setErrors({ ...errors, [name]: '' });
                }
            }
        } else {
            newFormData[name] = value;
            setFormData(newFormData);
            // Clear error when user starts typing again
            if (errors[name]) {
                setErrors({ ...errors, [name]: '' });
            }
        }
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.Name.trim()) {
            newErrors.Name = "Name is required.";
        } else if (!/^[a-zA-Z]*$/.test(formData.Name)) {
            newErrors.Name = "Name should only contain alphabets.";
        }

        if (!formData.Email.trim()) {
            newErrors.Email = "Email is required.";
        } else if (!validateEmail(formData.Email)) {
            newErrors.Email = "Invalid email format.";
        }

        if (!formData.Subject.trim()) {
            newErrors.Subject = "Subject is required.";
        }

        if (!formData.Message.trim()) {
            newErrors.Message = "Message is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('https://api-5e1h.onrender.com/medical/response/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Data sent successfully');
                    setFormData({
                        Name: '',
                        Email: '',
                        Subject: '',
                        Message: '',
                    });
                } else {
                    alert('Failed to send data: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while sending data');
            }
        }
    };

    return (
        <section className='contact-main'>
            <div className="contact-container">
                <div className="contact-header">
                    <img src={logo} alt="Logo" />
                    <h2>Contact
                        <p>Home<MdKeyboardArrowRight className='right-arrow'/>Contact</p>
                    </h2>
                </div>
                <div className="contact-content">
                    <div className="contact-content-header">
                        <h2>Get In Touch With Us</h2>
                        <p>For More Information About Our Product & Services. Please Feel Free To Drop Us</p>
                        <p>An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                    </div>
                    <div className="contact-content-main">
                        <div className="contact-content-left">
                            <div className="contact-address">
                                <h2><FaLocationDot />Address</h2>
                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                            <div className="contact-phone">
                                <h2><FaPhoneAlt />Phone</h2>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>
                            <div className="contact-time">
                                <h2><MdOutlineAccessTime />Working Time</h2>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                        <div className="contact-content-right">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="Name">Your Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="John"
                                    value={formData.Name}
                                    onChange={handleChange}
                                />
                                {errors.Name && <p className="error">{errors.Name}</p>}

                                <label htmlFor="Email">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="john@email.com"
                                    value={formData.Email}
                                    onChange={handleChange}
                                />
                                {errors.Email && <p className="error">{errors.Email}</p>}

                                <label htmlFor="Subject">Subject</label>
                                <input
                                    type="text"
                                    name="Subject"
                                    placeholder="Subject"
                                    value={formData.Subject}
                                    onChange={handleChange}
                                />
                                {errors.Subject && <p className="error">{errors.Subject}</p>}

                                <label htmlFor="Message">Message</label>
                                <textarea
                                    name="Message"
                                    cols={60}
                                    rows={5}
                                    value={formData.Message}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.Message && <p className="error">{errors.Message}</p>}

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Contact;
