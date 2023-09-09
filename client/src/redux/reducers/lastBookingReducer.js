// Holds last booking data
let initialState = null;
// UserReducer function for displaying last booking details of movie
let lastBookingReducer = (state = initialState, action) => {
  // Handels last-booking data action
  switch (action.type) {
    case "lastBooking":
      return (state = action.payload);
    default:
      return state;
  }
};
// Exporting 'lastBookingReducer' to use in rootReducer
export default lastBookingReducer;
