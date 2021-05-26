import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import ShowAllArticles from "./components/ShowAllArticles";
import { SignIn } from "./components/pages/signIn";
import { SignUp } from "./components/pages/signUp";
import { Articles } from "./components/pages/Artitles";
import { SecureRoute } from "./auth/secureRoute";
import { AuthComsumer } from "./auth/AuthProvider";
import { Add } from './components/pages/Add';
import { Collection } from './components/pages/Collection';
import { useAuth } from './auth/auth';
import axios from 'axios';

function App() {
  const { signOut } = useAuth();
  const handleSignOut = async (setLogin) => {
    await signOut();
    setLogin(false);
  }
  return (
    <AuthComsumer>
      {(value) => {
        return (
          <Router>
            <div className="container-fluid">
              <header className="col-12">
                <Link to="/" style={{ color: "#333", textDecoration: "none" }}>
                  <h1>SEEDS Database</h1>
                </Link>
                <div className="operations">
                  {!value.login && (
                    <>
                      <Link to="/signin">
                        <button type="button" className="btn btn-link">
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button type="button" className="btn btn-link">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                  {value.login &&
                    <button onClick={() => handleSignOut(value.setLogin)} type="button" className="btn btn-link">Sign Out</button>
                  }
                </div>
              </header>
                  
              <SecureRoute
                exact
                path="/"
                login={value.login}
                component={Articles}
              ></SecureRoute>
              <SecureRoute exact path="/add" login={value.login} component={Add}></SecureRoute>
              <SecureRoute exact path="/collection" login={value.login} component={Collection}></SecureRoute>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route
                exact
                path="/ShowAllArticles"
                component={ShowAllArticles}
              />{" "}
                   
            </div>
          </Router>
        );
      }}
    </AuthComsumer>
  );
}

export default App;
