import { useEffect, useState } from "react";
import {getMovieList, searchMovie} from "./api"
import './App.css';

function App() {
  const [popularMovies, setPopularMovies] = useState([])

useEffect(() => {
  getMovieList().then((result) => {
    setPopularMovies(result)
  })
}, [] )


const PopularMovieList = () => {
  return popularMovies.map((movie, i) => {
    return (
    <div className="Movie-wrapper" key={i}>
    <div className="Movie-title">{movie.title}</div>
    <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className='Movie-image' />
    <div className="Movie-date">Release : {movie.release_date}</div>
    <div className="Movie-rate">{movie.vote_average}</div>
  </div>
    )
  })
}


const search = async (q) =>{
if (q.length > 3){
  const query = await searchMovie(q)
  setPopularMovies(query.results)
}
}

  return (
    <div className="App">
   <header className='app-header'>
    <h1>GET MOVIE WITH API</h1>
        <input 
        placeholder='cari film disini' 
        className='Movie-search'
        onChange={({target}) => search(target.value)} />
        <div className="Movie-container">
        <PopularMovieList/>
        </div>
   </header>
      </div>

  );
}

export default App;
