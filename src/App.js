import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from "./components/Navbar";
import Movies from "./components/movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/admin/LoginForm";
import {Switch, Route, Redirect} from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <main role="main" className="container">
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/movies/:id" component={MovieForm} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        </React.Fragment>
    );
}

export default App;
