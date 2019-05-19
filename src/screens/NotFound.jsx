import React from 'react';
import { NavigationBar } from '../components/Navbar';
import background from '../img/background-1.png';

export const NotFound = () => {
    return (
        <div>
            <div>
                <img className="background-1" src={background} alt="background2"></img>
            </div>
            <NavigationBar />
            <h1>Page Not Found</h1>
        </div>
    )
}