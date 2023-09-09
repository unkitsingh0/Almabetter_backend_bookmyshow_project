// Getting data stored in localStorage
let getSeatsData = () => {
  let data = JSON.parse(localStorage.getItem("seats"));
  return data;
};

// UserReducer function for seats selection
let seatsReducer = (state = getSeatsData() && getSeatsData(), action) => {
  // Handels seats data action
  switch (action.type) {
    case "seats":
      // Saving seats selection to localStorage selected by the user
      localStorage.setItem("seats", JSON.stringify(action.payload));
      return (state = action.payload);
    default:
      return state;
  }
};
// Exporting 'seatsReducer' to use in rootReducer
export default seatsReducer;
