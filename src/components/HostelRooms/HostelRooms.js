import React from 'react';
import room1 from '../../images/rooms/room-1.jpg';
import room2 from '../../images/rooms/room-2.jpg';
import room3 from '../../images/rooms/room-3.jpg';

const HostelRooms = () => {
    return (
        <div className="container py-5">
            <h1 className="py-3">Hostel Rooms</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    <div class="card h-100">
                        <img src={room1} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h4 class="card-title">Double Room with Private Bathroom</h4>
                            <p class="card-text">See availability</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <img src={room2} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h4 class="card-title">Bed in 6-Bed Room with Shared Bathroom
                            </h4>
                            <p class="card-text">See availability</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <img src={room3} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h4 class="card-title">Bed in 6-Bed Room with Shared Bathroom
                            </h4>
                            <p class="card-text">See availability</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostelRooms;