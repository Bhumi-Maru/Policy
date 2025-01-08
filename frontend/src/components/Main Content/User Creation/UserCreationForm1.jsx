import React from "react";
import "./UserCreation.css";

export default function UserCreationForm() {
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
            <div className="col-xxl-6 col-lg-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">User Creation</h4>
                </div>

                <div className="card-body">
                  <div className="live-preview">
                    <form action="javascript:void(0);" className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="fullnameInput" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullnameInput"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="fullnameInput" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullnameInput"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="phonenumberInput"
                            className="form-label"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="+(91) 12345 67890"
                            id="phonenumberInput"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="passwordInput" className="form-label">
                            Password
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="password"
                            id="phonenumberInput"
                          />
                        </div>
                      </div>

                      <div
                        className="col-md-4 positive-relative"
                        style={{ left: "30%" }}
                      >
                        <div>
                          <button
                            type="submit"
                            className="btn w-100 btn-submit"
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
      </div>
    </>
  );
}
