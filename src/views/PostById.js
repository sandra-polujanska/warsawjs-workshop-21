import React from "react";
import { connect } from "react-redux";
import { commentsFetch } from "../action/comments/index";

class PostById extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(commentsFetch(id));
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect()(PostById)
