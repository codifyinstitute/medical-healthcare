import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./ProductComparison.css";
import Footer from './Layout/Footer';
import { MdKeyboardArrowRight } from "react-icons/md";
import Advertise from './Layout/Advertise';
import logo from "./../assets/logo.png";

const ProductComparison = ({ addToCart }) => {
    const items = useSelector(state => state.compare);
    const navigate = useNavigate();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();

        // Set interval to fetch data every minute (60000 milliseconds)
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [productResponse, relatedResponse] = await Promise.all([
                fetch("https://api-5e1h.onrender.com/medical/medicine/all"),
                fetch("https://api-5e1h.onrender.com/medical/medicine/related")
            ]);

            if (!productResponse.ok || !relatedResponse.ok) {
                throw new Error(`HTTP error! status: ${productResponse.status}, ${relatedResponse.status}`);
            }

            const productData = await productResponse.json();
            const relatedData = await relatedResponse.json();

            // Process and filter product comparison data
            const shuffledData = shuffleArray(productData);
            const filteredProducts = shuffledData.filter(product => !items.some(item => item.id === product.id));
            const related = filteredProducts.slice(0, 4);
            setRelatedProducts(related);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        navigate('/cart');
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    return (
        <section className="productcomparison-main">
            <div className="productcomparison-container">
                <div className="productcomparison-header">
                    <img src={logo} alt="" />
                    <h2>Product Comparison</h2>
                    <p>Home <MdKeyboardArrowRight className='right-arrow' /> Comparison</p>
                </div>
                <div className="productcomparison-cards">
                    {items.map((res, id) => (
                        <div className="card-one" key={id}>
                            <img src={res.Image} alt="" />
                            <h2>{res.Heading}</h2>
                            <h3>Rs. {res.SP}</h3>
                        </div>
                    ))}
                </div>
                <div className="product-warranty">
                    <div className="warranty-header">
                        <hr />
                        <h2>Product Comparison</h2>
                    </div>
                    <div className="warranty-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Price</th>
                                    {items.map((data, id) => (
                                        <td key={id}>Rs. {data.SP}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Formulation</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Formulation}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Manufacturer</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Manufacturer}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Brand vs. Generic</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Brand ? "Brand" : "Generic"}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Storage Instructions</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Storage}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Dosage</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Dosage}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Disease Category</th>
                                    {items.map((data, id) => (
                                        <td key={id}>{data.Disease}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Add to Cart</th>
                                    {items.map((data, id) => (
                                        <td key={id}><button onClick={(e) => { e.stopPropagation(); handleAddToCart(data); }}>Add to Cart</button></td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="product-header">
                    <h2>Related Products</h2>
                </div>
                <div className="relatedproduct-cards">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((res, id) => (
                            <div className="card-one" key={id}>
                                <img src={res.Image} alt={res.Heading} />
                                <h2>{res.Heading}</h2>
                                <h4>{res.Subheading}</h4>
                                <h3>Rs. {res.SP}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No related products available</p>
                    )}
                </div>
            </div>
            <Advertise />
            <Footer />
        </section>
    );
};

export default ProductComparison;
