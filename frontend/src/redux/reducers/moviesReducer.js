// Getting data stored in localStorage
let getLocalMovieData = () => {
  let data = JSON.parse(localStorage.getItem("movie"));

  return data?.movie;
};
// UserReducer function for movie selection
let movieReducer = (
  state = getLocalMovieData() ? getLocalMovieData() : "",
  action
) => {
  // Handels movie data action
  switch (action.type) {
    case "movie":
      return (state = action.payload);
    default:
      return state;
  }
};
// Exporting 'movieReducer' to use in rootReducer
export default movieReducer;
