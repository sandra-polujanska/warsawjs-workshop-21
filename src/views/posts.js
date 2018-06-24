import React from 'react';
import {connect} from 'react-redux';
import { postsFetch } from "../action/posts/index.js";
import { Link } from "react-router-dom"

const mapStateProps = ({posts}) => ({
  posts: posts.posts,
  fetching: posts.fetching,
});

class Posts extends React.Component {
  componentDidMount() {
    this.props.dispatch(postsFetch());
  }
  render(){
    const posts = this.props.posts.map(post => (
      <Link to={`/posts/${post.id}`} key={`posts-${post.id}`}>
        <h2>{post.title}</h2>
        <h3>{post.owner}</h3>
        <img src={post.image} alt="" />
      </Link>

    ));
    return (
      <div>
        <h1>Posts</h1>
        { posts }
      </div>
    )
  }
}

export default connect(mapStateProps) (Posts);
