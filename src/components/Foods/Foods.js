import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Foods = () => {
   
    const [allFoods, setAllFoods] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/allFoods')
            .then(res => res.json())
            .then(data => setAllFoods(data))
    }, [])

  

    return (
        <div className="container my-5">

            <h1 className="my-5">Food</h1>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allFoods.map((food, index) => <tr key={food?._id}>
                            <td>{index + 1}</td>
                            <td>{food?.name}</td>
                            <td>$ {food?.price}</td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};


export default Foods;