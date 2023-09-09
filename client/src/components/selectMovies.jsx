import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movies } from "./data";

// SelectMovies component
function SelectMovies() {
  //State to save user selection of movie
  let [selectMovie, setSelectMovie] = useState();

  // Selecting the user booking information from the Redux store.
  // This selector retrieves the movie data from the store's state to update after reload or after successful booking of movie.
  let state = useSelector((state) => state.movie);

  // Create an instance of the 'dispatch' function to update the movie
  let disptach = useDispatch();

  // Handel movieClick function to select movie and send it to store
  let handelMovieClick = (movie) => {
    // Stroing selected movie
    setSelectMovie(movie);

    // Dispatching an action to update the movie state in the store.
    disptach({ type: "movie", payload: movie });

    // Saving movie selection of user to localstorage
    localStorage.setItem("movie", JSON.stringify({ movie: movie }));
  };

  useEffect(() => {
    // Useing useEffect to update the value after reload if user has selected movie which is stored in localStorage
    setSelectMovie(state);
  }, [state]);

  // JSX structure of the 'selectMovies' component
  return (
    // Movies container
    <div className="movie-row">
      {/* Select movie heading */}
      <h3>Select Movie</h3>
      {/* All movies buttons div */}
      <div className="allButtons">
        {/* Generate a list of available movies as button */}
        {movies.map((movie) => {
          return (
            // Button to select movie by the user
            // After click of user to this button the class will change to movie-column-selected
            <button
              className={`movie-column ${
                selectMovie === movie ? "movie-column-selected" : ""
              }`}
              key={movie}
              onClick={(e) => {
                // Everytime user Click on button this function will br called
                handelMovieClick(movie);
              }}
            >
              {movie}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// Exporting 'SelectMovies' Component to use in other modules
export default SelectMovies;
