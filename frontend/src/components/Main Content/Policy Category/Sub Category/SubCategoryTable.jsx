import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function SubCategoryTable({ handleMenuClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);

  // Fetch client data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/subCategory");
        const data = await response.json();
        setSubCategory(data);
      } catch (error) {
        console.error("Error fetching subCategory data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter clients based on search query
  const filteredData = subCategory.filter((subCategory) => {
    const query = searchQuery.toLowerCase();
    return (
      subCategory.subCategoryName &&
      subCategory.subCategoryName.toLowerCase().includes(query)
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
    const subCategoryName = e.target.querySelector(
      "#subcategoryname-field"
    ).value;
    try {
      let response;
      if (isEditMode && editSubCategory) {
        response = await fetch(
          `http://localhost:8000/api/subCategory/${editSubCategory._id}`,
          {
            method: "PUT",
            body: JSON.stringify({ subCategoryName }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch("http://localhost:8000/api/subCategory", {
          method: "POST",
          body: JSON.stringify({ subCategoryName }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (response.ok) {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("showModal")
        );
        modal.hide();
        e.target.reset();
        const newSubCategory = await response.json();
        if (isEditMode) {
          setSubCategory((prevSubCategory) =>
            prevSubCategory.map((subCategory) =>
              subCategory._id === editSubCategory._id
                ? newSubCategory
                : subCategory
            )
          );
        } else {
          setSubCategory((prevSubCategory) => [
            ...prevSubCategory,
            newSubCategory,
          ]);
        }
        setIsEditMode(false);
        setEditSubCategory(null);
      } else {
        console.error("Error adding/updating sub category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle adding a new company
  const handleAdd = () => {
    setIsEditMode(false);
    setEditSubCategory(null);
    const modal = new bootstrap.Modal(document.getElementById("showModal"));
    modal.show();
  };

  // Handle editing a company
  const handleEdit = (subCategory) => {
    setIsEditMode(true);
    setEditSubCategory(subCategory);
    const modal = new bootstrap.Modal(document.getElementById("showModal"));
    modal.show();
  };

  // Handle deleting a company
  const handleDelete = (subCategoryToDelete) => {
    const modal = new bootstrap.Modal(
      document.getElementById("deleteRecordModal")
    );
    modal.show();

    const deleteButton = document.getElementById("delete-record");
    const closeButton = document.getElementById("btn-close");

    const confirmDeletion = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/subCategory/${subCategoryToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setSubCategory((prevSubCategory) =>
            prevSubCategory.filter(
              (subCategory) => subCategory._id !== subCategoryToDelete._id
            )
          );
          modal.hide();
          showDeleteToast("Sub Category deleted successfully!");
        } else {
          const errorData = await response.json();
          showDeleteToast(
            `Failed to delete sub category: ${errorData.message}`
          );
        }
      } catch (error) {
        console.error("Error deleting sub Category:", error);
        showDeleteToast("An error occurred while deleting the sub category.");
      }
    };

    const cancelDeletion = () => {
      modal.hide();
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
                            <button
                              type="button"
                              className="btn btn-success add-btn"
                              onClick={handleAdd}
                              style={{ fontSize: "13px", color: "white" }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add
                            </button>
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
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                SR No.
                              </th>
                              <th
                                className="name_sort"
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Sub Category
                              </th>
                              <th
                                className="action_sort"
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
                              currentData.map((subCategory, index) => (
                                <tr key={subCategory._id}>
                                  {/* Serial Number */}
                                  <td
                                    className="serial number"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {currentPage * rowsPerPage -
                                      rowsPerPage +
                                      index +
                                      1}
                                  </td>
                                  {/* Company Name */}
                                  <td
                                    className="subCategory_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {subCategory.subCategoryName}
                                  </td>
                                  {/* Edit and Delete Actions */}
                                  <td>
                                    <div
                                      className="d-flex gap-2 justify-content-center"
                                      style={{ textAlign: "-webkit-center" }}
                                    >
                                      {/* Edit Button */}
                                      <div className="edit">
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            handleEdit(subCategory)
                                          }
                                          style={{ textDecoration: "none" }}
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                      </div>
                                      {/* Delete Button */}
                                      <div className="remove">
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            handleDelete(subCategory)
                                          }
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
                                  subCategory.length
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
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade zoomIn"
        id="deleteRecordModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#f7b84b,secondary:#f06548"
                  style={{ width: "100px", height: "100px" }}
                ></lord-icon>
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you Sure?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this record?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light close-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn w-sm btn-danger remove"
                  id="delete-record"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
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
                {isEditMode ? "Edit Sub Category" : "Add Sub Category"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label
                    htmlFor="subcategoryname-field"
                    className="form-label"
                    style={{ fontSize: "13px", color: "#495057" }}
                  >
                    Sub Category Name
                  </label>
                  <input
                    type="text"
                    id="subcategoryname-field"
                    className="form-control"
                    defaultValue={
                      isEditMode ? editSubCategory.subCategoryName : ""
                    }
                    required
                    placeholder="Enter company name"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light cancel-btn"
                  data-bs-dismiss="modal"
                  style={{ fontSize: "13px" }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  style={{ fontSize: "13px" }}
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
