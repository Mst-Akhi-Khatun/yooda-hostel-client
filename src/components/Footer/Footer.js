import React from 'react';

const Footer = () => {
    // this is footer section
    return (
        <div className="footer-container bg-dark text-light p-4 pt-5">
            <div className="row">
                <div className="col-md-5 text-start ps-5">
                    <h4 className="text-uppercase">
                        <span className="text-warning">travily</span> tour planner
                    </h4>
                    <h3>Subscribe Us Now:</h3>
                    <div class="input-group w-75">
                        <input type="text" className="form-control" placeholder="your email address" />
                        <button className="btn btn-warning" type="button">Subscribe</button>
                    </div>
                    <p className="mt-3">Thanks for subscribing us.</p>
                    <i className="fab fa-facebook-square fs-2"></i>
                    <i className="fab fa-linkedin fs-2 mx-4"></i>
                    <i className="fab fa-twitter-square fs-2"></i>
                    <i className="fab fa-whatsapp-square fs-2 ms-4"></i>
                </div>
                <div className="col-md-5 text-start ps-5">
                    <h3>Need Help ?</h3>
                    <p>
                        Email for Us<br />
                        <h5>
                            Mail: abc @gmail.com
                        </h5>
                    </p>
                    <p>call us <br /> <h5>01734-364-545</h5> </p>
                    <p>Location<br /> <h5>Main Street, Victoria 8007.</h5> </p>
                </div>
                <div className="col-md-2 text-start ps-5">
                    <h3>Platform</h3>
                    <p>Partners</p>
                    <p>News & Blogs</p>
                    <p>Package</p>
                    <p>FAQs</p>
                </div>
            </div>
            <hr />
            <footer>
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-white text-center">&copy; Travily Tour Planner All Rights Reserved</p>
                    </div>
                    <div className="col-md-6">
                        <span className="border-end me-2 pe-2">Privacy Policy</span>
                        <span className="border-end me-2 pe-2">Terms of Use</span>
                        <span>Cookie Policy</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;