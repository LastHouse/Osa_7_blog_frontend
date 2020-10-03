const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.content;
    case 'HIDE':
      return initialState;
    default:
      return state;
  }
};
let timer = null;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch({
      type: 'SHOW',
      data: { content },
    });

    timer = setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, time * 1000);
  };
};

export default notificationReducer;
