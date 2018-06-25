import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 32
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  },
  flex: {
    flex: 1,
  },
};

const mapStateToProps = ({user}) => ({
  username: user.username
});

const SimpleAppBar = ({ classes, username }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to="/posts/" className={classes.link}>Zeppelin</Link>
          </Typography>
          <Button color="inherit">{username}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStateToProps)(withStyles(styles)(SimpleAppBar));