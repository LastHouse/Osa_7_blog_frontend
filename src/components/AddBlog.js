import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { initializeBlogs } from '../reducers/blogReducer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

const AddBlog = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newObject, setNewObject] = useState({
    title: '',
    author: '',
    url: '',
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setNewObject({ ...newObject, [e.target.name]: e.target.value });
  };

  const addBlog = async (e) => {
    dispatch(createBlog(newObject));
    dispatch(setNotification(`${user.name} added a new blog`, 5));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Tooltip title="Add Blog">
        <IconButton
          onClick={() => handleClickOpen()}
          color="default"
          size="medium"
          className={classes.button}
        >
          <PostAddOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a New Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            value={newObject.title}
            onChange={(e) => handleInputChange(e)}
            label="Title"
            fullWidth
          />
          <TextField
            margin="dense"
            name="author"
            value={newObject.author}
            onChange={(e) => handleInputChange(e)}
            label="Author"
            fullWidth
          />
          <TextField
            margin="dense"
            name="url"
            value={newObject.url}
            onChange={(e) => handleInputChange(e)}
            label="Url"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addBlog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBlog;
