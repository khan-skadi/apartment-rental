import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Users from "./pages/Users";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import Apartments from "./pages/Apartments";
import AddApartment from "./pages/Apartments/AddApartment";
import EditApartment from "./pages/Apartments/EditApartment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const Main = (props) => {
  const { me } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {!me && <Route exact path="/signup" component={Signup}></Route>}
        {!me && <Route exact path="/login" component={Login}></Route>}
        {me && <Route exact path="/main" component={Rent}></Route>}
        {me && <Route exact path="/profile" component={Profile}></Route>}
        {me && me.role === "admin" && (
          <Route exact path="/users" component={Users}></Route>
        )}
        {me && me.role === "admin" && (
          <Route exact path="/user/add" component={AddUser}></Route>
        )}
        {me && me.role === "admin" && (
          <Route exact path="/user/:id" component={EditUser}></Route>
        )}
        {me && (me.role === "admin" || me.role === "realtor") && (
          <Route exact path="/apartments" component={Apartments}></Route>
        )}
        {me && (me.role === "admin" || me.role === "realtor") && (
          <Route exact path="/apartment/add" component={AddApartment}></Route>
        )}
        {me && (me.role === "admin" || me.role === "realtor") && (
          <Route exact path="/apartment/:id" component={EditApartment}></Route>
        )}
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default Main;
