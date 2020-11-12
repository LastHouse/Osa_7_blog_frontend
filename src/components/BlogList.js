import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import blogAvatar from '../images/blogAvatar.jpg';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    minHeight: '50px',
  },
}));

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const classes = useStyles();

  const sortedBlogs = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  if (sortedBlogs.length === 0) {
    return (
      <div>
        <p>No blogs added. Please add content.</p>
      </div>
    );
  }

  return (
    <List className={classes.root}>
      {sortedBlogs.map((blog) => (
        <ListItem key={blog.id} alignItems="flex-start">
          <ListItemAvatar className={classes.inline}>
            <Avatar variant="square" alt="typewriter" src={blogAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={blog.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {'by '}
                  <Button
                    size="small"
                    color="secondary"
                    to={`/posts/${blog.id}`}
                    component={Link}
                  >
                    {blog.author}
                  </Button>
                </Typography>
                {'  - Click the author to know more'}
              </React.Fragment>
            }
          />
          <Divider variant="inset" />
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
