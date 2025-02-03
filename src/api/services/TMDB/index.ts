import { movieCastDetails, movieDetails, nowPlayingMovies, popularMovies, searchMovies, topRatedMovies, upcomingMovies } from "../../TMDB";

  
  export const getNowPlaying = async () => {
    try {
      const data = await fetch(nowPlayingMovies);
      return await data.json();
    } catch (error) {
      console.log('Error occurred while fetching now playing movies');
    }
  };
  
  export const getBackground = async () => {
    try {
      const data = await fetch(nowPlayingMovies);
      const movie = await data.json();
      const random = Math.floor(Math.random()*20)
      return movie.results[random].backdrop_path
    } catch (error) {
      console.log('Error occurred while fetching now playing movies');
    }
  };
  
  export const getUpcoming = async () => {
    try {
      const data = await fetch(upcomingMovies);
      return await data.json();
    } catch (error) {
      console.log('Error occurred while fetching upcoming playing movies');
    }
  };
  
  export const getPopular = async () => {
    try {
      const data = await fetch(popularMovies);
      return await data.json();
    } catch (error) {
      console.log('Error occurred while fetching popular playing movies');
    }
  };
  
  export const getTopRated = async () => {
    try {
      const data = await fetch(topRatedMovies);
      return await data.json();
    } catch (error) {
      console.log('Error fetching top rated movies');
    }
  };
  
  export const getFilteredMovies = async (keyword: string) => {
    try {
      const data = await fetch(searchMovies(keyword));
      return await data.json();
    } catch (error) {
      console.log('Error occurred while searching');
    }
  };
  
  export const getMovie = async (id: number) => {
    try {
      const movie = await fetch(movieDetails(id));
      return await movie.json();
    } catch (error) {
      console.log('Error fetching movie details');
    }
  };
  
  export const getCast = async (id: number) => {
    try {
      const cast = await fetch(movieCastDetails(id));
      return await cast.json();
    } catch (error) {
      console.log('Error fetching movie cast details');
    }
  };
  