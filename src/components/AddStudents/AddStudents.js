import React from 'react';
import { useForm } from 'react-hook-form';

const AddStudents = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        data.status = 'active';
        fetch("https://mighty-everglades-68813.herokuapp.com/addStudent", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('New Student successfully added');
                    reset()
                }
            })
    };
    return (
        <div className="container mt-4">
            <h1 className="pink-text">Add Student</h1>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
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
                        <input type="submit" value="Add Student" className="pink-btn w-100 mb-5" />
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};

export default AddStudents;