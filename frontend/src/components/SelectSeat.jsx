import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seats } from "./data";
function SelectSeat() {
  // Selecting the user booking information from the Redux store.
  // This selector retrieves the seats data from the store's state to update after reload or after successful booking of movie.
  let state = useSelector((state) => state?.seats);
  //State to save user selection of seats
  let [allSeats, setAllSeats] = useState({
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  });

  //State to save user selection of seat type
  let [selectSeatType, setSelectSeatType] = useState("");

  // Create an instance of the 'dispatch' function to update the seats
  let dispatch = useDispatch();

  // Handel seats change function to select seats and send it to store
  let handelSeatsChange = (event) => {
    // Destructuring event object to get name and value from input
    let { name, value } = event.target;
    // Stroing selected seats
    setAllSeats({ ...allSeats, [name]: value });
  };

  useEffect(() => {
    // Dispatching an action to update the seats state in the store.
    dispatch({ type: "seats", payload: allSeats });
  }, [dispatch, allSeats]);

  useEffect(() => {
    // Useing useEffect to update the value after reload if user has selected seats which is stored in localStorage
    setTimeout(() => {
      setAllSeats(state);
    }, 1);
  }, []);

  useEffect(() => {
    // Useing one more useEffect to update the value after successful booking of movie
    setAllSeats(state);
    // Seting state empty after successful booking of movie
    setSelectSeatType("");
  }, [state]);

  // JSX structure of the 'SelectSetas' component
  return (
    // Seats container
    <div className="seat-row">
      {/* Select Setas heading */}
      <h3>Select the seats</h3>
      {/* All seats input div */}
      <div className="allSeats">
        {/* Seat selecting form */}
        <form>
          {/* Generate a list of available seats as div */}
          {seats.map((seat) => {
            // div to select seats by the user
            // Afafter selecting  seats by the  user to this div  the class will change to seat-column-selected
            return (
              <div
                className={`seat-column ${
                  selectSeatType === seat ? "seat-column-selected" : ""
                }`}
                key={seat}
                onClick={(e) => setSelectSeatType(seat)}
              >
                {/* Heading for the input */}
                <h5>Type {seat}</h5>
                {/* input to take selection of seats by the user */}
                <input
                  type="Number"
                  id={`seat-${seat}`}
                  name={seat}
                  value={allSeats[seat]}
                  onChange={handelSeatsChange}
                />
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}
// Exporting 'SelectSeat' Component to use in other modules
export default SelectSeat;
