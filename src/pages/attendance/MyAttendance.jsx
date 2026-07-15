import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAttendanceByEmployee } from "../../services/AttendanceService";
import { FaCalendarCheck, FaSearch } from "react-icons/fa";

const MyAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [search, setSearch] = useState("");

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = () => {
    getAttendanceByEmployee(employeeId)
      .then((response) => {
        setAttendanceList(response.data);
        setFilteredAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearch(value);

    const filtered = attendanceList.filter(
      (attendance) =>
        attendance.attendanceDate?.toLowerCase().includes(value) ||
        attendance.status?.toLowerCase().includes(value),
    );

    setFilteredAttendance(filtered);
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaCalendarCheck className="me-2" />
              My Attendance
            </h4>
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                  />

                  <span className="input-group-text">
                    <FaSearch />
                  </span>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No Attendance Records Found
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((attendance) => (
                      <tr key={attendance.id}>
                        <td>{attendance.id}</td>

                        <td>{attendance.attendanceDate}</td>

                        <td>{attendance.checkIn}</td>

                        <td>{attendance.checkOut}</td>

                        <td>{attendance.workingHours}</td>

                        <td>
                          <span
                            className={`badge ${
                              attendance.status === "PRESENT"
                                ? "bg-success"
                                : attendance.status === "ABSENT"
                                  ? "bg-danger"
                                  : attendance.status === "LATE"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                            }`}
                          >
                            {attendance.status}
                          </span>
                        </td>

                        <td>{attendance.remarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-3">
              <strong>Total Attendance :</strong> {filteredAttendance.length}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAttendance;
