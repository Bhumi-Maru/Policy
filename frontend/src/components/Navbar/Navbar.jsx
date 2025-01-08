import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ activeItem }) {
  return (
    <>
      <header id="page-topbar" style={{ zIndex: "1" }}>
        <div className="layout-width">
          <div className="navbar-header justify-content-between">
            <div className="d-flex align-items-center pt-3">
              <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb">
                  <li className="breadcrumb-item"></li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {activeItem}
                  </li>
                </ol> */}
                <ol
                  className="breadcrumb"
                  style={{ fontSize: "13px", fontWeight: "bolder" }}
                >
                  <li className="breadcrumb-item"></li>
                  {activeItem}
                  {activeItem === "Policy Category" && (
                    <li className="breadcrumb-item active" aria-current="page">
                      {activeItem === "main-category" && (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Main Category
                        </li>
                      )}
                      {activeItem === "sub-category" && (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Sub Category
                        </li>
                      )}
                    </li>
                  )}
                </ol>
              </nav>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary text-center"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22"></i>
                  <span
                    className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
                    style={{ margin: "10px 7px" }}
                  >
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                  style={{ width: "625px", zIndex: "1" }}
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">
                            Notifications
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge bg-light-subtle text-body fs-13">
                            4 New
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 pt-2">
                      <ul
                        className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                        data-dropdown-tabs="true"
                        id="notificationItemsTab"
                        role="tablist"
                      >
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#all-noti-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            All (4)
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#messages-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Messages
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#alerts-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Alerts
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="tab-content position-relative"
                    id="notificationItemsTabContent"
                  >
                    <div
                      className="tab-pane fade show active py-2 ps-2"
                      id="all-noti-tab"
                      role="tabpanel"
                    >
                      <div
                        data-simplebar
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                <i className="bx bx-badge-check"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 lh-base">
                                  Your <b>Elite</b> author Graphic Optimization
                                  <span className="text-secondary">
                                    reward
                                  </span>{" "}
                                  is ready!
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> Just
                                  30 sec ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 48
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                <i className="bx bx-message-square-dots"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                  You have received
                                  <b className="text-success">20</b> new
                                  messages in the conversation
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 4
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Notifications
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade py-2 ps-2"
                      id="messages-tab"
                      role="tabpanel"
                      aria-labelledby="messages-tab"
                    >
                      <div
                        data-simplebar
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-3.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  James Lemire
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 30
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-6.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Kenneth Brown
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Mentionned you in his comment on 📃 invoice
                                  #12501.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 10
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 3
                                  days ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Messages
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade p-4"
                      id="alerts-tab"
                      role="tabpanel"
                      aria-labelledby="alerts-tab"
                    ></div>

                    <div
                      className="notification-actions"
                      id="notification-actions"
                    >
                      <div className="d-flex text-muted justify-content-center">
                        Select
                        <div
                          id="select-content"
                          className="text-body fw-semibold px-1"
                        >
                          0
                        </div>
                        Result
                        <button
                          type="button"
                          className="btn btn-link link-danger p-0 ms-3"
                          data-bs-toggle="modal"
                          data-bs-target="#removeNotificationModal"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  style={{ border: "none" }}
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="assets/images/users/avatar-1.jpg"
                      alt="Header Avatar"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Anna Adame
                      </span>
                    </span>
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome Anna!</h6>
                  <a className="dropdown-item" href="pages-profile.html">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </a>

                  <a className="dropdown-item" href="auth-logout-basic.html">
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
