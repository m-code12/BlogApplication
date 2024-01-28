import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";

/*ReactDOM.render function takes two arguments, the root component which
is need to be rendered in DOM and the HTML element where the react code 
needed to be injected.
So the React Code from the App.js is injected inside the div tag (with id root) in the DOM */
export default ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      {/* root component */}
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
