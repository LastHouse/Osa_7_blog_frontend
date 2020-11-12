import React from 'react';
import DeleteBlog from './DeleteBlog';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, commentBlog } from '../reducers/blogReducer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import blogImage from '../images/blogImage.jpg';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    spacing: 0,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
}));

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const addLike = (id) => {
    const blogToLike = blogs.find((a) => a.id === id);
    dispatch(likeBlog(blogToLike));
    dispatch(setNotification(`${user.name} added a new like`, 5));
  };

  const addComment = async (e, id) => {
    e.preventDefault();

    const comment = e.target.comment.value;
    e.target.comment.value = '';

    const newObject = {
      comments: comment,
    };
    dispatch(commentBlog(id, newObject));
    dispatch(setNotification(`${user.name} added a new comment`, 5));
  };

  if (!blog) {
    return <div>Nothing to show</div>;
  }

  return (
    <div>
      {user === null ? (
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={0}
          >
            <Grid item xs>
              <Card className={classes.card} elevation={0} square>
                <CardMedia
                  component="img"
                  alt="Keep on blogging"
                  image={blogImage}
                  title="Keep on blogging"
                />
              </Card>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper} elevation={0} square>
                <Typography gutterBottom variant="h4" component="h2">
                  {blog.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  by {blog.author}
                </Typography>
                <Typography>{blog.url}</Typography>
                <Typography>likes: {blog.likes}</Typography>
                <Typography>added by: {blog.user.name}</Typography>
                <Tooltip title="Link to original post">
                  <IconButton href={blog.url} color="primary" target="blank">
                    <ForwardIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={0}
          >
            <Grid item xs>
              <Card className={classes.card} elevation={0} square>
                <CardMedia
                  component="img"
                  alt="Keep on blogging"
                  image={blogImage}
                  title="Keep on blogging"
                />
              </Card>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper} elevation={0} square>
                <Typography gutterBottom variant="h4" component="h2">
                  {blog.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  by {blog.author}
                </Typography>
                <Typography>{blog.url}</Typography>
                <Typography>likes: {blog.likes}</Typography>
                <Typography>added by: {blog.user.name}</Typography>
                <Tooltip title="Like">
                  <IconButton onClick={() => addLike(blog.id)}>
                    <ThumbUpIcon style={{ color: 'green' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Link">
                  <IconButton href={blog.url} color="primary" target="blank">
                    <ForwardIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                {user.name !== blog.user.name ? (
                  ''
                ) : (
                  <div>
                    <DeleteBlog id={blog.id} title={blog.title}></DeleteBlog>
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0} square>
                <Typography gutterBottom variant="h5" component="h2">
                  Comments:
                </Typography>
                {blog.comments.map((comment, i) => (
                  <Typography key={i}> {comment}</Typography>
                ))}
                <form onSubmit={(e) => addComment(e, blog.id)}>
                  <div>
                    <TextField
                      required
                      id="standard-full-width"
                      variant="outlined"
                      name="comment"
                      style={{ margin: 8 }}
                      placeholder="Add Comment"
                      helperText="Please be kind!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Button type="submit">Add comment</Button>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Blog;
