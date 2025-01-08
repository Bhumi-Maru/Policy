import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyCategoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const clients = [
    {
      name: "Jay Sharma",
      companyName: "Policy Bazaar",
      mainCategory: "Health",
      subCategory: "Individual Health Plan",
    },
    {
      name: "Aarav Gupta",
      companyName: "Bajaj Allianz",
      mainCategory: "Car Insurance",
      subCategory: "Comprehensive",
    },
    {
      name: "Meera Patel",
      companyName: "LIC",
      mainCategory: "Life Insurance",
      subCategory: "Term Plan",
    },
    {
      name: "Rajesh Gupta",
      companyName: "ICICI Lombard",
      mainCategory: "Home Insurance",
      subCategory: "Apartment Coverage",
    },
    {
      name: "Sneha Roy",
      companyName: "Star Health",
      mainCategory: "Health",
      subCategory: "Family Floater",
    },
    {
      name: "Aditya Verma",
      companyName: "HDFC Ergo",
      mainCategory: "Travel Insurance",
      subCategory: "International Travel",
    },
    {
      name: "Neha Tiwari",
      companyName: "Reliance General",
      mainCategory: "Health",
      subCategory: "Senior Citizen Plan",
    },
  ];

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(clients.length / rowsPerPage);
  const currentData = clients.slice(
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
                  <input
                    type="search"
                    placeholder="Type a keyword..."
                    aria-label="Type a keyword..."
                    className="gridjs-input gridjs-search-input"
                    style={{ width: "30%" }}
                  />
                  <button
                    role="button"
                    className="add-client-btn p-2"
                    onClick={() => navigate("/policy-category-form")}
                  >
                    Add Policy Category
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
                                data-column-id="company name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Company Name
                                </div>
                              </th>

                              <th
                                data-column-id="main category"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Main Category
                                </div>
                              </th>

                              <th
                                data-column-id="sub category"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Sub Category
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="gridjs-tbody">
                            {currentData.map((client, index) => (
                              <tr className="gridjs-tr" key={index}>
                                <td
                                  data-column-id="company name"
                                  className="gridjs-td"
                                >
                                  {client.companyName}
                                </td>
                                <td
                                  data-column-id="main category"
                                  className="gridjs-td"
                                >
                                  {client.mainCategory}
                                </td>
                                <td
                                  data-column-id="sub category"
                                  className="gridjs-td"
                                >
                                  {client.subCategory}
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
                                clients.length
                              )}
                            </b>{" "}
                            of <b>{clients.length}</b> results
                          </div>
                          <div className="gridjs-pages">
                            <button
                              style={{ fontSize: "13px" }}
                              tabIndex="0"
                              role="button"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              title="Previous"
                              aria-label="Previous"
                            >
                              Previous
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
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
