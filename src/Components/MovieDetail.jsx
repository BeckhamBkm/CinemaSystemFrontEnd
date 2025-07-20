import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cinemas } from "./Data/Cinemas";
import { BsPlayCircle } from "react-icons/bs";
import axios from "axios";

export default function MovieDetail() {
  const location = useLocation();
  const { state } = location;
  const[relatedMovies,setRelatedMovies]=useState([])
  
   useEffect(()=>{
    axios.get(`https://localhost:7006/movies?page=${1}&pageSize=${6}&genre=${state.genre}`)
  .then(res=>setRelatedMovies(res?.data))
  .catch()
  },[state])

  const filteredMovies = relatedMovies.filter(p=>p.genre === state.genre && p.title !== state.title)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  });
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  const DisplayTrailer = ({ onClose }) => {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "70%",
            maxWidth: "900px",
            backgroundColor: "#000",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
              backgroundColor: "#000",
            }}
          >
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "30px",
                cursor: "pointer",
                lineHeight: "1",
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <iframe
              width="855"
              height="481"
              src={state?.trailerLink}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ height: "600px", width: "100%", justifyContent: "center" }}>
        {showTrailer && (
          <DisplayTrailer onClose={() => setShowTrailer(false)} />
        )}
        <div
          onClick={() => setShowTrailer(true)}
          style={{
            marginTop: "15%",
            marginLeft: "17%",
            backgroundColor: "#16191c",
            width: "65%",
            height: "340px",
            position: "absolute",
          }}
        >
          <div>
            <BsPlayCircle
              style={{
                height: "23%",
                width: "23%",
                position: "absolute",
                marginLeft: "2%",
                marginTop: "10%",
              }}
            />
            <img
              style={{ margin: "3%", width: "20%" }}
              className="movie-pic"
              alt=""
              src={state.imageUrl}
            ></img>
          </div>
        </div>
        <img style={{objectFit:'cover'}}
          alt=""
          className="carousel-image"
          src={state.imageUrl}
        ></img>

        <div
          style={{
            marginTop: "-4%",
            marginLeft: "17%",
            backgroundColor: "#16191c",
            width: "65%",
            height: "45%",
            position: "absolute",
          }}
        >
          <h1 style={{ marginLeft: "5%", fontSize: "40px" }}>
            START YOU BOOKING
          </h1>

          <p style={{ fontSize: "17px", fontWeight: "400", marginLeft: "5%" }}>
            Choose a Cienema
          </p>

          <select style={{ marginLeft: "5%", width: "30%", height: "12%" }}>
            {Cinemas.map((cinema, cIndex) => {
              return (
                <option>
                  <select key={cIndex}>{cinema.name}</select>
                </option>
              );
            })}
          </select>

          <div
            style={{
              marginLeft: "15%",
              marginTop: "3%",
              backgroundColor: "white",
              width: "70%",
              height: "100px",
            }}
          >
            {days.map((day) => (
              <button
                style={{
                  height: "100%",
                  width: "13%",
                  display: "inline-flex",
                  paddingTop: "-10%",
                }}
                key={day}
                className={`px-4 py-2 rounded ${
                  selectedDate === day
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedDate(day);
                  setSelectedShowtime(null);
                  navigate("/seatBooking", {state: state}
            )}
              }
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{ position: "absolute", marginTop: "20%", marginLeft: "17%" }}
      >
        <h1>RELATED MOVIES</h1>
        <div
          style={{
            width: "200px",
            height: "300px",
            marginBottom: "10%",
            display:'flex'
          }}
        >
          {filteredMovies.map((movie,index) => (
            <>
            <div onClick={() =>
                [navigate("/details", {
                  state: {
                    cienemaName: state.cienema,
                    title: movie.title,
                    imageUrl: movie.imageUrl,
                    cost: movie.price,
                    genre: movie.genre,
                    trailerLink: movie.trailerLink
                  }}),window.scrollTo(0,0)]}  className="movie-card">
              <div className="movie-card-pic">
                <img className="movie-pic" alt="" src={movie.imageUrl}></img>
              </div>
              <div className="movie-card-footer">
                <p key={index} style={{ fontSize: "40", fontWeight: "bold" }}>
                  {movie.title}
                </p>
                <p>{movie.genre}</p>
              </div>
            </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
