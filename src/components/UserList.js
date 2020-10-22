import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span> blogs created {user.posts.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
