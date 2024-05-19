import React, { useState } from 'react';
import {movies} from '../Components/Data/MovieData';
import {Cinemas} from '../Components/Data/Cinemas';
import {CinemaTypes} from '../Components/Data/CinemaTypes';
import {Genres} from '../Components/Data/MovieGenres';
import {ShowTimes} from '../Components/Data/MovieShowTimes';
import '../Components/HomePage.css'
import SearchMovies from '../Functions/SearchMovies';
import Footer from './Footer';
import Navbar from './Navbar';

export default function HomePage() {
const [searchQuery,setSearchQuery] = useState('')
const [genre,setGenre] = useState('')
const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    event.target.blur(); // This line makes the selected option lose focus
  };

  return (
    <div>
        <Navbar />
        <div className='home-center'>
            <div className='movie-top' >
                <input onTouchCancelCapture={false} type='search' placeholder='Search for a movie' className='search-box' onChange={(e)=>setSearchQuery(e.target.value)} ></input>
                <div className='filter-box-container' >
                    <p>Filter by:</p>
                    <select onChange={handleSelect} className='filter-box'>
                        <option hidden={true} >Cinemas</option>
                        {Cinemas.map((cinema)=>(
                        <option>{cinema.name}</option>
                    ))}</select>

                    <select onChange={handleSelect} className='filter-box'>
                    <option hidden={true}>Cinema Type</option>
                    {CinemaTypes.map((cinemaType)=>(
                        <option>{cinemaType.name}</option>
                    ))}
                    
                    </select>
                    
                    <select onChange={(e)=>[handleSelect,setGenre(e.target.value)]} className='filter-box' >
                        <option hidden={true}>Genres</option>
                        {Genres.map((genre)=>(
                            <option>{genre.name}</option>
                        ))}
                    </select>

                    <select onChange={handleSelect} className='filter-box' >
                        <option style={{color:'red'}} hidden={true}>Show Time</option>
                        {ShowTimes.map((time)=>(
                            <option>{time.time}</option>
                        ))}
                    </select>
                </div>
                <h4>Reset</h4>
            <div className='show-status' >
                <p className='status-header' >NOW SHOWING (41)</p>
                <p>COMMING SOON (15)</p>
            </div>
                <div className='divider' ></div>
            </div>
                <div className='movies-center' >
                    <SearchMovies searchQuery={searchQuery} genre={genre} movies={movies} />
                </div>
        </div>
        <Footer />
    </div>
  )
}
