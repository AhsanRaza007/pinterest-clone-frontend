import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreatePin from "./Components/CreatePin/CreatePin";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import MyPins from "./Components/MyPins/MyPins";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/NotFound/NotFound";
import PinView from "./Components/PinView/PinView";

import UserContext, { ErrorContext, SuccessContext } from './Components/Context';
import { ErrorAlert, SuccessAlert } from './Components/Styled-Utilities/Styles'
import Signup from "./Components/Signup/Signup";
function App() {

  // const server_devurl = 'http://localhost:3001'
  let [user, setUser] = useState(null);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);
  let [timeToChangeUser, setTimeToChangeUser] = useState(true);


  useEffect(() => {
    let fetchUser = async () => {
      console.log('in use effect')
      try {
        let res = await axios.get((process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_DEV_BACKEND_URL) + '/auth', {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    }
    fetchUser();
  }, [timeToChangeUser]);

  let logout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    setUser(null);
  }


  let handleError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 2500)
  }

  let handleSuccess = (successMessage) => {
    setSuccess(successMessage);
    setTimeout(() => {
      setSuccess(null);
    }, 2500)
  }

  
  return (

    <div className="App">
      <UserContext.Provider value={{ user: user, logout: logout, setUser: setUser }}>
        <ErrorContext.Provider value={{ handleError: handleError }}>
          <SuccessContext.Provider value={{ handleSuccess: handleSuccess }}>
            <BrowserRouter>
              <Navbar />
              <ErrorAlert open={error ? true : false}>{error}</ErrorAlert>
              <SuccessAlert open={success ? true : false}>{success}</SuccessAlert>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/login'>
                  <Login setTimeToChangeUser={setTimeToChangeUser}/>
                </Route>
                <Route exact path='/Pins'>
                  <MyPins />
                </Route>
                <Route exact path='/CreatePin'>
                  <CreatePin />
                </Route>
                <Route exact path='/pin/:pinId'>
                  <PinView />
                </Route>
                <Route exact path='/signup'>
                  <Signup />
                </Route>
                <Route to='*'>
                  <NotFound />
                </Route>
              </Switch>
            </BrowserRouter>
          </SuccessContext.Provider>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>

  );
}

export default App;
