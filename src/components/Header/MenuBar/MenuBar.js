import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import './MenuBar.css';

const MenuBar = () => {
    // menubar section
    const { user, logout } = useAuth();

    const history = useHistory();

    const handleLogIn = () => {
        history.push("/login")
    }
    const handleSignUp = () => {
        history.push("/register")
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        Yooda Hostel
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto menu d-flex align-items-center">
                            <Nav.Item>
                                <Link to="/home">Home</Link>
                                <Link to="/room">Rooms</Link>
                                <Link to="/dashboard">Admin Panel</Link>
                            </Nav.Item>

                            {user?.email ? <Nav.Item className="mt-1 text-center">

                                <span className="text-center"><a href="#login">{user?.displayName}</a></span>

                                <Button onClick={logout} variant="info" className="mx-3 mt-1 rounded-pill px-4">Log Out</Button>


                            </Nav.Item>
                                :
                                <div className="d-flex mt-1">
                                    <Button onClick={handleLogIn} variant="info" className="mx-3 rounded-pill px-4">Login</Button>
                                    <Button onClick={handleSignUp} variant="info" className="rounded-pill px-4">Sign up</Button>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MenuBar;