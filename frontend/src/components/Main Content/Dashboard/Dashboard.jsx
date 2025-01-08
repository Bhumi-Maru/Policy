import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div
        className="page-content"
        style={{ left: "265px", position: "relative", width: "80%" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="h-100">
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p
                              className="text-uppercase fw-medium text-muted mb-0"
                              style={{ fontSize: "13px", color: "#878a99" }}
                            >
                              Total Policy
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target="559.25"
                              >
                                100
                              </span>
                            </h4>
                            <Link
                              to="/policy"
                              className="text-decoration-underline"
                              style={{ color: "#405189", fontSize: "13px" }}
                            >
                              View all policy
                            </Link>
                          </div>
                          <div class="avatar-sm flex-shrink-0">
                            <span class="avatar-title bg-success-subtle rounded fs-3">
                              <i className="ri-layout-3-line text-success"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p
                              className="text-uppercase fw-medium text-muted text-truncate mb-0"
                              style={{ fontSize: "13px", color: "#878a99" }}
                            >
                              Upcoming Expiry
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target="36894"
                              >
                                30
                              </span>
                            </h4>
                            <Link
                              to="/policy"
                              className="text-decoration-underline"
                              style={{ color: "#405189", fontSize: "13px" }}
                            >
                              View all expiry
                            </Link>
                          </div>
                          <div class="avatar-sm flex-shrink-0">
                            <span class="avatar-title bg-info-subtle rounded fs-3">
                              <i class="fa-regular fa-calendar-days text-info"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p
                              className="text-uppercase fw-medium text-muted text-truncate mb-0"
                              style={{ fontSize: "13px", color: "#878a99" }}
                            >
                              Total Client
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target="183.35"
                              >
                                30
                              </span>
                            </h4>
                            <Link
                              to="/client"
                              className="text-decoration-underline"
                              style={{ color: "#405189", fontSize: "13px" }}
                            >
                              view all client
                            </Link>
                          </div>
                          <div class="avatar-sm flex-shrink-0">
                            <span class="avatar-title bg-warning-subtle rounded fs-3">
                              <i class="bx bx-user-circle text-warning"></i>
                            </span>
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
