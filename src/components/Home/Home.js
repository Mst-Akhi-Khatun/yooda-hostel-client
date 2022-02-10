import React from 'react';
import Banner from '../Header/Banner/Banner';
import MenuBar from '../Header/MenuBar/MenuBar';
import HostelRooms from '../HostelRooms/HostelRooms';

const Home = () => {
    return (
        <div>
            <MenuBar></MenuBar>
            <Banner></Banner>
            <HostelRooms></HostelRooms>
        </div>
    );
};

export default Home;