import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { logInUser, logOutUser } from '../reducers/loginReducer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userToLogin, setUserToLogin] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserToLogin({ ...userToLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(logInUser(userToLogin));
    } catch (exception) {
      dispatch(setNotification('wrong username or password!', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logOutUser());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {user === null ? (
        <div>
          <Tooltip title="Login">
            <IconButton
              onClick={() => handleClickOpen()}
              color="primary"
              size="medium"
              className={classes.button}
            >
              <LockOpenOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="username"
                value={userToLogin.username}
                onChange={(e) => handleInputChange(e)}
                label="Username"
                fullWidth
              />
              <TextField
                margin="dense"
                name="password"
                type="password"
                value={userToLogin.password}
                onChange={(e) => handleInputChange(e)}
                label="Password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleLogin} color="primary">
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Typography className={classes.title}>
            {user.name}
            <span>
              <Tooltip title="Logout">
                <IconButton
                  variant="contained"
                  color="inherit"
                  size="medium"
                  onClick={handleLogout}
                >
                  <LockOutlinedIcon />
                </IconButton>
              </Tooltip>
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
