import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../actions/user";

const mapStateToProps = ({ user }) => ({
  fetching: user.fetching,
  username: user.username
});

const styles = {
  root: {
    width: 750,
    margin: [[0, "auto"]]
  }
};

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let error = false;

    if (!username) {
      this.setState({
        usernameError: true,
      });
      
      error = true;
    } else {
      this.setState({
        usernameError: false,
      });
    }
    
    if (!password) {
      this.setState({
        passwordError: true,
      });

      error = true;
    } else {
      this.setState({
        passwordError: false,
      });
    }

    if (error) {
      return;
    }

    this.props.dispatch(login({username, password}));
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    if (this.props.username) {
      return (
        <Redirect to="/posts/" />
      );
    }

    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className={classes.root}>
          <h1>Login</h1>

          <TextField
            label="Username"
            type="text"
            fullWidth
            onChange={this.onUsernameChange}
            margin="normal"
            error={this.state.usernameError !== false}
            helperText={this.state.usernameError ? "You must specify username" : " "}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={this.onPasswordChange}
            error={this.state.passwordError !== false}
            helperText={this.state.passwordError ? "You must specify password" : " "}
          />

          <br/>
          <br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
          >Log in</Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login));