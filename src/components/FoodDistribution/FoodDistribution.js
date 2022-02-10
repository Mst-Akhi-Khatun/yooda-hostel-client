import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const FoodDistribution = () => {
    const { register, handleSubmit, reset } = useForm();
    // manage order section
    const [allStudents, setAllStudents] = useState([]);
    const [studentInfo, setStudentInfo] = useState({});
    const [allFoods, setAllFoods] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;

    useEffect(() => {
        fetch('http://localhost:5000/allFoods')
            .then(res => res.json())
            .then(data => setAllFoods(data))
    }, [])


    useEffect(() => {
        fetch(`http://localhost:5000/allStudent?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setAllStudents(data.result);
                const count = data.count;
                const pageNumber = Math.ceil(count / 5);
                setPageCount(pageNumber)
            })
    }, [updated, page])




    const onSubmit = data => {
        data.foodStatus = "served"
        const id = studentInfo?._id
        fetch(`http://localhost:5000/student/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Food successfully Served!");
                    setUpdated(!updated)
                }
            });

    };

    const handleStudentInfo = id => {
        fetch(`http://localhost:5000/studentInfo/${id}`)
            .then(res => res.json())
            .then(data => setStudentInfo(data))

    }


    return (
        <div className="container my-5">

            {studentInfo?.foodStatus ? <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ops Sorry!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h2>Already Served</h2>
                        </div>

                    </div>
                </div>
            </div>

                :
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
                                        defaultValue={studentInfo?.fullName}
                                        {...register("fullName")}
                                        className="form-control my-3 "
                                        placeholder="Full Name"

                                    />
                                    <input
                                        type="number"
                                        defaultValue={studentInfo?.roll}
                                        {...register("roll")}
                                        className="form-control my-3 "
                                        placeholder="Roll"
                                    />
                                    {allFoods.length &&
                                        <select className="form-control my-3 " {...register("food")}>

                                            {
                                                allFoods.map(food => <option value={food?.name}>{food?.name}</option>)
                                            }
                                        </select>}
                                    <select className="form-control my-3 " {...register("shift")}>
                                        <option value="morning">Morning</option>
                                        <option value="day">Day</option>
                                        <option value="night">Night</option>
                                    </select>
                                    <input
                                        type="date"
                                        {...register("date", { required: true })}
                                        className="form-control my-3 "
                                    />
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-info">Submit</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>}

            <h1 className="my-5">Food Distribution List</h1>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Roll</th>
                        <th>Status & Shift</th>
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
                                {student?.foodStatus && <span>{student?.foodStatus} ({student?.shift})</span>}
                            </td>
                            <td>

                                <button onClick={() => handleStudentInfo(student?._id)} className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Food</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
            <div className="pagination">
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button key={number} onClick={() => setPage(number)} className={page === number ? "selected" : ""}>{number + 1}
                        </button>)
                }
            </div>
        </div >
    );
};

export default FoodDistribution;