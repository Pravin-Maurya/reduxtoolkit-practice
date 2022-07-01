import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {fetchAsyncMovies, fetchAsyncShows} from '../../features/Movies/MovieSlice';
import user from '../../images/user.png';
import './Header.scss';

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const submitHandler=(e)=>{
    e.preventDefault()
    if(inputValue===''){
      alert('Please Enter Search Value');
    }else{
      dispatch(fetchAsyncMovies(inputValue))
    dispatch(fetchAsyncShows(inputValue))
    setInputValue('')
    }
    
  }
  return (
    <div className='header'>
      
      <div className='logo'>
        <Link to='/'> Movie App</Link>
      </div>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <input type='text' value={inputValue} placeholder='Search Movie or Show' onChange={(e)=>setInputValue(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </div>
      
      <div className='user-img'>
        <img src={user} alt='user' />
      </div>
      
    </div>
  )
}
export default Header