import React from 'react';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/Movies/MovieSlice';
import MovieCard from '../MovieCard/MovieCard'
import {Settings} from '../../common/settings'
import './MovieListing.scss'

const MovieListing = () => {
  const movies = useSelector(getAllMovies)
  const shows = useSelector(getAllShows)
  console.log(movies)
  let renderMovies, renderShows='';

  
  renderMovies=
   movies.Response === 'True' ? (
    movies.Search.map((movie, index)=>{
      return ( <MovieCard key={index} data={movie} />)
      
    })
  ):(<div className='movies-error'>{movies.Error}</div>)

  console.log(renderMovies.length);

  renderShows=
   shows.Response === 'True' ? (
    shows.Search.map((movie, index)=>{
      return ( <MovieCard key={index} data={movie} />)
      
    })
  ):(<div className='movies-error'>{movies.Error}</div>)

  return (
    <div className='movie-wrapper'>
      <div className='movie-list'>
      
        <h2>Movies</h2>
        {renderMovies && renderMovies.length>0 ?(<>
          <div className='movie-container'>
            <Slider {...Settings}>{renderMovies}</Slider>
          
        </div>
        
        </>): (<div className='loading-style'>Loading...</div>)}
        </div>
        
        <div className='show-list'>
        <h2>Shows</h2>
        {renderMovies && renderMovies.length>0 ?
        (<>
        <div className='movie-container'>
        <Slider {...Settings}>{renderShows}</Slider>
          
        </div>
        </>):  (<div className='loading-style'>Loading...</div>) 
        }
      </div>  
    </div>
  )
}
export default MovieListing;