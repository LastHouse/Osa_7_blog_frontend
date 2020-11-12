import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text,
  },
}));

const User = ({ user }) => {
  const classes = useStyles();
  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={0}
      >
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper} square>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}'s added blogs:
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {user.posts.map((blog) => (
            <Paper elevation={0} className={classes.paper} key={blog.id} square>
              {blog.title}
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
