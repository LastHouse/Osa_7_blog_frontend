import blogsService from '../services/blogs';

const blogReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'GET_BLOG':
      return action.data;
    case 'LIKE':
      const likeById = action.data.id;
      const blogToLike = state.find((a) => a.id === likeById);
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      return state.map((blog) => (blog.id !== likeById ? blog : changedBlog));
    case 'DELETE':
      return [...state, state.filter((blog) => blog !== action.data)];

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
    const likedBlog = await blogsService.like(blog);
    dispatch({
      type: 'LIKE',
      data: likedBlog,
    });
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogsService.del(id);
    dispatch({
      type: 'DELETE',
      data: deletedBlog,
    });
  };
};

export default blogReducer;
