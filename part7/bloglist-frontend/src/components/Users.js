import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userServices from "../services/users";
import LoginForm from "./LoginForm";

const Users = () => {
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      const usersInDB = await userServices.getAll();
      setUsers(usersInDB);
    };
    getUsers();
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1>Users</h1>
          <table>
            <tbody>
              <tr>
                <th>username</th>
                <th>blogs</th>
              </tr>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// <div>
// {user === null ? (
//   <LoginForm />
// ) : (
// <div>
//   <h1>Users</h1>
//   <table>
//     <tbody>
//       <tr>
//         <th>username</th>
//         <th>blogs</th>
//       </tr>
//       {users.map((user) => (
//         <tr key={user.id}>
//           <td>{user.username}</td>
//           <td>{user.blogs.length}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// )
// </div>

export default Users;
