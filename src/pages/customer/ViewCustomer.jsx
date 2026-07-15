import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "../../services/CustomerService";

const ViewCustomer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const response = await getCustomerById(id);

      setCustomer(response.data);
    } catch (error) {
      console.error(error);

      alert("Unable to load customer.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3>View Customer</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th width="220">Customer ID</th>
                <td>{id}</td>
              </tr>

              <tr>
                <th>First Name</th>
                <td>{customer.firstName}</td>
              </tr>

              <tr>
                <th>Last Name</th>
                <td>{customer.lastName}</td>
              </tr>

              <tr>
                <th>Gender</th>
                <td>{customer.gender}</td>
              </tr>

              <tr>
                <th>Mobile</th>
                <td>{customer.mobile}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{customer.email}</td>
              </tr>

              <tr>
                <th>Address</th>
                <td>{customer.address}</td>
              </tr>

              <tr>
                <th>City</th>
                <td>{customer.city}</td>
              </tr>

              <tr>
                <th>State</th>
                <td>{customer.state}</td>
              </tr>

              <tr>
                <th>PIN Code</th>
                <td>{customer.pinCode}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/customers")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
