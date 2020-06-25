import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { connect } from "react-redux";

const Main = (props) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.auth);
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Main;
