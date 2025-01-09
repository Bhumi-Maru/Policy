import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";
import "./CompanyTable.css";

export default function CompanyTable({ handleMenuClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [companys, setCompanys] = useState([]);

  // Fetch client data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/company");
        const data = await response.json();
        setCompanys(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter clients based on search query
  const filteredData = companys.filter((company) => {
    const query = searchQuery.toLowerCase();
    return (
      company.companyName && company.companyName.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyName = e.target.querySelector("#customername-field").value;

    try {
      const response = await fetch("http://localhost:8000/api/company", {
        method: "POST",
        body: JSON.stringify({ companyName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("showModal")
        );
        modal.hide();

        e.target.reset();

        const newCompany = await response.json();
        setCompanys((prevCompanys) => [...prevCompanys, newCompany]);

        showDeleteToast("Company added successfully!");
      } else {
        console.error("Error adding company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Handle Adding a client
  const handleAdd = () => {
    const modal = new bootstrap.Modal(document.getElementById("showModal"));
    modal.show();

    const closeButton = document.getElementById("close-modal");
    const cancelButton = document.getElementById("btn-close");
    const cleanupListeners = () => {
      closeButton.removeEventListener("click", cancelModal);
      cancelButton.removeEventListener("click", cancelModal);
    };

    const cancelModal = () => {
      modal.hide();
      cleanupListeners();
    };

    closeButton.addEventListener("click", cancelModal);
    cancelButton.addEventListener("click", cancelModal);
  };

  // Handle deleting a company
  const handleDelete = (companyToDelete) => {
    const modal = new bootstrap.Modal(
      document.getElementById("deleteRecordModal")
    );
    modal.show();

    const deleteButton = document.getElementById("delete-record");
    const closeButton = document.getElementById("btn-close");

    const cleanupListeners = () => {
      deleteButton.removeEventListener("click", confirmDeletion);
      closeButton.removeEventListener("click", cancelDeletion);
    };

    const confirmDeletion = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/company/${companyToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setCompanys((prevCompanys) =>
            prevCompanys.filter(
              (company) => company._id !== companyToDelete._id
            )
          );
          modal.hide();
          showDeleteToast("Company deleted successfully!");
        } else {
          const errorData = await response.json();
          showDeleteToast(`Failed to delete company: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        showDeleteToast("An error occurred while deleting the company.");
      } finally {
        cleanupListeners();
      }
    };

    const cancelDeletion = () => {
      modal.hide();
      cleanupListeners();
    };

    deleteButton.addEventListener("click", confirmDeletion);
    closeButton.addEventListener("click", cancelDeletion);
  };

  const showDeleteToast = (message) => {
    const toastHTML = `
      <div class="toast fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1055; background-color: white">
        <div class="toast-header">
          <img src="assets/images/logo-sm.png" class="rounded me-2" alt="..." height="20" />
          <strong class="me-auto">Velzon</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.style.position = "fixed";
      toastContainer.style.top = "1rem";
      toastContainer.style.right = "1rem";
      toastContainer.style.zIndex = 1055;
      document.body.appendChild(toastContainer);
    }
    const toastElement = document.createElement("div");
    toastElement.innerHTML = toastHTML;
    toastContainer.appendChild(toastElement);
    const toastInstance = new bootstrap.Toast(
      toastElement.querySelector(".toast")
    );
    toastInstance.show();
    setTimeout(() => {
      toastInstance.hide();
      toastElement.remove();
    }, 3000);
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card" style={{ border: "none" }}>
                  <div className="card-body">
                    <div className="listjs-table" id="customerList">
                      <div className="row g-4 mb-3 d-flex flex-row-reverse">
                        <div className="col-sm-auto">
                          <div>
                            {/* <Link
                              type="button"
                              className="btn btn-success add-btn"
                              id="create-btn"
                              data-bs-target="#showModal"
                              to="/policy-add"
                              onClick={() => handleMenuClick("Add Policy")}
                              style={{
                                fontSize: "13px",
                                color: "white",
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add
                            </Link> */}
                            <Link
                              type="button"
                              className="btn btn-success add-btn"
                              id="create-btn"
                              data-bs-target="#showModal"
                              onClick={() => handleAdd("Add Policy")}
                              style={{
                                fontSize: "13px",
                                color: "white",
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th
                                className="srno_sort"
                                data-sort="serial number"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                SR. No.
                              </th>
                              <th
                                className="name_sort"
                                data-sort="customer_name"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Company Name
                              </th>
                              <th
                                className="action_sort"
                                data-sort="action"
                                style={{
                                  textAlign: "-webkit-center",
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentData.length > 0 ? (
                              currentData.map((company, index) => (
                                <tr key={index}>
                                  {/* Serial Number */}
                                  <td
                                    className="serial number"
                                    data-sort="serial number"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    &nbsp; &nbsp; &nbsp;
                                    {(currentPage - 1) * rowsPerPage +
                                      index +
                                      1}
                                  </td>

                                  {/* Company Name */}
                                  <td
                                    className="company_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {company.companyName}
                                  </td>

                                  {/* Edit and Delete Actions */}
                                  <td>
                                    <div
                                      className="d-flex gap-2 justify-content-center"
                                      style={{ textAlign: "-webkit-center" }}
                                    >
                                      {/* Edit Button */}
                                      <div className="edit">
                                        {console.log(
                                          "Company ID:",
                                          companys.id
                                        )}
                                        <Link
                                          to={`/client-update-form/${companys._id}`}
                                          onClick={() =>
                                            handleMenuClick("Update Company")
                                          }
                                          style={{ textDecoration: "none" }}
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                      </div>

                                      {/* Delete Button */}
                                      <div className="remove">
                                        <Link
                                          onClick={() => handleDelete(company)}
                                          style={{ textDecoration: "none" }}
                                        >
                                          <i className="ri-delete-bin-2-line"></i>
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7">
                                  <div className="noresult">
                                    <div className="text-center">
                                      <lord-icon
                                        src="https://cdn.lordicon.com/msoeawqm.json"
                                        trigger="loop"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{
                                          width: "75px",
                                          height: "75px",
                                        }}
                                      ></lord-icon>
                                      <h5
                                        className="mt-2"
                                        style={{
                                          fontSize: "16.25px",
                                          color: "#495957",
                                        }}
                                      >
                                        Sorry! No Result Found
                                      </h5>
                                      <p
                                        className="text-muted mb-0"
                                        style={{
                                          fontSize: "13px",
                                          color: "#878A99",
                                        }}
                                      >
                                        We've searched more than 150+ Orders. We
                                        did not find any orders for your search.
                                      </p>
                                    </div>
                                  </div>
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
                        {filteredData.length > 0 && (
                          <div className="gridjs-pagination">
                            <div
                              style={{ fontSize: "13px" }}
                              role="status"
                              aria-live="polite"
                              className="gridjs-summary"
                            >
                              Showing{" "}
                              <b>{(currentPage - 1) * rowsPerPage + 1}</b> to{" "}
                              <b>
                                {Math.min(
                                  currentPage * rowsPerPage,
                                  companys.length
                                )}
                              </b>{" "}
                              of <b>{filteredData.length}</b> results
                            </div>
                            <div className="gridjs-pages">
                              <button
                                style={{ fontSize: "13px", cursor: "pointer" }}
                                tabIndex="0"
                                role="button"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
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
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                title="Next"
                                aria-label="Next"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* delete modal */}
            <div
              className="modal fade zoomIn"
              id="deleteRecordModal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div
                    className="modal-header"
                    style={{ borderBottom: "none" }}
                  >
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="btn-close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="mt-2 text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/gsqxdxog.json"
                        trigger="loop"
                        colors="primary:#f7b84b,secondary:#f06548"
                        style={{ width: "100px", height: "100px" }}
                      ></lord-icon>
                      <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you Sure?</h4>
                        <p class="text-muted mx-4 mb-0">
                          Are you sure you want to remove this record?
                        </p>
                      </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                      <button
                        type="button"
                        class="btn w-sm btn-light close-btn"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn w-sm btn-danger remove"
                        id="delete-record"
                      >
                        Yes, Delete It!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* add modal */}
            <div
              className="modal fade"
              id="showModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ fontSize: "16.25px", color: "#495057" }}
                    >
                      Add Company
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    ></button>
                  </div>
                  <form
                    className="tablelist-form"
                    onSubmit={handleSubmit}
                    autocomplete="off"
                  >
                    <div className="modal-body">
                      <div
                        className="mb-3"
                        id="modal-id"
                        style={{ display: "none" }}
                      >
                        <label for="id-field" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="id-field"
                          className="form-control"
                          placeholder="ID"
                          readonly
                        />
                      </div>

                      <div class="mb-3">
                        <label
                          for="customername-field"
                          className="form-label"
                          style={{ fontSize: "13px" }}
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control company_name_input"
                          placeholder="Enter Name"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a customer name.
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light cancel-btn"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success submit-btn"
                          id="add-btn"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
