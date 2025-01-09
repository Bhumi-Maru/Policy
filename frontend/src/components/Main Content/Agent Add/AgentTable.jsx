import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function AgentTable({ handleMenuClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);

  // Fetch client data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/agent");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter clients based on search query
  const filteredData = clients.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      (client.firstName && client.firstName.toLowerCase().includes(query)) ||
      (client.lastName && client.lastName.toLowerCase().includes(query)) ||
      (client.phoneNumber && client.phoneNumber.includes(query)) ||
      (client.email && client.email.toLowerCase().includes(query)) ||
      (client.address && client.address.toLowerCase().includes(query)) ||
      (client.document_name &&
        client.document_name.toLowerCase().includes(query))
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

  // Merge client address fields for display
  const mergeAddress = (client) => {
    const { streetAddress, state, city, area, zip } = client;
    return [streetAddress, area, city, state, zip].filter(Boolean).join(", ");
  };

  // Handle deleting a client
  const handleDelete = (clientToDelete) => {
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
          `http://localhost:8000/api/agent/${clientToDelete._id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setClients((prevClients) =>
            prevClients.filter((client) => client._id !== clientToDelete._id)
          );
          modal.hide();
          showDeleteToast("Record deleted successfully!");
        } else {
          const errorData = await response.json();
          showDeleteToast(`Failed to delete client: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting client:", error);
        showDeleteToast("An error occurred while deleting the client.");
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

  // Initialize tooltips for table rows
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [clients]);

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
                            <Link
                              type="button"
                              className="btn btn-success add-btn"
                              id="create-btn"
                              data-bs-target="#showModal"
                              to="/agent-add"
                              onClick={() => handleMenuClick("Add Agent")}
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
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                SR No.
                              </th>
                              <th
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Name
                              </th>
                              <th
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Email
                              </th>
                              <th
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Phone
                              </th>
                              <th
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                Address
                              </th>
                              {/* <th
                                style={{
                                  fontSize: ".8rem",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                Document
                              </th> */}
                              <th
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
                              currentData.map((client, index) => (
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

                                  {/* Customer Name */}
                                  <td
                                    className="customer_name"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {`${client.firstName || ""} ${
                                      client.lastName || ""
                                    }`}
                                  </td>

                                  {/* Email */}
                                  <td
                                    className="email"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {client.email}
                                  </td>

                                  {/* Phone Number */}
                                  <td
                                    className="phone"
                                    style={{ fontSize: ".8rem" }}
                                  >
                                    {client.phoneNumber}
                                  </td>

                                  {/* Address (Tooltip) */}
                                  <td
                                    data-column-id="address"
                                    style={{ textAlign: "center" }}
                                  >
                                    <i
                                      className="ri-information-fill"
                                      style={{
                                        color: "#405189",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                      }}
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={` ${mergeAddress(client)}`}
                                    ></i>
                                  </td>

                                  {/* Document Link */}
                                  {/* <td
                                    data-column-id="policy attachment"
                                    style={{ textAlign: "center" }}
                                  >
                                    {client.otherDocuments &&
                                    Array.isArray(client.otherDocuments) &&
                                    client.otherDocuments.length > 0 ? (
                                      <div>
                                        {client.otherDocuments.map(
                                          (doc, index) => (
                                            <a
                                              key={index}
                                              href={`http://localhost:8000${doc}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{ textDecoration: "none" }}
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              title={doc.split(/[/\\]/).pop()}
                                            >
                                              <i
                                                className="ri-pushpin-fill"
                                                style={{
                                                  color: "#405189",
                                                  cursor: "pointer",
                                                  fontSize: "15px",
                                                }}
                                              ></i>
                                            </a>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <span
                                        style={{
                                          color: "grey",
                                          fontSize: "13px",
                                          cursor: "not-allowed",
                                        }}
                                      >
                                        <i
                                          className="ri-pushpin-fill"
                                          style={{
                                            color: "#405189",
                                            cursor: "not-allowed",
                                            fontSize: "15px",
                                          }}
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title={"No Document"}
                                        ></i>{" "}
                                        No Document
                                      </span>
                                    )}
                                  </td> */}

                                  {/* Edit and Delete Actions */}
                                  <td>
                                    <div
                                      className="d-flex gap-2 justify-content-center"
                                      style={{ textAlign: "-webkit-center" }}
                                    >
                                      {/* Edit Button */}
                                      <div className="edit">
                                        {console.log("agent ID:", clients.id)}
                                        <Link
                                          to={`/agent-update-form/${client._id}`}
                                          onClick={() =>
                                            handleMenuClick("Update Agent")
                                          }
                                          style={{ textDecoration: "none" }}
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                      </div>

                                      {/* Delete Button */}
                                      <div className="remove">
                                        <Link
                                          onClick={() => handleDelete(client)}
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
                                  clients.length
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
          </div>
        </div>
      </div>
    </>
  );
}
