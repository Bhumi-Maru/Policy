import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const users = [
    {
      name: "Jay Sharma",
      phoneNumber: "+91 9876543210",
      email: "aarav.sharma@example.com",
    },
    {
      name: "Aarav",
      phoneNumber: "+91 9876543210",
      email: "aarav.sharma@example.com",
    },
    {
      name: "Meet Sharma",
      phoneNumber: "+91 9876543210",
      email: "aarav.sharma@example.com",
    },
    {
      name: "Rajesh Gupta",
      phoneNumber: "+91 9876543211",
      email: "rajesh.gupta@example.com",
    },
    {
      name: "Meera Patel",
      phoneNumber: "+91 9876543212",
      email: "meera.patel@example.com",
    },
    {
      name: "Aditya Verma",
      phoneNumber: "+91 9876543213",
      email: "aditya.verma@example.com",
    },
    {
      name: "Sneha Roy",
      phoneNumber: "+91 9876543214",
      email: "sneha.roy@example.com",
    },
  ];

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery)
  );

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const currentData = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div
        className="page-content"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div
          className="container-fluid"
          style={{
            left: "120px",
            position: "relative",
            width: "80%",
          }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card"
                style={{
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <div
                  className="card-header p-4 d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "white" }}
                >
                  {/* Search Input */}
                  <input
                    type="search"
                    placeholder="Type a keyword..."
                    aria-label="Type a keyword..."
                    className="gridjs-input gridjs-search-input"
                    style={{ width: "30%" }}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <button
                    role="button"
                    className="add-client-btn p-2"
                    onClick={() => navigate("/user-creation-form")}
                  >
                    Add User
                  </button>
                </div>

                <div className="card-body">
                  <div id="table-loading-state">
                    <div
                      role="complementary"
                      className="gridjs gridjs-container"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="gridjs-wrapper"
                        style={{ height: "auto" }}
                      >
                        <table
                          role="grid"
                          className="gridjs-table"
                          style={{ height: "auto" }}
                        >
                          <thead className="gridjs-thead">
                            <tr className="gridjs-tr">
                              <th
                                data-column-id="name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">Name</div>
                              </th>

                              <th
                                data-column-id="email"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">Email</div>
                              </th>
                              <th
                                data-column-id="name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Phone Number
                                </div>
                              </th>
                              <th
                                data-column-id="action"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">Action</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="gridjs-tbody">
                            {currentData.map((user, index) => (
                              <tr className="gridjs-tr" key={index}>
                                <td data-column-id="name" className="gridjs-td">
                                  {user.name}
                                </td>
                                <td
                                  data-column-id="email"
                                  className="gridjs-td"
                                >
                                  {user.email}
                                </td>
                                <td
                                  data-column-id="phone number"
                                  className="gridjs-td"
                                >
                                  {user.phoneNumber}
                                </td>
                                <td
                                  data-column-id="action"
                                  className="gridjs-td"
                                >
                                  <button className="btn btn-danger me-2">
                                    <i class="fa-solid fa-trash fs-2xs"></i>
                                  </button>
                                  <button className="btn btn-success">
                                    <i class="fa-solid fa-pencil fa-sm"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="gridjs-footer"
                        style={{ boxShadow: "none" }}
                      >
                        <div className="gridjs-pagination">
                          <div
                            style={{ fontSize: "16px" }}
                            role="status"
                            aria-live="polite"
                            className="gridjs-summary"
                          >
                            Showing <b>{(currentPage - 1) * rowsPerPage + 1}</b>{" "}
                            to{" "}
                            <b>
                              {Math.min(
                                currentPage * rowsPerPage,
                                filteredUsers.length
                              )}
                            </b>{" "}
                            of <b>{filteredUsers.length}</b> results
                          </div>
                          <div className="gridjs-pages">
                            <button
                              style={{ fontSize: "13px", cursor: "pointer" }}
                              tabIndex="0"
                              role="button"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              title="Previous"
                              aria-label="Previous"
                            >
                              <i
                                class="fa-solid fa-left-long"
                                style={{ color: "#405189" }}
                              ></i>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i}
                                style={{
                                  fontSize: "13px",
                                  backgroundColor:
                                    currentPage === i + 1 ? "#405189" : "",
                                }}
                                tabIndex="0"
                                role="button"
                                className={
                                  currentPage === i + 1
                                    ? "gridjs-currentPage"
                                    : ""
                                }
                                onClick={() => handlePageChange(i + 1)}
                                title={`Page ${i + 1}`}
                                aria-label={`Page ${i + 1}`}
                              >
                                {i + 1}
                              </button>
                            ))}
                            <button
                              style={{ fontSize: "13px" }}
                              tabIndex="0"
                              role="button"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              title="Next"
                              aria-label="Next"
                            >
                              <i
                                class="fa-solid fa-right-long"
                                style={{ color: "#405189" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="gridjs-temp" className="gridjs-temp"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
