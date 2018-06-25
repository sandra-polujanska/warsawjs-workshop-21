import React from "react";
import { connect } from "react-redux";

import isLoggedIn from "../components/isLoggedIn";
import { fetchPosts } from "../actions/posts/";
import PostCard from "../components/PostCard";
import FabAdd from "../components/FabAdd";

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  fetching: posts.fetching,
});

class Posts extends React.Component {
  timer = null;

  shouldComponentUpdate(nextProps) {
    if(
      this.props.posts.length === nextProps.posts.length &&
      this.props.posts.every(({ id }, i) => id === nextProps.posts[i].id)
    ) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  
  fetchPosts = async () => {
    await this.props.dispatch(fetchPosts());

    this.timer = setTimeout(this.fetchPosts, 2000);
  }

  render() {
    const posts = this.props.posts.map( post => (
      <PostCard key={`post-${post.id}`} post={post} />
    ) );
    
    const shouldDisplayLoading = this.props.posts.length <= 0 && this.props.fetching;

    return (
      <React.Fragment>
        <div id="posts">
          {posts}
        </div>

        <FabAdd />
        {shouldDisplayLoading ? "Loading..." : ""}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(isLoggedIn(Posts));