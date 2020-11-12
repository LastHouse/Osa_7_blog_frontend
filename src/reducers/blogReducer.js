import blogsService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'GET_BLOG':
      return action.data;
    case 'LIKE':
      const liked = action.data;
      return state.map((blog) => (blog.id === liked.id ? liked : blog));
    case 'COMMENT':
      const commented = action.data;
      return state.map((blog) => (blog.id === commented.id ? commented : blog));
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(newObject);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const getBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogsService.getOne(id);
    dispatch({
      type: 'GET_BLOG',
      data: blog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const toLike = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const data = await blogsService.like(toLike);
    dispatch({
      type: 'LIKE',
      data,
    });
  };
};

export const commentBlog = (id, newObject) => {
  return async (dispatch) => {
    const data = await blogsService.comment(id, newObject);
    dispatch({
      type: 'COMMENT',
      data,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogsService.del(id);
    dispatch({
      type: 'DELETE',
      data: id,
    });
  };
};

export default blogReducer;
