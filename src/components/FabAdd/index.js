import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    right: 64,
    bottom: 64
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <Button
      variant="fab"
      color="primary"
      aria-label="add"
      className={classes.button}
      component={Link}
      to="/posts/create"
    >
      <Icon>add</Icon>
    </Button>
  );
}

export default withStyles(styles)(FloatingActionButtons);
