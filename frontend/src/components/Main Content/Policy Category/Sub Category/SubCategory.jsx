import React, { useState } from "react";

export default function SubCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateCompanyName, setUpdateCompanyName] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [mainCategoryOptions, setMainCategoryOptions] = useState([
    { value: "individualLife", label: "Individual Life Insurance" },
    { value: "healthInsurancePlan", label: "Health Insurance Plan" },
    { value: "childPlan", label: "Child Plan" },
    { value: "endowmentPlan", label: "Endowment Plan" },
  ]);

  const handleToggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = e.target.elements.companyNameInput.value.trim();
    if (newCategory) {
      setMainCategoryOptions((prevCategories) => [
        ...prevCategories,
        {
          value: newCategory.toLowerCase().replace(" ", ""),
          label: newCategory,
        },
      ]);
      setIsOpen(false);
    }
  };

  // Delete with confirmation
  const handleDeleteCompany = (index) => {
    const actualIndex = (currentPage - 1) * rowsPerPage + index;
    if (window.confirm("Are you sure you want to delete this company?")) {
      setMainCategoryOptions((prevCategories) =>
        prevCategories.filter((_, i) => i !== actualIndex)
      );
    }
  };

  // Update
  const handleOpenUpdateForm = (index) => {
    const actualIndex = (currentPage - 1) * rowsPerPage + index;
    setUpdateIndex(actualIndex);
    setUpdateCompanyName(mainCategoryOptions[actualIndex].label);
    setIsUpdateOpen(true);
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    const updatedName = updateCompanyName.trim();
    if (updatedName) {
      const updatedCompanies = [...mainCategoryOptions];
      updatedCompanies[updateIndex].label = updatedName;
      setMainCategoryOptions(updatedCompanies);
      setIsUpdateOpen(false);
      setUpdateCompanyName("");
      setUpdateIndex(null);
    }
  };

  // Filter categories based on the search query
  const filteredCompany = mainCategoryOptions.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
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
                    onClick={handleToggleForm}
                  >
                    Add Sub Category
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
                                style={{ width: "20px" }}
                              >
                                <div className="gridjs-th-content">Sr. No.</div>
                              </th>
                              <th
                                data-column-id="main category name"
                                className="gridjs-th gridjs-th-sort"
                                tabIndex="0"
                                style={{ width: "100px" }}
                              >
                                <div className="gridjs-th-content">
                                  Main Category Name
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
                            {currentData.map((mainCategory, index) => (
                              <tr className="gridjs-tr" key={index}>
                                <td
                                  style={{ width: "20px" }}
                                  data-column-id="serial number"
                                  className="gridjs-td"
                                >
                                  {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td
                                  data-column-id="company name"
                                  className="gridjs-td"
                                >
                                  {mainCategory.label}
                                </td>

                                <td
                                  data-column-id="action"
                                  className="gridjs-td"
                                >
                                  <button
                                    className="btn btn-danger me-2"
                                    style={{ fontSize: "10px" }}
                                    onClick={() => handleDeleteCompany(index)}
                                  >
                                    <i className="fa-solid fa-trash fs-2xs"></i>
                                  </button>
                                  <button
                                    className="btn btn-success"
                                    style={{ fontSize: "10px" }}
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

      {/*  Add Category Modal */}
      {isOpen && (
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
          onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="card" style={{ border: "none", boxShadow: "none" }}>
              <div className="card-body">
                <div className="live-preview">
                  <form onSubmit={handleAddCategory} className="row g-3">
                    <div className="col-md-12">
                      <label htmlFor="companyNameInput" className="form-label">
                        Sub Category Name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="companyNameInput"
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
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
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

      {/*  Update Category Modal */}
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
            <div className="card" style={{ border: "none", boxShadow: "none" }}>
              <div className="card-body">
                <div className="live-preview">
                  <form onSubmit={handleUpdateCompany} className="row g-3">
                    <div className="col-md-12">
                      <label htmlFor="updateCompanyName" className="form-label">
                        Update Category Name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="updateCompanyName"
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
                          Cancel
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
