import React, { useState } from "react";
import "./CompanyTable.css";

export default function CompanyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [updateCompanyName, setUpdateCompanyName] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [company, setCompany] = useState([
    {
      companyName: "Policy Bazaar",
    },
    {
      companyName: "Bajaj Allianz",
    },
    {
      companyName: "LIC",
    },
    {
      companyName: "ICICI Lombard",
    },
  ]);

  const handleToggleAddForm = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (newCompanyName.trim()) {
      setCompany([...company, { companyName: newCompanyName }]);
      setNewCompanyName("");
      setIsAddOpen(false);
    }
  };

  // Delete with confirmation
  const handleDeleteCompany = (index) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompany((prevCompany) => prevCompany.filter((_, i) => i !== index));
    }
  };

  // Update
  const handleOpenUpdateForm = (index) => {
    setUpdateIndex(index);
    setUpdateCompanyName(company[index].companyName);
    setIsUpdateOpen(true);
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    if (updateCompanyName.trim()) {
      const updatedCompanies = [...company];
      updatedCompanies[updateIndex].companyName = updateCompanyName;
      setCompany(updatedCompanies);
      setIsUpdateOpen(false);
      setUpdateCompanyName("");
      setUpdateIndex(null);
    }
  };

  // Filter companies based on the search query
  const filteredCompany = company.filter((user) =>
    user.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredCompany.length / rowsPerPage);
  const currentData = filteredCompany.slice(
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
                    onClick={handleToggleAddForm}
                  >
                    Add Company
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
                                style={{ width: "100px" }}
                              >
                                <div className="gridjs-th-content">
                                  Company Name
                                </div>
                              </th>

                              <th
                                data-column-id="action"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "100px" }}
                              >
                                <div className="gridjs-th-content">Action</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="gridjs-tbody">
                            {currentData.map((company, index) => (
                              <tr className="gridjs-tr" key={index}>
                                <td
                                  data-column-id="company name"
                                  className="gridjs-td"
                                >
                                  {company.companyName}
                                </td>

                                <td
                                  data-column-id="action"
                                  className="gridjs-td"
                                >
                                  <button
                                    className="btn btn-danger me-2"
                                    onClick={() => handleDeleteCompany(index)}
                                  >
                                    <i className="fa-solid fa-trash fs-2xs"></i>
                                  </button>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleOpenUpdateForm(index)}
                                  >
                                    <i className="fa-solid fa-pencil fa-sm"></i>
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
                                filteredCompany.length
                              )}
                            </b>{" "}
                            of <b>{filteredCompany.length}</b> results
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
                                className="fa-solid fa-left-long"
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
                                className="fa-solid fa-right-long"
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

      {/* Add Form Popup */}
      {isAddOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={() => setIsAddOpen(false)}
        >
          <div
            className="modal-content"
            style={{
              position: "relative",
              top: "220px",
              left: "100px",
              margin: "auto",
              padding: "20px",
              background: "white",
              width: "40%",
              maxWidth: "500px",
              zIndex: 1001,
              borderRadius: "10px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                zIndex: "1",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setIsAddOpen(false)}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="card" style={{ border: "none", boxShadow: "none" }}>
              <div className="card-body">
                <div className="live-preview">
                  <form
                    action="javascript:void(0);"
                    className="row g-3"
                    onSubmit={handleAddCompany}
                  >
                    <div className="col-md-12">
                      <label htmlFor="companyNameInput" className="form-label">
                        Company Name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="companyNameInput"
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                      />
                    </div>

                    <div
                      className="col-md-4 d-flex positive-relative"
                      style={{ left: "60%", top: "12px" }}
                    >
                      <div className="d-flex">
                        <button
                          type="submit"
                          className="btn w-100 btn-submit me-2"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn w-100 btn-cancel"
                          onClick={() => setIsAddOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Form Popup */}
      {isUpdateOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={() => setIsUpdateOpen(false)}
        >
          <div
            className="modal-content"
            style={{
              position: "relative",
              top: "220px",
              left: "100px",
              margin: "auto",
              padding: "20px",
              background: "white",
              width: "40%",
              maxWidth: "500px",
              zIndex: 1001,
              borderRadius: "10px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                zIndex: "1",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setIsUpdateOpen(false)}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="card">
              <div className="card-body">
                <div className="live-preview">
                  <form
                    action="javascript:void(0);"
                    className="row g-3"
                    onSubmit={handleUpdateCompany}
                  >
                    <div className="col-md-12">
                      <label
                        htmlFor="updateCompanyNameInput"
                        className="form-label"
                      >
                        Update Company Name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="updateCompanyNameInput"
                        value={updateCompanyName}
                        onChange={(e) => setUpdateCompanyName(e.target.value)}
                      />
                    </div>

                    <div
                      className="col-md-4 d-flex positive-relative"
                      style={{ left: "60%", top: "12px" }}
                    >
                      <div className="d-flex">
                        <button
                          type="submit"
                          className="btn w-100 btn-submit me-2"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn w-100 btn-cancel"
                          onClick={() => setIsUpdateOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
