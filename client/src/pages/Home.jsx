import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectMovies from "../components/selectMovies";
import SelectTimeSlot from "../components/SelectTimeSlot";
import SelectSeat from "../components/SelectSeat";
import LastBooking from "../components/LastBooking";
import { Watch } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./css/home.css";
// Home component
function Home() {
  //State for loading animation after clicking Book Now button
  let [loading, setLoading] = useState(false);

  // Selecting the user booking information from the Redux store.
  // This selector retrieves the movie data from the store's state.
  let movieData = useSelector((state) => state.movie);
  // This selector retrieves the time-slot data from the store's state.
  let timeslotData = useSelector((state) => state.timeSlot);
  // This selector retrieves the seats data from the store's state.
  let seatsData = useSelector((state) => state.seats);

  // Create an instance of the 'dispatch' function to update the user's booking details.
  let dispatch = useDispatch();

  // This state is for changing colors of toast as per the requirements
  let [bookingAlret, setBookingAlret] = useState("");

  //Handel Booking function
  let handelBooking = async (e) => {
    // This function will call when user click on Book Now button to book movie

    // Using object destructuring to destructur seasts object
    let { A1, A2, A3, A4, D1, D2 } = seatsData;

    // Handling errors if user don not click on any option or wrong option

    // If user didn't select any movie then user will get error in the form of toast to select movie
    if (!movieData) {
      // Adding color to state to display toast
      setBookingAlret("red");
      return toast("Please Select a movie");
    }
    // If user didn't select any time-slot then user will get error in the form of toast to select time-slot
    if (!timeslotData) {
      // Adding color to state to display toast
      setBookingAlret("red");
      return toast("Please Select a time slot");
    }
    // If user didn't select any seat then user will get error in the form of toast to select atleast one seat
    if (A1 === 0 && A2 === 0 && A3 === 0 && A4 === 0 && D1 === 0 && D2 === 0) {
      // Adding color to state to display toast
      setBookingAlret("red");
      return toast("Please Select Atleast one seat");
    }
    // If user select a seat which is less than zero then user will get error in the form of toast to select a valid seats
    if (A1 < 0 || A2 < 0 || A3 < 0 || A4 < 0 || D1 < 0 || D2 < 0) {
      // Adding color to state to display toast
      setBookingAlret("red");
      return toast("Invalid Seat Entered, Please re-Submit");
    }
    // Removing color from the state of setBookingAlret
    setBookingAlret("");
    // Starting loader animation after all check performed to get user better experience while booking movie and waiting to api response
    setLoading(true);
    // Handling Error using try catch
    try {
      // This api uses post method to send movie booking data to backend and to book movie and return booking details
      let bookingResponse = await axios.post(`${BASE_URL}/api/booking`, {
        movie: movieData,
        slot: timeslotData,
        seats: seatsData,
      });

      // If booking was successful  without any error then api will return status code 200 with booking data
      if (bookingResponse.status === 200) {
        // Setting color for the toast
        setBookingAlret("#4c1");

        // Dispatching an action to update the user's lastbooking details in the store after successfull booking.
        dispatch({ type: "lastBooking", payload: bookingResponse.data });
        // Dispatching an action to update the movie state in the store after successfull booking.
        dispatch({ type: "movie", payload: "" });
        // Dispatching an action to update the timeslot state in the store after successfull booking.
        dispatch({ type: "timeSlot", payload: "" });
        // Dispatching an action to update the seats state in the store after successfull booking.
        dispatch({
          type: "seats",
          payload: {
            A1: 0,
            A2: 0,
            A3: 0,
            A4: 0,
            D1: 0,
            D2: 0,
          },
        });

        // Clear the localStorage data after the form submission
        localStorage.clear();
        // Seting loading animation state to false to stop loading after getting response from api
        setLoading(false);
        //Displaying toast after successful booking of movie
        return toast("Booking successful!");
      }
    } catch (error) {
      // Seting loading animation state to false to stop loading after getting response from api
      setLoading(false);
      // Settging toast color to red because of getting error
      setBookingAlret("red");
      // Displaying toast after getting  error
      toast("something went wrong");
    }
  };

  useEffect(() => {
    // After every reload this api will be called to get last movie booking data
    let getLastBookingApi = async () => {
      // This api uses the get method to get last movie booking data
      // Using axios to make get request from the api
      let { data } = await axios.get(`${BASE_URL}/api/booking`);
      //  Dispatching an action to update the lastBooking state in the store to display last booking details got by the api
      dispatch({ type: "lastBooking", payload: data });
    };
    // Calling getLastBookingApi to get lastbooking details
    getLastBookingApi();
  }, []);

  // JSX structure of the 'Home' component
  return (
    <div className="Home">
      {/* Heading and name of app */}
      <h1 className="appName">Book That Show!!</h1>
      {/* All Component div */}
      <div className="allComponents">
        {/* Booking form */}

        <div className="leftHalf">
          {/* Select Movie Component */}
          <SelectMovies />
          {/* Select Timeslot Component */}
          <SelectTimeSlot />
          {/* Select Seat Component */}
          <SelectSeat />
          {/* Booking button */}
          <div className="book-button">
            <button onClick={handelBooking}>Book Now</button>
          </div>
        </div>

        <div className="rightHalf">
          {/* Display last booking details */}
          <LastBooking />
        </div>
      </div>
      {/*Loading animation when user click on Book Now button until booking confirms any reponse come from api  */}
      {loading ? (
        <div className="loader">
          <Watch
            height="80"
            width="80"
            radius="48"
            color="black"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
      {/* Toast container to give alerts to the user based on user action */}
      <ToastContainer
        toastStyle={{
          backgroundColor: bookingAlret,
          color: "white",
          fontSize: ".9rem",
        }}
      />
    </div>
  );
}
// Exporting 'Home' Component to use in other modules
export default Home;
