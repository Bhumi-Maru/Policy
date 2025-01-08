import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export default function SideBar({ activeItem, handleMenuClick }) {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const toggleDropdown = () => {
    setIsPolicyOpen(!isPolicyOpen);
  };
  return (
    <>
      <div
        className="app-menu navbar-menu"
        style={{ backgroundColor: "#405189" }}
      >
        <div className="navbar-brand-box">
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-dark.png" alt="" height="17" />
            </span>
          </a>
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-light.png" alt="" height="17" />
            </span>
          </a>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div
            className="container-fluid"
            style={{ "--bs-gutter-x": "-0.5rem" }}
          >
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu" style={{ color: "#405189" }}>
                  Menu
                </span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/dashboard"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                  onClick={() => handleMenuClick("Dashboard")}
                  style={{
                    color: activeItem === "Dashboard" ? "white" : "#abb9e8",
                  }}
                >
                  <i
                    className={`ri-dashboard-2-line ${
                      activeItem === "Dashboard" ? "#fff" : "#abb9e8"
                    }`}
                  ></i>
                  <span
                    data-key="t-dashboards"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                  to="/client"
                  onClick={() => handleMenuClick("Client")}
                  style={{
                    color: activeItem === "Client" ? "white" : "#abb9e8",
                  }}
                >
                  <i className="ri-apps-2-line"></i>
                  <span
                    data-key="t-apps"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Client
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/company"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                  onClick={() => handleMenuClick("Company")}
                  style={{
                    color: activeItem === "Company" ? "white" : "#abb9e8",
                  }}
                >
                  <i className="ri-building-fill"></i>
                  <span
                    data-key="t-layouts"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Company
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#"
                  onClick={toggleDropdown}
                  style={{
                    color:
                      activeItem === "Policy Category" || isPolicyOpen
                        ? "white"
                        : "#abb9e8",
                  }}
                >
                  <i class="ri-folder-line"></i>
                  <span
                    data-key="t-pages"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Policy Category
                  </span>

                  <i
                    className={`${
                      isPolicyOpen
                        ? "ri-arrow-up-s-line"
                        : "ri-arrow-down-s-line"
                    }`}
                    style={{
                      float: "left",
                      marginLeft: "37px",
                      color:
                        activeItem === "Policy Category" || isPolicyOpen
                          ? "white"
                          : "#abb9e8",
                    }}
                  ></i>
                </Link>
                <div
                  className={`menu-dropdown collapse ${
                    isPolicyOpen ? "show" : ""
                  }`}
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/policy-category/main-category"
                        className="nav-link"
                        data-key="t-starter"
                        onClick={() =>
                          handleMenuClick("Policy Category / Main Category")
                        }
                        style={{
                          color:
                            activeItem === "Policy Category / Main Category"
                              ? "white"
                              : "#abb9e8",
                          fontSize: ".9375rem",
                          fontFamily: "hkgrotesk, sans-serif",
                        }}
                      >
                        Main Category
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/policy-category/sub-category"
                        className="nav-link"
                        data-key="t-team"
                        onClick={() =>
                          handleMenuClick("Policy Category / Sub Category")
                        }
                        style={{
                          color:
                            activeItem === "Policy Category / Sub Category"
                              ? "white"
                              : "#abb9e8",
                          fontSize: ".9375rem",
                          fontFamily: "hkgrotesk, sans-serif",
                        }}
                      >
                        Sub Category
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/policy"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPages"
                  onClick={() => handleMenuClick("Policy")}
                  style={{
                    color: activeItem === "Policy" ? "white" : "#abb9e8",
                  }}
                >
                  <i className="ri-pages-line"></i>
                  <span
                    data-key="t-pages"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Policy
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/user-creation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLanding"
                  onClick={() => handleMenuClick("User Creation")}
                  style={{
                    color: activeItem === "User Creation" ? "white" : "#abb9e8",
                  }}
                >
                  <i className="ri-user-add-line"></i>
                  <span
                    data-key="t-landing"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    User Creation
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/agent"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarUI"
                  onClick={() => handleMenuClick("Agent")}
                  style={{
                    color: activeItem === "Agent" ? "white" : "#abb9e8",
                  }}
                >
                  <i className="ri-user-search-line"></i>
                  <span
                    data-key="t-base-ui"
                    style={{
                      fontSize: ".9375rem",
                      fontFamily: "hkgrotesk, sans-serif",
                    }}
                  >
                    Agent
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>
    </>
  );
}
