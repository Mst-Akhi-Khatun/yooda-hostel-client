import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/Not-Found/not-found.jpg';

const NotFound = () => {
    // not found section
    return (
        <div className="py-5 container">
            <img src={image} alt="" className="w-100" />
            <Link to="/home">
                <button className="btn btn-warning mt-3">RETURN TO HOME PAGE</button>
            </Link>
        </div>
    );
};

export default NotFound;