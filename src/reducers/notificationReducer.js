const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHOW':
      return { data: action.data, show: true };
    case 'HIDE':
      return { data: null, show: false };
    default:
      return state;
  }
};

let timer = null;

export const setNotification = (content, time) => {
  return (dispatch) => {
    clearTimeout(timer);
    dispatch({
      type: 'SHOW',
      data: content,
    });

    timer = setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, time * 1000);
  };
};

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({ type: 'HIDE' });
  };
};

export default notificationReducer;
