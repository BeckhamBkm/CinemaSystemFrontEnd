import React from 'react';
import '../Components/Navbar.css';

export default function Navbar() {
  return (
    <div>
        <div className='nav-content' >
          <img style={{height:60,width:170,marginLeft:20,marginTop:5}} alt=''  src={'https://www.sterkinekor.com/static/img/sk-logo.png'} ></img>
           <div className='nav-center'>
            <h4 className='nav-links'>HOME</h4>
            <h4 className='nav-links'>COMPETITIONS</h4>
            <h4 className='nav-links'>CLUB & MOVIE CARDS</h4>
            <h4 className='nav-links'>SUBSCRIPTION CLUB</h4>
            <h4 className='nav-links'>NEWS</h4>
            <h4 className='nav-links'>EXCLUSIVE Members</h4>
            <h4 className='nav-links'>CINEMA NOUVEAU</h4>
          </div>
          <h4 style={{marginTop:27,marginRight:-20}} ><span style={{color:'#0089d0'}} >300</span> POINTS</h4>
            <select className='nav-user' >
                <option hidden={true} >Bokang Modise</option>
                <option>MY DASHBOARD</option>
                <option>SIGN OUT</option>
            </select>
           
        </div>
    </div>
  )
}
