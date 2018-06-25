import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { postPost } from "../actions/posts";
import isLoggedIn from "../components/isLoggedIn";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 750,
    margin: [[0, "auto"]],
    marginBottom: 40,
  },
  input: {
    margin: [[16, 0]]
  },
};

class CreatePost extends React.Component {
  state = {
    title: "",
    file: null,
    created: false,
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  onFileChange = (e) => {
    this.setState({
      file: e.target.files[0]
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", this.state.title);

    formData.append("image", this.state.file);

    await this.props.dispatch(postPost(formData));
   
    this.setState({
      created: true,
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.created) {
      return (
        <Redirect to="/posts" />
      );
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="display1">Create post</Typography>

          <form onSubmit={this.onSubmit}>
            <TextField
              label="File"
              type="file"
              fullWidth
              onChange={this.onFileChange}
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.input}
            />

            <TextField
              label="Title"
              fullWidth
              onChange={this.onTitleChange}
              className={classes.input}
            />

            <Button type="submit" color="primary" variant="contained" margin="normal">Send</Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(isLoggedIn(withStyles(styles)(CreatePost)));