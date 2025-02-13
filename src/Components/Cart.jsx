import React, { useState, useEffect } from 'react';
import logo from "./../assets/logo.png";
import "./Cart.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Layout/Footer';
import Advertise from './Layout/Advertise';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const Cart = ({ cart }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [file, setFile] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [image, setImage] = useState(null);
    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        setCartItems(cart); // Update cartItems state when cart prop changes
    }, [cart]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userToken');
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            handleLoginRedirect('/cart');
        }
    }, []);

    useEffect(() => {
        if (location.state && location.state.product && location.state.quantity) {
            const newProduct = {
                ...location.state.product,
                quantity: location.state.quantity
            };
            setCartItems((prevItems) => [...prevItems, newProduct]);
        }
    }, [location.state]);

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post("http://localhost:8000/upload", formData);
            console.log("File upload successful", response.data);

            setImage(response.data.image);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.SP) || 0;
            const itemQuantity = parseInt(item.quantity, 10) || 0;
            return total + (itemPrice * itemQuantity);
        }, 0);
    };

    const handleCheckout = () => {
        const ids = cartItems.map(item => item.id);
        setSelectedIds(ids);
        navigate('/Shipping', { state: { selectedIds: ids } });
    };

    const handleDeleteItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const handleLoginRedirect = (target) => {
        navigate('/login', { state: { from: target } });
    };

    return (
        <section className="cart-main">
            <div className="cart-container">
                <div className="cart-header">
                    <img src={logo} alt="" />
                    <h2>Cart
                        <p>Home<MdKeyboardArrowRight className='right-arrow' />Cart</p>
                    </h2>
                </div>
                <div className="cart-overview">
                    <div className="cart-flex">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-left">
                                <div className="left-img">
                                    <img src={item.Image} alt={item.Heading} />
                                </div>
                                <div className="cart-item">
                                    <h3>{item.Heading}</h3>
                                    <h4>{item.Manufacturer}</h4>
                                    <h2>Rs. {item.SP}</h2>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="delete-section">
                                        <MdDelete className='del-icon' onClick={() => handleDeleteItem(index)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <div className="total-header">
                            <h2>Cart Totals</h2>
                        </div>
                        <div className="total-content">
                            <h4>Subtotal</h4>
                            <p>Rs. {calculateSubtotal()}</p>
                        </div>
                        <div className="total-content">
                            <h4>Total</h4>
                            <p>Rs. {calculateSubtotal()}</p>
                        </div>
                        <div className="checkout-btn">
                            <button onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Advertise />
            <Footer />
        </section>
    );
};

export default Cart;
