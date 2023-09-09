import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux"; // Imported  the Redux Provider
import store from "./redux/store"; // Imported Redux store configuration

const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering app with Redux store access provided
root.render(
  <>
    <Provider store={store}>
      <App />
      {/*Root React component */}
    </Provider>
  </>
);

// The Provider component wraps app and gives it access to the Redux store.
// This allows us to connect our components to the store and dispatch actions.
