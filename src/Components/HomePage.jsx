import React from 'react';
import {movies} from '../Components/Data/MovieData';
import {Cinemas} from '../Components/Data/Cinemas';
import {CinemaTypes} from '../Components/Data/CinemaTypes';
import {Genres} from '../Components/Data/MovieGenres';
import {ShowTimes} from '../Components/Data/MovieShowTimes';
import '../Components/HomePage.css'

export default function HomePage() {
  return (
    <div>
        <div className='home-center'>
            <div className='movie-top' >
                <input type='search' placeholder='Search for a movie' className='search-box'></input>
                <div className='filter-box-container' >
                    <p>Filter by:</p>
                    <select className='filter-box'>
                        <option hidden={true} >Cinemas</option>
                        {Cinemas.map((cinema)=>(
                        <option>{cinema.name}</option>
                    ))}</select>

                    <select className='filter-box'>
                    <option hidden={true}>Cinema Type</option>
                    {CinemaTypes.map((cinemaType)=>(
                        <option>{cinemaType.name}</option>
                    ))}
                    
                    </select>
                    
                    <select className='filter-box' >
                        <option hidden={true}>Genres</option>
                        {Genres.map((genre)=>(
                            <option>{genre.name}</option>
                        ))}
                    </select>

                    <select className='filter-box' >
                        <option hidden={true}>Show Time</option>
                        {ShowTimes.map((time)=>(
                            <option>{time.time}</option>
                        ))}
                    </select>
                </div>
                <h4>Reset</h4>
            <div className='show-status' >
                <p>NOW SHOWING (41)</p>
                <p>COMMING SOON (15)</p>
            </div>
                <div className='divider' ></div>
            </div>
            <div className='movies-center' >
                {movies.map((movie)=>(
                    <div className='movie-card'>
                    <div className='movie-card-pic'>
                        <img className='movie-pic' src={movie.PicUrl}></img>
                    </div>
                        <div className='movie-card-footer'>
                            <p style={{fontSize:'40',fontWeight:'bold'}} >{movie.Title}</p>
                            <p>{movie.Genre}</p>
                        </div>
                    </div>
                ))}
                
                </div>
        </div>
    </div>
  )
}
