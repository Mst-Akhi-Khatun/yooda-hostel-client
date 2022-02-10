import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Students = () => {
    // manage order section
    const [allStudents, setAllStudents] = useState([]);
    const [remove, setRemove] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;
    const [studentInfo, setStudentInfo] = useState({});
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch(`https://mighty-everglades-68813.herokuapp.com/allStudent?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setAllStudents(data.result);
                const count = data.count;
                const pageNumber = Math.ceil(count / 5);
                setPageCount(pageNumber)
            })
    }, [remove, updated, page])

    const handleRemove = id => {
        const proceed = window.confirm("Sure want to remove?");
        if (proceed) {
            fetch(`https://mighty-everglades-68813.herokuapp.com/removeStudent/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Student successfully removed!")
                        setRemove(!remove)
                    };
                })
        }
    }



    // update status
    const [operator, setOperator] = useState({});
    // handle update status
    const handleCheck = (id) => {
        fetch(`https://mighty-everglades-68813.herokuapp.com/allStudents/${id}`)
            .then((res) => res.json())
            .then((data) => setOperator(data));
        setOperator(operator.status = "inActive");

        fetch(`https://mighty-everglades-68813.herokuapp.com/allStudents/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(operator),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Status successfully Changed!");
                    setUpdated(!updated)
                }
            });
    }

    const onSubmit = data => {
        const id = studentInfo?._id
        fetch(`https://mighty-everglades-68813.herokuapp.com/updateStudent/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Successfully Updated!");
                    setUpdated(!updated)
                }
            });
        console.log(data);
    };

    const handleStudentInfo = id => {
        fetch(`https://mighty-everglades-68813.herokuapp.com/studentInfo/${id}`)
            .then(res => res.json())
            .then(data => setStudentInfo(data))

    }

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
                                {studentInfo?.fullName &&
                                    <input
                                        type="text"
                                        defaultValue={studentInfo?.fullName}
                                        {...register("fullName")}
                                        className="form-control my-3 "
                                        placeholder="Full Name"

                                    />}
                                {studentInfo?.age &&
                                    <input
                                        type="text"
                                        defaultValue={studentInfo?.age}
                                        {...register("age")}
                                        className="form-control my-3 "
                                        placeholder="Age"

                                    />}
                                {studentInfo?.roll &&
                                    <input
                                        type="number"
                                        defaultValue={studentInfo?.roll}
                                        {...register("roll")}
                                        className="form-control my-3 "
                                        placeholder="Roll"
                                    />}
                                {studentInfo?.class &&
                                    <input
                                        type="text"
                                        defaultValue={studentInfo?.class}
                                        {...register("class")}
                                        className="form-control my-3 "
                                        placeholder="Class"

                                    />}
                                {studentInfo?.hall &&
                                    <input
                                        type="text"
                                        defaultValue={studentInfo?.hall}
                                        {...register("hall")}
                                        className="form-control my-3 "
                                        placeholder="Hall"

                                    />}
                                {studentInfo?.status &&
                                    <input
                                        type="text"
                                        defaultValue={studentInfo?.status}
                                        {...register("status")}
                                        className="form-control my-3 "
                                        placeholder="Status"

                                    />}
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-info">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <h1 className="my-5">Students List</h1>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Age</th>
                        <th>Roll</th>
                        <th>Class</th>
                        <th>Hall</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudents.map((student, index) => <tr key={student?._id}>
                            <td>{index + 1}</td>
                            <td>{student?.fullName} ({student?.status})</td>
                            <td>{student?.age} Years Old</td>
                            <td>{student?.roll}</td>
                            <td>{student?.class}</td>
                            <td>{student?.hall}</td>
                            <td>
                                <span className="d-flex align-items-center">
                                    <input type="checkbox" className="me-2"
                                        onChange={() => handleCheck(`${student?._id}`)} />
                                    Inactive
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleRemove(student?._id)} className="btn btn-danger mt-1 me-2">Remove</button>
                                <button onClick={() => handleStudentInfo(student?._id)} className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
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
        </div>
    );
};
export default Students;