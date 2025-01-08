import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PolicyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // tooltip
  useEffect(() => {
    const bootstrap = require("bootstrap");
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const clients = [
    {
      name: "Jay Sharma",
      companyName: "Policy Bazaar",
      subCategory: "Individual Health Plan",
      expiryDate: "2024-01-15",
      policyAmount: "₹50,000",
      document_url:
        "https://wbsche.wb.gov.in/assets/pdf/Political-Science/PUBLIC-POLICY.pdf",
      document_name: "Policy.pdf",
    },
    {
      name: "Aarav Gupta",
      companyName: "Bajaj Allianz",
      subCategory: "Comprehensive",
      expiryDate: "2023-12-01",
      policyAmount: "₹10,000",
      document_url:
        "https://wbsche.wb.gov.in/assets/pdf/Political-Science/PUBLIC-POLICY.pdf",
      document_name: "car_insurance.pdf",
    },
    {
      name: "Meera Patel",
      companyName: "LIC",
      subCategory: "Term Plan",
      expiryDate: "2041-07-10",
      policyAmount: "₹2,000,000",
      document_url:
        "https://wbsche.wb.gov.in/assets/pdf/Political-Science/PUBLIC-POLICY.pdf",
      document_name: "term_plan.pdf",
    },
  ];

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(clients.length / rowsPerPage);
  const currentData = filteredClients.slice(
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type a keyword..."
                    aria-label="Type a keyword..."
                    className="gridjs-input gridjs-search-input"
                    style={{ width: "30%" }}
                  />
                  <button
                    role="button"
                    className="add-client-btn p-2"
                    onClick={() =>
                      navigate("/policy-add", { state: { clients } })
                    }
                  >
                    Add Policy
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
                                data-column-id="serial number"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "70px" }}
                              >
                                Sr. No.
                              </th>
                              <th
                                data-column-id="name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "110px" }}
                              >
                                <div className="gridjs-th-content">
                                  Client Name
                                </div>
                              </th>

                              <th
                                data-column-id="company name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "120px" }}
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
                                  Sub Category
                                </div>
                              </th>

                              <th
                                data-column-id="issue date"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "120px" }}
                              >
                                <div className="gridjs-th-content">
                                  Expiry Date
                                </div>
                              </th>

                              <th
                                data-column-id="policy amount"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "100px" }}
                              >
                                <div className="gridjs-th-content">
                                  Policy
                                  <br />
                                  Amount
                                </div>
                              </th>

                              <th
                                data-column-id="policy attachment"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "110px" }}
                              >
                                <div className="gridjs-th-content">
                                  Policy
                                  <br />
                                  Attachment
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
                            {currentData && currentData.length > 0 ? (
                              currentData.map((client, index) => (
                                <tr className="gridjs-tr" key={index}>
                                  <td
                                    data-column-id="serial number"
                                    className="gridjs-td"
                                  >
                                    {(currentPage - 1) * rowsPerPage +
                                      index +
                                      1}
                                  </td>
                                  <td
                                    data-column-id="name"
                                    className="gridjs-td"
                                  >
                                    {client.name}
                                  </td>
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
                                    {client.subCategory}
                                  </td>
                                  <td
                                    data-column-id="issue date"
                                    className="gridjs-td"
                                  >
                                    {client.expiryDate}
                                  </td>
                                  <td
                                    data-column-id="policy amount"
                                    className="gridjs-td"
                                  >
                                    {client.policyAmount}
                                  </td>
                                  <td
                                    data-column-id="policy attachment"
                                    className="gridjs-td"
                                  >
                                    <Link
                                      to={client.document_url}
                                      target="_blank"
                                      style={{
                                        color: "#405189",
                                        textDecoration: "none",
                                      }}
                                    >
                                      <i
                                        className="ri-pushpin-fill"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title={client.document_name}
                                        style={{
                                          color: "#405189",
                                          textDecoration: "none",
                                        }}
                                      ></i>
                                    </Link>
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
                              ))
                            ) : (
                              <tr className="gridjs-tr">
                                <td
                                  colSpan="7"
                                  data-column-id="not found"
                                  className="gridjs-td text-center"
                                >
                                  <p className="mt-3">Not Found</p>
                                </td>
                              </tr>
                            )}
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
