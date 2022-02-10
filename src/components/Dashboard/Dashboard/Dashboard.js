import React from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import banner from '../../../images/banner-1.jpg';
import AddFood from '../../AddFood/AddFood';
import AddStudents from '../../AddStudents/AddStudents';
import AdminRoute from '../../Authentication/AdminRoute/AdminRoute';
import FoodDistribution from '../../FoodDistribution/FoodDistribution';
import Foods from '../../Foods/Foods';
import Students from '../../Students/Students';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const { user, logout, admin } = useAuth()
    return (
        <div style={{ minHeight: "400px" }}>
            <Navbar className="pink-bg" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="/" className="text-white text-uppercase">
                        {user?.email && <h4>{user?.displayName}'s Dashboard</h4>}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton className="pink-bg">
                            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">Dashboard</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="light-pink-bg text-start menu-item">
                            <Nav className="justify-content-end flex-grow-1 ps-5 fs-5">
                                <Link to="/home" className="nav-item">Home</Link>
                                {admin && <Nav>
                                    <Link to={`${url}/foods`} className="nav-item">Foods</Link>
                                    <Link to={`${url}/students`} className="nav-item">Students</Link>

                                    <Link to={`${url}/addFood`} className="nav-item">Add Food</Link>
                                    <Link to={`${url}/addStudent`} className="nav-item">Add Student</Link>
                                    <Link to={`${url}/foodDistribution`} className="nav-item">Food Distribution</Link>
                                </Nav>}
                                <button onClick={logout} className="pink-btn mt-3 w-50">Log out</button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <div>
                <Switch>
                    <Route exact path={`${path}`}>
                        <img src={banner} alt="" className="img-fluid" />
                    </Route>
                    <Route exact path={`${path}`}>
                        <img src={banner} alt="" className="img-fluid" />
                    </Route>
                    <Route exact path={`${path}/foods`}>
                        <Foods></Foods>
                    </Route>
                    <Route exact path={`${path}/students`}>
                        <Students></Students>
                    </Route>
                    <AdminRoute exact path={`${path}/addFood`}>
                        <AddFood></AddFood>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/addStudent`}>
                        <AddStudents></AddStudents>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/foodDistribution`}>
                        <FoodDistribution></FoodDistribution>
                    </AdminRoute>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;