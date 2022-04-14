import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import React from 'react'
import Loader from "./Screens/loader"
import { Login, Register } from "./Screens/index";
import Logged from'./user';
import AuthService from "./services/auth.service"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      isloggedIn: false,
      datafetched: false,
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isloggedIn: user !== undefined ? true : false,
        datafetched: true,
      });
    }
    if (user === null) {
      this.setState({
        datafetched: true,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {

    const { isloggedIn, datafetched } = this.state;
    console.log(isloggedIn, !datafetched);
    if (!datafetched) {
      return (
        <Loader />
      )
    } else {
      return (
        <div>
          <Router>
            <div>

              <Switch>
                <Route path="/login">
                  <Login />
                </Route>

                <Route exact path="/">
                  <Register />
                </Route>

                <Route exact path="/logged">
                  <Logged />
                </Route>

              </Switch>
            </div>
          </Router>
        </div>
      )
    }
  }

}
