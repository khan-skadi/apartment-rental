import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Users from "./pages/Users";
import Apartments from "./pages/Apartments";
import AddApartment from "./pages/Apartments/AddApartment";
import EditApartment from "./pages/Apartments/EditApartment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Main = (props) => {
  const { me } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {!me && <Route exact path="/signup" component={Signup}></Route>}
        {!me && <Route exact path="/login" component={Login}></Route>}
        {me && <Route exact path="/main" component={Rent}></Route>}
        {me && <Route exact path="/users" component={Users}></Route>}
        {me && <Route exact path="/apartments" component={Apartments}></Route>}
        {me && (
          <Route exact path="/apartment/add" component={AddApartment}></Route>
        )}
        {me && (
          <Route exact path="/apartment/:id" component={EditApartment}></Route>
        )}
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default Main;
