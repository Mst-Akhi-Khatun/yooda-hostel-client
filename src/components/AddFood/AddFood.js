import React from 'react';
import { useForm } from 'react-hook-form';

const AddFood = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        fetch("https://mighty-everglades-68813.herokuapp.com/addFood", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('New Food successfully added');
                    reset()
                }
            })
    };
    return (
        <div className="container mt-4">
            <h1 className="pink-text">Add Food</h1>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="form-control my-3 "
                            placeholder="Food Name"
                        />
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="form-control my-3 "
                            placeholder="Price"
                        />
                        <input type="submit" value="Add Food" className="pink-btn w-100 mb-5" />
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};



export default AddFood;