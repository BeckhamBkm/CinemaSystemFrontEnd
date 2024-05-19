import React, { useEffect, useState } from 'react';
import '..//Components/HomePage.css'

export default function SearchMovies({searchQuery,genre,movies}) {
  const [selectedItem,setSelectedItem] = useState('');
  const [selectedFilters,setSelectedFilters] = useState('');

  useEffect(() => {
    setSelectedItem(searchQuery);
    setSelectedFilters(genre);
  }, [searchQuery,genre]);


 const filteredMovies = movies.filter((movie)=>{
  const processedMovies = movie.Title.toLowerCase();
  const processedMovies2 = movie.Genre.toLowerCase();
  const searchWords = (selectedItem).toLowerCase().split(' ');
  const genreWords = (selectedFilters).toLowerCase().split(' ')
  return (searchWords.every(keyword=> processedMovies.includes(keyword)) && genreWords.every(keyword=> processedMovies2.includes(keyword)));
 });
  return (
    filteredMovies.map((movie)=>(
      <div className='movie-card'>
                    <div className='movie-card-pic'>
                        <img className='movie-pic' src={movie.PicUrl}></img>
                    </div>
                        <div className='movie-card-footer'>
                            <p style={{fontSize:'40',fontWeight:'bold'}} >{movie.Title}</p>
                            <p>{movie.Genre}</p>
                        </div>
                    </div>
    ))
  )
}
