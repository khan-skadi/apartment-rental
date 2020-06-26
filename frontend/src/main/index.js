import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Main = (props) => {
  const { me } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/main" component={Rent}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </>
  );
};

export default Main;
