import React from 'react';

const User = ({ user }) => {
  console.log(user);
  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.posts.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default User;
