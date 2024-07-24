import React, { useEffect, useState } from 'react';
import '..//Components/HomePage.css';
import {useNavigate } from 'react-router-dom';

export default function SearchMovies({searchQuery,genre,movies,showType}) {
  const [selectedItem,setSelectedItem] = useState('');
  const [selectedFilters,setSelectedFilters] = useState('');
  const [showTypeFilter,setShowTypeFilter] = useState('');

  useEffect(() => {
    setSelectedItem(searchQuery);
    setSelectedFilters(genre);
    setShowTypeFilter(showType);
  }, [searchQuery,genre,showType]);


 const filteredMovies = movies.filter((movie)=>{
  const processedMovies = movie.Title.toLowerCase();
  const processedMovies2 = movie.Genre.toLowerCase();
  const processShowtype = movie.DisplayType.toLowerCase();
  const searchWords = (selectedItem).toLowerCase().split(' ');
  const genreWords = (selectedFilters).toLowerCase().split(' ');
  const showypeWords = (showTypeFilter).toLowerCase().split(' ');
  return (searchWords.every(keyword=> processedMovies.includes(keyword)) && genreWords.every(keyword=> processedMovies2.includes(keyword)) && showypeWords.every(keyword=> processShowtype.includes(keyword)));
 });
 const dataToPass = { name: 'GeeksforGeeks', age: 20 };
 const navigate = useNavigate();
 
  return (
    filteredMovies.map((movie)=>(
      <div
          key={movie.id}
          style={{ color: 'white' }}
          onClick={() => navigate('/seatBooking', { state:{name:movie.Title}})}>
                  <div className='movie-card'>
                    <div className='movie-card-pic'>
                        <img className='movie-pic' src={movie.PicUrl}></img>
                    </div>
                        <div className='movie-card-footer'>
                            <p style={{fontSize:'40',fontWeight:'bold'}} >{movie.Title}</p>
                            <p>{movie.Genre}</p>
                        </div>
                    </div>
      </div>
    ))
  )
}
