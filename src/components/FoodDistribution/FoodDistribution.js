import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const FoodDistribution = () => {
    const { register, handleSubmit, reset } = useForm();
    // manage order section
    const [allStudents, setAllStudents] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/allStudents')
            .then(res => res.json())
            .then(data => setAllStudents(data))
    }, [])

    const onSubmit = data => {

    };

    return (
        <div className="container my-5">

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Food Distribution</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                                <input
                                    type="text"
                                    {...register("fullName", { required: true })}
                                    className="form-control my-3 "
                                    placeholder="Full Name"
                                />
                                <input
                                    type="number"
                                    {...register("roll", { required: true })}
                                    className="form-control my-3 "
                                    placeholder="Roll"
                                />
                                <input
                                    type="number"
                                    {...register("age", { required: true })}
                                    className="form-control my-3 "
                                    placeholder="Age"
                                />
                                <input
                                    type="number"
                                    {...register("class", { required: true })}
                                    className="form-control my-3 "
                                    placeholder="Class"
                                />
                                <input
                                    type="text"
                                    {...register("hall", { required: true })}
                                    className="form-control my-3 "
                                    placeholder="Hall"
                                />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="my-5">Food Distribution List</h1>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Roll</th>
                        <th>Status</th>
                        <th>Give Food</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudents.map((student, index) => <tr key={student?._id}>
                            <td>{index + 1}</td>
                            <td>{student?.fullName} ({student?.status})</td>
                            <td>{student?.roll}</td>
                            <td>
                            </td>
                            <td>

                                <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Food</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default FoodDistribution;