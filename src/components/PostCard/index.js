import React from "react";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  card: {
    maxWidth: 750,
    marginBottom: 40,
  },
  linkCard: {
    transition: "box-shadow .1s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[8],
    }
  },
  outer: {
    margin: "0 auto",
    maxWidth: 750,
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },
  img: {
    height: "100%"
  },
  imageContainer: {
    marginLeft: "50%",
    marginTop: 32,
    position: "relative",
    height: 750,
    display: "inline-block",
    transform: "translateX(-50%)"
  },
  imageComment: {
    position: "absolute",
    transform: "translate(-20px, -20px)",
  },
  imageCommentHovered: {
    zIndex: 2
  },
  contentText: {
    display: "none",
    padding: [[4, 9]],
    marginTop: 8,
    maxWidth: 250,
  },
  contentTextCaption: {
    whiteSpace: "nowrap"
  },
  contentTextVisible: {
    display: "block",
  }
});

const commentStyles = {
  input: {
    margin: [[16, 0]]
  },
};

const formatDate = date => `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const PostComment = withStyles(commentStyles)(({onSubmit, onBodyChange, classes, userCommentBody}) => (
  <form onSubmit={onSubmit}>
    <TextField
      label="Your comment"
      className={classes.input}
      fullWidth
      onChange={onBodyChange}
      value={userCommentBody}
      multiline
    />
    <Button variant="contained" color="primary" type="submit">
      Comment
    </Button>
  </form>
));

class OuterComponent extends React.PureComponent {
  render() {
    const {children, comment, classes, post} = this.props;

    return comment ?
    (<div className={classes.outer}>{children}</div>):
    (<Link className={classes.outer} to={`/posts/${post.id}`}>{children}</Link>);
  }
}

class Post extends React.Component {
  state = {
    hovered: null,
  }

  onMouseEnter = id => () => {
    this.setState({
      hovered: id
    });
  }
  
  onMouseLeave = () => {
    this.setState({
      hovered: null
    });
  }

  render() {
    const { classes, post, comment = false, comments=[], onImageClick, userCommentPosition: position, userCommentBody, onBodyChange, onSubmit } = this.props;
    
    const commentsButtonList = comment ? Object.values(comments).map((value) => (
      (
        <div
          key={`comment-${value.id}`}
          className={classnames(
            classes.imageComment,
            {
              [classes.imageCommentHovered]: this.state.hovered === value.id
            }
          )}
          onMouseEnter={this.onMouseEnter(value.id)}
          onMouseLeave={this.onMouseLeave}
          style={{
            top: value.position.y,
            left: value.position.x
          }}
        >
            <Button
              variant="fab"
              mini
              
              color="primary"
              >
              <Icon>comment</Icon>
            </Button>
            <Paper
              className={classnames(
                classes.contentText,
                {
                  [classes.contentTextVisible]: this.state.hovered === value.id
                }
              )}
            >
              <Typography variant="caption" className={classes.contentTextCaption}>
                {value.username} • {formatDate(new Date(value.date))}
              </Typography>
              <Typography variant="body2">
                {value.body}
              </Typography>
            </Paper>
          </div>
        )
      )) : null;
      
      const UserCommentPositionPoint = () => comment && position.x >= 0 ? (
        <Button
        className={classes.imageComment}
        style={{
          top: position.y,
          left: position.x
        }}
        variant="fab"
        mini
        disableRipple
        
        color="secondary"
        >
        <Icon>add_comment</Icon>
      </Button>
    ) : null;
    
    return (
      <OuterComponent comment={comment} classes={classes} post={post}>
        <Card className={classes.card + " " + (comment ? "" : classes.linkCard)}>
          <div
            className={classes.media}
            >
            <div className={classes.imageContainer}>
              <img
                alt={post.title}
                src={post.image}
                className={classes.img}
                onClick={onImageClick}
              />
              {commentsButtonList}
              <UserCommentPositionPoint />
            </div>
          </div>
          <CardContent>
            <Typography variant="display1" component="h2">
              {post.title}
            </Typography>
            <Typography variant="subheading">
              {post.owner} • {formatDate(new Date(post.date))}
            </Typography>
            {
              comment ?
              (<PostComment
                userCommentBody={userCommentBody}
                onBodyChange={onBodyChange}
                onSubmit={onSubmit}
              />):
              null
            }
          </CardContent>
        </Card>
      </OuterComponent>
    );
  };
}

export default withStyles(styles)(Post);