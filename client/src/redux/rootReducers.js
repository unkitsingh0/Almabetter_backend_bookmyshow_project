import { combineReducers } from "redux";

// Import individual reducer files
import movieReducer from "./reducers/moviesReducer";
import timeSlotReducer from "./reducers/timeSlotReducer";
import seatsReducer from "./reducers/seatsReducer";
import lastBookingReducer from "./reducers/lastBookingReducer";

// Combine individual reducers into a root reducer
const rootReducers = combineReducers({
  movie: movieReducer, // Manages movie-selection-related state
  timeSlot: timeSlotReducer, // Manages time-slot-selection-related state
  seats: seatsReducer, // Manages seats-selection-related state
  lastBooking: lastBookingReducer, // Manages lastBooking-related state
});

// Exporting 'rootReducers' to use in redux store
export default rootReducers;
