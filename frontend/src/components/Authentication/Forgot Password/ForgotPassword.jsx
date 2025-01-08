import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <>
      <div
        className="auth-page-content"
        style={{ marginTop: "50px", maxWidth: "100%" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 style={{ color: "#405189", fontSize: "17px" }}>
                      Forgot Password?
                    </h5>
                    <p
                      className="text-muted"
                      style={{ color: "#878A99", fontSize: "13px" }}
                    >
                      Reset password with Policy Care
                    </p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                    ></lord-icon>
                  </div>

                  <div
                    className="alert border-0 text-center mb-2 mx-2"
                    style={{
                      fontSize: "13px",
                      color: "#D29C40",
                      backgroundColor: "#FEF4E4",
                    }}
                    role="alert"
                  >
                    Enter your email and instructions will be sent to you!
                  </div>
                  <div className="p-2">
                    <form>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          style={{ color: "#212529", fontSize: "15px" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button
                          className="btn w-100"
                          type="submit"
                          style={{
                            backgroundColor: "#0AB39C",
                            fontSize: "13px",
                            color: "white",
                          }}
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="text-center mb-2">
                  <p style={{ fontSize: "13px" }}>
                    Wait, I remember my password...
                    <Link
                      to="/signin"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#405189", fontSize: "13px" }}
                    >
                      Click here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
