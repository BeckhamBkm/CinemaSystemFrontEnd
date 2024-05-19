import React from 'react';
import '../Components/Navbar.css';

export default function Navbar() {
  return (
    <div>
        <div className='nav-content' >
            <select>
                <option hidden={true} ><h4>Bokang Modise</h4></option>
                <option><h3>MY DASHBOARD</h3></option>
                <option><h3>SIGN OUT</h3></option>
            </select>
           
        </div>
    </div>
  )
}
