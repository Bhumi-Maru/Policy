import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/auth/signup",
        formData
      );
      console.log(response.data);
      alert("Signup successful!");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
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
                    <h5 style={{ fontSize: "17px", color: "#405189" }}>
                      Create New Account
                    </h5>
                    <p style={{ color: "#878A99", fontSize: "13px" }}>
                      Get your free Policy Care account now
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
                      <div className="col-md-6">
                        <label
                          htmlFor="firstName"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          First Name :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="lastName"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          Last Name :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          Email :
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="phoneNumber"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          Phone Number :
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="(+91) 12345 67890"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="password"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          Password :
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label"
                          style={{ fontSize: "13px", color: "212529" }}
                        >
                          Confirm Password :
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
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
                  <p style={{ fontSize: "13px" }}>
                    Already have an account ?
                    <Link
                      to="/signin"
                      className="fw-semibold text-decoration-underline"
                      style={{ fontSize: "13px", color: "#405189" }}
                    >
                      &nbsp; Signin
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
