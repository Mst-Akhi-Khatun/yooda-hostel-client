import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div>
            <div className="banner-section d-flex justify-content-center align-items-center text-uppercase mt-1">
                <div className="text-white px-2">
                    <h2>WELCOME TO</h2>
                    <h1 className="px-3 py-2 mt-2 text fw-bolder"> Hostel <span className=""> Yooda</span></h1>
                    <p className="fs-4 fst-italic">Get Ready To Book The Hostel</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;