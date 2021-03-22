import React from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter as Router } from "react-router-dom";
import { ModalContainer } from "reoverlay";
import AppProvider from "./hooks/index";

import Routes from "./routes";

import "./styles/main.css";

const App: React.FC = () => {
  const stripePromise = loadStripe("pk_test_Ni1yGhoLnPDkrOmZRPdu9Dye00eW7psDa6");

  return (
    <Elements stripe={stripePromise}>
    <Router>
      
      <AppProvider>
        <Routes />
        <ModalContainer />
      </AppProvider>
      
    </Router>
    </Elements>
  );
};

export default App;
