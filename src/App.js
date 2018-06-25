import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import AppBar from "./components/AppBar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";

import Login from "./views/Login";
import Posts from "./views/Posts";
import PostById from "./views/PostById";
import CreatePost from "./views/CreatePost";

import primary from "@material-ui/core/colors/indigo";
import secondary from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Fragment>
              <AppBar />
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/posts" exact component={Posts} />
                <Route path="/posts/create" component={CreatePost} />

                <Route path="/posts/:id" component={PostById} />
              </Switch>
            </Fragment>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
