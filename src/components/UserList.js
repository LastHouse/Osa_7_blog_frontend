import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
  },
  avatar: {
    backgroundColor: 'red',
  },
  pos: {
    marginBottom: 12,
  },
}));

const UserList = () => {
  const classes = useStyles();
  const users = useSelector((state) => state.users);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      spacing={0}
    >
      {users.map((user) => (
        <Grid item xs>
          <Card className={classes.root} elevation={0} key={user.id} square>
            <CardHeader
              className={classes.title}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {user.name.charAt(0)}
                </Avatar>
              }
              title={user.name}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                Blogs created {user.posts.length}
              </Typography>
              <Typography variant="body2" component="p" className={classes.pos}>
                Blog it like it's hot...
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" href={`/users/${user.id}`} size="small">
                list of {user.name}'s blogs
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
