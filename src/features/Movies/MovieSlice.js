import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieApi from '../../common/Apis/MovieApi';
import { ApiKey } from '../../common/Apis/MoviesApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (inputValue)=>{
    const response= await MovieApi
      .get(`?apikey=${ApiKey}&s=${inputValue}&type=movie`)
      .catch(err=>{
        console.log('Err:', err)
      });
      return response.data;
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (inputValue)=>{
    const response= await MovieApi
      .get(`?apikey=${ApiKey}&s=${inputValue}&type=series`)
      .catch(err=>{
        console.log('Err:', err)
      });
      return response.data;
})

export const fetchAsyncMovieOrShowsDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowsDetails', async (id)=>{
    const response= await MovieApi
      .get(`?apikey=${ApiKey}&i=${id}&Plot=full`)
      .catch(err=>{
        console.log('Err:', err)
      });
      return response.data;
})

const initialState = {
    movie:{},
    shows:{},
    selectMovieOrShow:{},
}

const movieSlice=createSlice({
    name: 'movie',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state)=>{
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: ()=>{
            console.log('pending');
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload})=>{
            console.log('fetched successfully');
            return {...state, movie:payload};
        },
        [fetchAsyncMovies.rejected]: ()=>{
            console.log('Rejected');
        },
        [fetchAsyncShows.fulfilled]: (state, {payload})=>{
            console.log('fetched successfully');
            return {...state, shows:payload};
        },
        [fetchAsyncMovieOrShowsDetails.fulfilled]: (state, {payload})=>{
            console.log('fetched successfully');
            return {...state, selectMovieOrShow:payload};
        }
    },
});

export const {removeSelectedMovieOrShow} = movieSlice.actions; 
export const getAllMovies = (state)=> state.movie.movie;
export const getAllShows = (state)=> state.movie.shows;
export const getSelectedMovieOrShow = (state)=> state.movie.selectMovieOrShow;
export default movieSlice.reducer;
