import React, { useEffect, useState } from 'react';
import './Data/SeatingStyling.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { seats } from './Data/SeatList';

export default function SeatBooking() {
  const [seatStatus, setSeatStatus] = useState({});
  const [chosenSeatsCount, setChosenSeatsCount] = useState(0);
  const [seatColour, setSeatColour] = useState(seats.map(() => '#a9abae'));
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
   function handleSelectSeat(seatId){
    const isSelected = seatStatus[seatId] === 'Selected';
    
    setChosenSeatsCount((prev) => (isSelected ? prev - 1 : prev + 1));
    setSeatStatus((prevStatus) => {
      
      setSeatColour((prevColours) =>
        prevColours.map((colour, index) =>
          seats[index].id === seatId
            ? isSelected
              ? '#a9abae' 
              : '#0089d0'
            : colour
        )
      );
      
      setTotalPrice(state.cost * (isSelected ? chosenSeatsCount - 1 : chosenSeatsCount + 1));

      return {
        ...prevStatus,
        [seatId]: isSelected ? '' : 'Selected',
      };
   });
  };

  return (
    <>
      <div className='MainCenter'>
        <div className='PageBlock'>
          <h1 className='titleHeaders'>CHOOSE YOUR SEATS</h1>
          <h1 className='titleHeaders'>{}</h1>
          <div className='curvedLine'>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" >
              <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="aqua" strokeWidth="3" ></path>
            </svg>
          </div>
          <div className='CenterBlock'>
            {seats.map((seat, index) => (
              <div key={seat.id} className='ChairContainer'>
                <div
                  style={{backgroundColor: seatColour[index] }}
                  className='SeatBody'
                  onClick={()=>handleSelectSeat(seat.id)}
                >
                  {seat.seatNumber}
                </div>
                <div
                  style={{ backgroundColor: seatColour[index] }}
                  className='SeatHead'
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className='DetailsBlock'>
          <div style={{display:'flex',justifyContent:'space-between'}} > <h2 className='titleHeaders'>YOUR BOOKING</h2>
          <button style={{backgroundColor:'#000',color:"white",width:'70px',height:'40px',marginTop:'17px',marginRight:'10px',borderRadius:'3px',fontWeight:'600',border:'none'}}
           onClick={() => navigate('/')}>Cancel</button>
           </div>
          
          <h2 style={{ fontFamily: 'Montserrat, sans-serif',marginLeft:'5%' }}>{state.name}</h2>
          <img className='detailsImage' src={state.imageUrl} alt='' />       
            <h3 className='titleHeaders'>YOUR SEATS <br></br> {chosenSeatsCount > 0 ? (chosenSeatsCount) + "x Full Price" : null}</h3>
          <div style={{backgroundColor:'#212326',width:'90%',height:'60px',marginLeft:'5%',borderRadius:'5px',textAlign:'right'}} ><h3 className='titleHeaders'>Total: R{totalPrice.toFixed(2)}</h3></div>
          <button className='bookingButton' >Book now</button>
        </div>
      </div>
    </>
  );
}
