import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Home from "./Home";

import Login from "./Login";
import NavbarComponent from "./Navbar.component";
import Register from "./Register";

const Router = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <div>
          <NavbarComponent />
          <Component {...routeProps} />
        </div>
      )}
    ></Route>
  );
};

export const AppRouting = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Router exact path="/" component={Home} />
        <Router exact path="/home" component={Home} />
        <Router exact path="/login" component={Login} />
        <Router exact path="/register" component={Register} />
        <Router exact path="/adminDashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};
