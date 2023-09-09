import React from "react";
import { useSelector } from "react-redux";
import { seats } from "./data";
function LastBooking() {
  // Selecting the user booking information from the Redux store.
  // This selector retrieves the last booking details data from the store's state to update after reload or after successful booking of movie.
  let lastBookingDetails = useSelector((state) => state.lastBooking);

  // JSX structure of the 'LastBooking' component
  return (
    // LastBooking container
    <div className="last-order ">
      {/* LastBooking details heading */}
      <h3>Last Booking Details:</h3>
      {/* Last Booking details Data */}

      {lastBookingDetails?.message || lastBookingDetails === null ? (
        //  If api returns message no previous booking found or api is not able to connect to the server then it will show No previous booking found
        <p>no previous booking found</p>
      ) : (
        // Last booking details container
        <div>
          {/* Seats heading */}
          <h5>seats:</h5>
          {/* Last booking seats details */}
          <div className="lastBookingSeats">
            {/* Generating last booking seats details */}
            {seats.map((seat) => {
              return (
                // Displaying all last booking seats details
                <p key={seat ? seat : "no"}>
                  <span>{seat}:</span>
                  {lastBookingDetails?.seats[seat]}
                </p>
              );
            })}
          </div>
          {/* Displaying last booking slot timeing */}
          <p>
            <span>slot:</span> {lastBookingDetails?.slot}
          </p>
          {/* Displaying last booking Movie name */}
          <p>
            <span>movie:</span> {lastBookingDetails?.movie}
          </p>
        </div>
      )}
    </div>
  );
}
// Exporting 'LastBooking' Component to use in other modules
export default LastBooking;
