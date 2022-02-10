import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';


const Students = () => {
    // manage order section
    const [allStudents, setAllStudents] = useState([]);
    const [remove, setRemove] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;

    useEffect(() => {
        fetch(`http://localhost:5000/allStudent?page=${page}&&size=${size}`)
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
            fetch(`http://localhost:5000/removeStudent/${id}`, {
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

    /* const handleStatus = id => {
        fetch(`https://travily-tour-planner.herokuapp.com/allBookings/${id}`)
            .then((res) => res.json())
            .then((data) => setBooking(data));
        setBooking(booking.status = "Approved");

        fetch(`https://travily-tour-planner.herokuapp.com/allBookings/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Successfully Approved!");
                    setUpdateStatus(!updateStatus)
                }
            });
    } */

    // update status
    const [operator, setOperator] = useState({});
    // handle update status
    const handleCheck = (id) => {
        fetch(`http://localhost:5000/allStudents/${id}`)
            .then((res) => res.json())
            .then((data) => setOperator(data));
        setOperator(operator.status = "inActive");

        fetch(`http://localhost:5000/allStudents/${id}`, {
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
    return (
        <div className="container my-5">
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
                                {/* <button onClick={() => handleStatus(student?._id)} className="btn btn-warning mt-1 me-2">Approve</button> */}

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