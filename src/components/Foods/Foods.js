import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Foods = () => {

    const [allFoods, setAllFoods] = useState([]);
    const [remove, setRemove] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;

    useEffect(() => {
        fetch(`https://mighty-everglades-68813.herokuapp.com/allFoods?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setAllFoods(data.result);
                const count = data.count;
                const pageNumber = Math.ceil(count / 5);
                setPageCount(pageNumber)
            })
    }, [remove, updated, page])

    const handleRemove = id => {
        const proceed = window.confirm("Sure want to remove?");
        if (proceed) {
            fetch(`https://mighty-everglades-68813.herokuapp.com/removeFood/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Food successfully removed!")
                        setRemove(!remove)
                    };
                })
        }
    }

    return (
        <div className="container my-5">

            <h1 className="my-5">Food</h1>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allFoods.map((food, index) => <tr key={food?._id}>
                            <td>{index + 1}</td>
                            <td>{food?.name}</td>
                            <td>$ {food?.price}</td>
                            <td><button onClick={() => handleRemove(food?._id)} className="btn btn-danger mt-1 me-2">Remove</button></td>
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


export default Foods;