import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

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

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    // const isLoggedIn = ;

    function LandingOrRedirectToHome({ authed, ...rest }) {
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

    // function PrivateRoute({ component: Component, authed, ...rest }) {
    //     console.log("are you authed?", authed);
    //     return (
    //         <Route
    //             {...rest}
    //             render={(props) =>
    //                 authed === true ? (
    //                     <Component {...props} />
    //                 ) : (
    //                     <Redirect
    //                         to={{
    //                             pathname: "/login",
    //                             state: { from: props.location },
    //                         }}
    //                     />
    //                 )
    //             }
    //         />
    //     );
    // }

    function PrivateRoute({ component: Component, roles, ...rest }) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    // evaluate whether user is authed when component is created, NOT when App is rendered.
                    const user = userValue() !== null;
                    if (!user) {
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
                <main
                    id="main"
                    className="d-flex justify-content-center background-blue"
                >
                    <Switch>
                        <LandingOrRedirectToHome exact path="/" />
                        <Route path="/login">
                            <LogIn />
                        </Route>
                        <Route path="/landing">
                            <Redirect to="/" />
                        </Route>
                        <PrivateRoute
                            exact
                            path="/home"
                            // authed={isLoggedIn}
                            component={Home}
                        />
                        <PrivateRoute
                            path="/notifications"
                            // authed={isLoggedIn}
                            component={Notifications}
                        />
                        <PrivateRoute
                            path="/messages"
                            // authed={isLoggedIn}

                            component={Messages}
                        />
                        {/* <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} /> */}
                        <Route path="/explore">
                            <Search />
                        </Route>
                        <Route path="/post">
                            <Post />
                        </Route>
                        {/* <Route path="/landing">
                            <Landing />
                        </Route> */}
                        <Route path="/massive">
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

// TODO: Make every Massiv show view count. Make Amplify notifications show view count: "this is how much the guarantee went up because of the user's Amp".
// TODO (important): make a field for user to put in a password on the sign up form. lol. put it below "username"

// TODO: make Edit Profile modal.

// TODO: Set timeout before redirecting to dashboard after signUp so user can see "Account created successfully!" msg flash

// *** *** SIGN UP AUTH STUFF *** ***

// TODO: connect sign up process  to a database so code can store signed up users in db, send verification code, and
// ... receive verification code from email, complete signUp process & finally redirect to /home w/ the newly made account

// TODO: Make sure all the behaviors from Account Service on this page are in the app. CTRL + F "Account Service"
// https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
// The following are missing: (1) forgot password initiation & post req
// (2) validateResetToken, (3) resetPassword
// also I dunno what getAll, create, update, delete are good for. (getById has an obvious function)

// *** *** *** ***
// *** MEDIUM ***
// *** *** *** ***

// FIXME: when I log out while on /home, (a) app.js:45 says "authed" is true. (b) I am not redirected to "/"
// FIXME: when I manually navigate from /Crono to /Marle, the page reload is slow relative to Twitter's *instant* nav
// -- I should not see any white empty page while navigating
// FIXME: Ok so when manually navigating between /rolypolyistaken & /rulesofthetrade on Twtr, there is a Twitter spinner
// ... to hide the loading. coopy that with PM

// FIXME: feed takes way too long to load. It should be nigh instant.

// TODO: spin up the app in browser, look for error msgs as you browse the site. remove as many as possible

// TODO: display pages differently based on whether the user is logged in or not. (this is a pre-beta test thing)
// todo: make PostMassiv-Satellite.png into a white version for the dark mode skin

// TODO: make the rightbar's "Follow" buttons right edges align vertically.

// *** SETTINGS ***
// TODO: goto twitter and grab their essential settings for PM's settings page. Style the settings page.
// TODO: Record in the db every time a user tries to switch to light mode.

// *** *** ***
// *** LOW ***
// *** *** ***
// TODO: add a PostMassiv loading screen, like what Twitter has, while Feed/Notification/Messages etc loads.
// TODO: Present Explore differently based on whether user is logged in or not.
// TODO: Make a Bookmarks page.
// TODO: Allow user to bookmark a massive.

// *** *** *** ***
// TODO IMPORTANT but LATER: Detect user actions. Mouse clicks, how long they look at a Massiv, etc. Record these in a database. (Do what Twtr does)
// *** *** *** ***

// TODO-MUCH-LATER: make the feed infinite scroll (this is a "much later" task)
// TODO-LATER: make the home page save your position in the infinite scroll when you leave & come back to the page

// TODO: make light mode, figure out how to convert from dark to light via account settings.

// TAGLINE: PostMassive: Get your word out.
// TAGLINE: PostMassive: Say it loud.

// TODO-RELEASE: before the site is put up for public use, replace all icons with paid icons8 icons.
// TODO-release: cry because you have to set up postmassive on digitalocean
