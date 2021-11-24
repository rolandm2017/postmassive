import React from "react";

import { useLocation, Switch, Route, Redirect } from "react-router-dom";

import { ProvideAuth, userValue } from "./auth/use-auth";

import LogIn from "./pages/login/LogIn";
import Home from "./pages/home/Home";
import Notifications from "./pages/notifications/Notifications";
import Search from "./pages/search/Search";
import Messages from "./pages/messages/Messages";
import Post from "./pages/post/Post";
import Profile from "./pages/profile/Profile";
import Landing from "./pages/public/Landing";
import Massive from "./pages/massive/Massive";
import Followers from "./pages/followers/Followers";
import ToDo from "./pages/_pageHelper/ToDo";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    // const isLoggedIn = ;
    const currentLocation = useLocation().pathname;
    // console.log("currentLocation:", currentLocation);

    function LandingOrRedirectToHome({ authed, ...rest }) {
        console.log("773", authed);
        return (
            <Route
                {...rest}
                render={(props) =>
                    authed === true ? (
                        <Redirect
                            to={{
                                pathname: "/home",
                                state: { from: props.location },
                            }}
                        />
                    ) : (
                        <Landing />
                    )
                }
            />
        );
    }

    function PrivateRoute({ component: Component, roles, ...rest }) {
        // TODO: Make sure userValue() is exposed inside of PrivateRoutes
        return (
            <Route
                {...rest}
                render={(props) => {
                    // evaluate whether user is authed when component is created, NOT when App is rendered.
                    const userIsLoggedIn =
                        userValue() !== null && userValue() !== undefined;
                    // console.log("status", 74, userIsLoggedIn, userValue());
                    if (!userIsLoggedIn) {
                        // not logged in so redirect to login page with the return url
                        return (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location },
                                }}
                            />
                        );
                    }

                    const user = userIsLoggedIn;

                    // check if route is restricted by role
                    if (roles && roles.indexOf(user.role) === -1) {
                        // role not authorized so redirect to home page
                        return <Redirect to={{ pathname: "/" }} />;
                    }

                    // authorized so return component
                    return <Component {...props} />;
                }}
            />
        );
    }

    return (
        <div className="App">
            <ProvideAuth>
                {/* todo: test if I can just remove ProvideAuth */}
                <main
                    id="main"
                    className={
                        currentLocation.includes("/login")
                            ? "d-flex justify-content-center background-blue"
                            : "d-flex justify-content-center"
                    }
                >
                    <Switch>
                        <LandingOrRedirectToHome
                            authed={
                                userValue() !== null &&
                                userValue() !== undefined
                            }
                            exact
                            path="/"
                        />
                        <Route exact path="/todo">
                            <ToDo />
                        </Route>
                        <Route path="/login">
                            <LogIn />
                        </Route>
                        <Route path="/landing">
                            <Redirect to="/" />
                        </Route>
                        <PrivateRoute exact path="/home" component={Home} />
                        <PrivateRoute
                            path="/notifications"
                            component={Notifications}
                        />
                        <PrivateRoute path="/messages" component={Messages} />
                        <PrivateRoute path="/:username/post" component={Post} />
                        {/* <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} /> */}
                        <Route path="/explore">
                            <Search />
                        </Route>
                        <Route path="/massive/:id">
                            <Massive />
                        </Route>
                        <Route exact path="/:username">
                            <Profile />
                        </Route>
                        <Route path="/:username/followers">
                            <Followers />
                        </Route>
                        <Route path="/:username/following">
                            <Followers />
                        </Route>
                        <Route path="/:username/suggested">
                            <Followers />
                        </Route>
                    </Switch>
                </main>
            </ProvideAuth>
        </div>
    );
}

export default App;

// *** *** ***
// *** HIGH ***
// *** *** ***

// TODO: make Edit Profile modal.

// TODO: Make sure all the behaviors from Account Service on this page are in the app. CTRL + F "Account Service"
// https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password

// TODO-MUCH-LATER: make the feed infinite scroll (this is a "much later" task)

// TAGLINE: PostMassive: Get your word out.
// TAGLINE: PostMassive: Say it loud.
