import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './MenuBar.css';

const MenuBar = () => {
    // menubar section
    const { user, logOut } = useAuth();
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="px-3 d-flex">
                <Navbar.Brand className="d-flex align-items-center">
                    <h6 className="text-warning text-uppercase ms-1">YOODA HOSTEL</h6>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id="basic-navbar" className="ms-auto d-flex">
                        <div className="pt-1">
                            <Link className="a" to="/home">Home</Link>
                        </div>
                        {
                            user?.email ? <div>
                                <Link className="a" to="/myOrders">My Orders</Link>
                                <Link className="a" to="/manageOrders">Manage Orders</Link>
                                <Link className="a" to="/addOrders">Add Orders</Link>
                                <span className="text-warning me-1">{user?.displayName}</span>
                                <button onClick={logOut} className="btn btn-danger me-2 py-1">Log Out</button>
                            </div> :
                                <div id="login-button" className="d-flex align-items-center">
                                    <Link className="a" to="/login">Login</Link>
                                    <Link to="">
                                        <i className="fab fa-facebook icon text-warning fs-3"></i>
                                    </Link>
                                    <Link to="">
                                        <i className="fab fa-instagram-square icon text-warning fs-3 mx-2"></i>
                                    </Link>
                                    <Link to="">
                                        <i className="fab fa-youtube text-warning icon fs-3"></i>
                                    </Link>
                                </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default MenuBar;