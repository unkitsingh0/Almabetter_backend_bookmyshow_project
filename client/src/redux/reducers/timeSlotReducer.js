// Getting data stored in localStorage
let getTimeSlotData = () => {
  let data = JSON.parse(localStorage.getItem("timeSlot"));
  return data;
};

// UserReducer function for time-slot selection
let timeSlotReducer = (
  state = getTimeSlotData() ? getTimeSlotData().timeSlot : "",
  action
) => {
  // Handels time-slot data action
  switch (action.type) {
    case "timeSlot":
      return (state = action.payload);
    default:
      return state;
  }
};
// Exporting 'timeSlotReducer' to use in rootReducer
export default timeSlotReducer;
