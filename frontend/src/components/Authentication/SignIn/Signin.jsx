import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email,
        password,
      });
      console.log(response.data);
      alert("Signin successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed. Try again.");
    }
  };

  return (
    <>
      <div
        className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 style={{ color: "#405189", fontSize: "17px" }}>
                        Welcome Back !
                      </h5>
                      <p style={{ color: "#878A99", fontSize: "13px" }}>
                        Sign in to continue to Policy Care.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit} className="row g-3">
                        {error && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "13px",
                              textAlign: "center",
                            }}
                          >
                            {error}
                          </p>
                        )}
                        <div className="col-md-12">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label"
                            style={{ color: "#212529", fontSize: "13px" }}
                          >
                            Email :
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="mb-3 col-md-12">
                          <div className="float-end">
                            <Link
                              to="/forgot-password"
                              style={{
                                textDecoration: "none",
                                fontSize: "13px",
                                color: "darkgrey",
                              }}
                            >
                              Forgot password ?
                            </Link>
                          </div>
                          <label
                            className="form-label"
                            htmlFor="password-input"
                            style={{ color: "#212529", fontSize: "13px" }}
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="auth-remember-check"
                            style={{ fontSize: "13px", marginTop: "6px" }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                            style={{ fontSize: "13px" }}
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="col-md-12">
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn w-100 btn-submit"
                              style={{ fontSize: "13px" }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <p style={{ color: "#212529", fontSize: "13px" }}>
                      Don't have an account ?
                      <Link
                        to="/signup"
                        className="fw-semibold text-decoration-underline"
                        style={{ color: "#405189", fontSize: "13px" }}
                      >
                        &nbsp; Signup
                      </Link>
                    </p>
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
