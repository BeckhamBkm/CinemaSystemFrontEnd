import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { movies } from "../Components/Data/MovieData";
import { Cinemas } from "../Components/Data/Cinemas";
import { CinemaTypes } from "../Components/Data/CinemaTypes";
import { Genres } from "../Components/Data/MovieGenres";
import { ShowTimes } from "../Components/Data/MovieShowTimes";
import "../Components/HomePage.css";
import Footer from "./Footer";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import axios from "axios";

const HomePage = () => {



  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [cienema, setCienema] = useState("");
  const [showType, setShowType] = useState("");
  const [showTime, setShowTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7006/movies?page=${1}&pageSize=${20}&genre=${genre}&title=${searchQuery}`)
      .then(res => setMovies(res?.data))
      .catch()
  }, [genre, searchQuery])

  const handleSelect = (event) => {
    event.target.blur(); // This line makes the selected option lose focus
  };

  const handleReset = (e) => {
    // e.preventDefault();
    setCienema('');
    setGenre('');
    setShowType('');
    setShowTime('');
    setSearchQuery('');
  };

  return (
    <div>
      <div className="home-center">
        <div className="home-carousel">
          <img
            style={{ objectFit: "fill" }}
            alt=""
            className="carousel-image"
            src={
              'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/84c0b590317477.5e291ea97092e.jpg'
            }
          ></img>
          <div className="carousel-arrows-container">
            <span className="chevron">
              <GoChevronLeft />
            </span>
            <span className="chevron">
              <GoChevronRight />
            </span>
            <div className="carousel-progress">
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
              <div className="progres-circles"></div>
            </div>
          </div>
        </div>

        <div className="movie-top">
          <input
            type="search"
            placeholder={"Search for a movie"}
            className="search-box"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          ></input>
          <div className="filter-box-container">
            <p>Filter by:</p>
            <select
              onChange={(e) => [handleSelect(e), setCienema(e.target.value)]}
              className="filter-box"
              value={cienema}
            >
              <option hidden={true}>Cinemas</option>
              {Cinemas.map((cinema, index) => (
                <option
                  key={index}
                  style={{ display: "list-item" }}
                >
                  {cinema.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => [handleSelect, setShowType(e.target.value)]}
              className="filter-box"
              value={showType}
            >
              <option hidden={true} value={""}>
                Cinema Type
              </option>
              {CinemaTypes.map((cinemaType, index) => (
                <option key={index}>{cinemaType.name}</option>
              ))}
            </select>

            <select
              onChange={(e) => [handleSelect(e), setGenre(e.target.value)]}
              className="filter-box"
              value={genre}
            >
              <option hidden={true}>Genres</option>
              {Genres.map((genre, index) => (
                <option key={index}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select onChange={(e)=>[handleSelect,setShowTime(e.target.value)]}
            className="filter-box"
            value={showTime}
            >
              <option style={{ color: "red" }} hidden={true}>
                Show Time
              </option>
              {ShowTimes.map((time, index) => (
                <option key={index}>
                  {time.time}
                </option>
              ))}
            </select>
          </div>
          <h3 style={{ textDecorationLine: "underline" }} onClick={handleReset}>
            Reset
          </h3>
          <div className="show-status">
            <p className="status-header">NOW SHOWING ({movies.length})</p>
            <p>COMMING SOON (0)</p>
          </div>
          <div className="divider"></div>
        </div>
        <div className="movies-center">

          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{ color: "white" }}
              onClick={() =>
                navigate("/details", {
                  state: {
                    cienemaName: cienema,
                    title: movie.title,
                    imageUrl: movie.imageUrl,
                    cost: movie.price,
                    genre: movie.genre,
                    trailerLink: movie.trailerLink
                  },
                })
              }
            >
              <div className="movie-card">
                <div className="movie-card-pic">
                  <img className="movie-pic" alt="" src={movie.imageUrl}></img>
                </div>
                <div className="movie-card-footer">
                  <p style={{ fontSize: "40", fontWeight: "bold" }}>{movie.title}</p>
                  <p>{movie.genre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
