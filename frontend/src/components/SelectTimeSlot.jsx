import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { slots } from "./data";
// SelectTimeSlot component
function SelectTimeSlot() {
  //State to save user selection of time-slot
  let [selectTimeSlot, setSelectTimeSlot] = useState();

  // Selecting the user booking information from the Redux store.
  // This selector retrieves the time-slot data from the store's state to update after reload or after successful booking of movie.
  let state = useSelector((state) => state.timeSlot);

  // Create an instance of the 'dispatch' function to update the time-slot
  let dispatch = useDispatch();

  // Handel time-slot function to select time slot and send it to store
  let handelTimeSlotClick = (slot) => {
    // Stroing selected time-slot
    setSelectTimeSlot(slot);

    // Dispatching an action to update the time-slot state in the store.
    dispatch({ type: "timeSlot", payload: slot });
    // Saving time-slot selection of user to localstorage
    localStorage.setItem("timeSlot", JSON.stringify({ timeSlot: slot }));
  };
  useEffect(() => {
    // Useing useEffect to update the value after reload if user has selected time-slot which is stored in localStorage
    setSelectTimeSlot(state);
  }, [state]);
  // JSX structure of the 'SelectTimeSlot' component
  return (
    // Time-slot container
    <div className="slot-row">
      {/* Select time slot heading */}
      <h3>Select a time slot</h3>
      {/* All time-slot buttons div */}
      <div className="allButtons">
        {/* Generate a list of available time slots as button */}
        {slots.map((slot) => {
          return (
            // Button to select time slot by the user
            // After click of user to this button the class will change to slot-column-selected
            <button
              className={`slot-column ${
                selectTimeSlot === slot ? "slot-column-selected" : ""
              }`}
              key={slot}
              onClick={(e) => {
                // Everytime user Click on button this function will br called
                handelTimeSlotClick(slot);
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// Exporting 'SelectTimeSlot' Component to use in other modules
export default SelectTimeSlot;
