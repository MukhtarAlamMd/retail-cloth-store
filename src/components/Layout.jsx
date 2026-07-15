import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
        }}
      >
        <Navbar />

        <div className="container-fluid p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
