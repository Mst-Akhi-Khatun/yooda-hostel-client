import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';

// this is register section
const Register = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [booking, setBooking] = useState({});

    // use effect
    useEffect(() => {
        fetch(`https://travily-tour-planner.herokuapp.com/booking/${id}`)
            .then(res => res.json())
            .then(data => setBooking(data))
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.status = 'pending';
        data.img = booking.img;
        fetch('https://travily-tour-planner.herokuapp.com/bookPackage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Package successfully booked!');
                    reset();
                }
            })

    };
    return (
        <div className="row g-4">
            <div className="col-md-12">
                <div className="row px-4">
                    <div className="col-md-3"></div>
                    <div className="mx-auto col-md-6">
                        <Card className="shadow-lg pt-3">
                            <Card.Img variant="top" src={booking?.img} className="w-50 mx-auto" height="200px" />
                            <Card.Body>
                                <Card.Title><h3>{booking?.name}</h3></Card.Title>
                                <Card.Text>
                                    <h4>{booking?.description}</h4>
                                </Card.Text>
                                <h3 className="text-primary">${booking?.price}</h3>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="container py-5">
                    <h1 className="my-3 text-warning text-uppercase">Package Registration Form</h1>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {user?.displayName && <input className="form-control" {...register("username", { required: true })} defaultValue={user?.displayName} />}

                                {user?.email && <input className="form-control my-4" {...register("email", { required: true })} defaultValue={user?.email} />}

                                <input className="form-control" {...register("address", { required: true })} placeholder="Address" />
                                {errors.address && <span className="text-danger">This field is required</span>}

                                <input className="form-control mt-4" {...register("date", { required: true })} type="date" />
                                {errors.date && <span className="text-danger">This field is required</span>}

                                {booking?.name && <input className="form-control mt-4" {...register("package", { required: true })} defaultValue={booking?.name} />}

                                {booking?.price && <input className="form-control mt-4" {...register("price", { required: true })} defaultValue={booking?.price} />}

                                <input className="mt-4 btn-warning form-control" type="submit" value="Registration" />
                            </form>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;