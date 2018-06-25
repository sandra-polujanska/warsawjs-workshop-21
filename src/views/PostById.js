import React from "react";
import { connect } from "react-redux";
import isLoggedIn from "../components/isLoggedIn";
import { fetchComments, postComment } from "../actions/comments/index";
import { Redirect } from "react-router-dom";
import PostCard from "../components/PostCard";

const mapStateToProps = ({ user, posts, comments }, { match }) => ({
  post: posts.posts.find(({id}) => id === match.params.id),
  comments: comments.comments[match.params.id]
});

class PostById extends React.Component {
  state = {
    userCommentPosition: {},
    userCommentBody: "",
  }

  timer = null;

  componentDidMount() {
    this.fetchComments();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  
  fetchComments = () => {
    this.props.dispatch(fetchComments(this.props.match.params.id));

    // this.timer = setTimeout(this.fetchComments, 2000);
  }

  onImageClick = (e) => {
    const el = e.target;

    const { top, left } = el.getBoundingClientRect();

    const position = {
      x: e.pageX - window.scrollX - left,
      y: e.pageY - window.scrollY - top,
    };

    console.log(position);

    this.setState({
      userCommentPosition: position
    });
  }

  onUserCommentBodyChange = (e) => {
    this.setState({
      userCommentBody: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userCommentPosition, userCommentBody } = this.state;

    if ( !("x" in userCommentPosition) || !("y" in userCommentPosition) || userCommentBody === "" ){
      return;
    }

    this.props.dispatch(postComment(
      this.props.match.params.id,
      {
        position: userCommentPosition,
        body: userCommentBody,
      }
    ));

    this.setState({
      userCommentPosition: {},
      userCommentBody: ""
    });
  }

  render() {
    if (!this.props.post) {
      return (
        <Redirect to="/posts" />
      );
    }

    const { post, comments } = this.props;
    const { userCommentPosition, userCommentBody } = this.state;

    return (
      <PostCard
        comment
        post={post}
        comments={comments}
        onSubmit={this.onSubmit}
        onImageClick={this.onImageClick}
        userCommentPosition={userCommentPosition}
        userCommentBody={userCommentBody}
        onBodyChange={this.onUserCommentBodyChange}
      />
    );
  }
}

export default connect(mapStateToProps)(isLoggedIn(PostById));