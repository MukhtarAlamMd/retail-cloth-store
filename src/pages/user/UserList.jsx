import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { listUsers, deleteUser } from "../../services/UserService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeUser(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id)
        .then(() => {
          getAllUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>User List</h2>

            <Link to="/add-user" className="btn btn-primary">
              Add User
            </Link>
          </div>

          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Role</th>

                <th>Status</th>

                <th width="240">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>
                    {user.firstName} {user.lastName}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <span className="badge bg-primary">{user.role}</span>
                  </td>

                  <td>
                    {user.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>

                  <td>
                    <Link
                      to={`/view-user/${user.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-user/${user.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
