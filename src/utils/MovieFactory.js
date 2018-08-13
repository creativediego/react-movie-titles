/////////////////////////////////////////////////////////////////////////////////////
// Because the data structure for this app is very simple, local storage will be used
/////////////////////////////////////////////////////////////////////////////////////

//Stores the three boilder plate movies, which will later get added local storage
let movieList = [];

//Keeps track of unique movie IDs
let id = 0;

//Factory function that creates a movie object, gets the movies, and adds it to movieList array.
//I could have used a class for this, but chose this factory function
//to follow the open/close principle in SOLID
export function createMovie(title, director, releaseDate) {
  //closed variables
  id++;
  const movie = {
    id,
    title,
    director,
    releaseDate
  };
  //Returns the movie object
  const getMovie = () => movie;
  //Add movie to the movieList array in an immutable way
  const addToMovieList = () => {
    movieList = [...movieList, movie];
  };
  //Public methods
  return {
    getMovie,
    addToMovieList
  };
}
//Adds movies array to local storage using JSON stringify
export const addMoviesToLocalStorage = movies => {
  localStorage.setItem("movies", JSON.stringify(movies));
};
//Gets the movies from local storage
export const getMoviesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("movies"));

//Boiler plate movies
const episodeIV = createMovie("Episode IV", "George Lucas", "May 25, 1977");
episodeIV.addToMovieList();
const episodeV = createMovie("Episode V", "Irvin Kershner", "May 21, 1980");
episodeV.addToMovieList();
const episodeVI = createMovie("Episode VI", "Richard Marquand", "May 25, 1983");
episodeVI.addToMovieList();

//If no movies exist in local storage, add starter ones from movieList
if (!JSON.parse(localStorage.getItem("movies"))) {
  addMoviesToLocalStorage(movieList);
}
