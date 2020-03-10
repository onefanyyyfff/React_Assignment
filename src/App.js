import React from 'react';
import './App.css';
import Home from "./component/Home";
import Weather from "./component/Weather";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";


export default function App() {
  return (
      <Router>
        <Home />
        <Link to="/show">Search Weather</Link>
        <Switch>
          <Route exact path="/show">
            <Weather />
          </Route>
        </Switch>
      </Router>
  );
}
