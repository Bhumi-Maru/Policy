import React from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "./PolicyAdd.css";

export default function PolicyAdd() {
  const location = useLocation();
  const clients = location.state?.clients || [];

  const clientOptions = clients.map((client) => ({
    value: client.name,
    label: client.name,
  }));

  const companyOptions = [
    ...new Map(
      clients.map((client) => [
        client.companyName,
        { value: client.companyName, label: client.companyName },
      ])
    ).values(),
  ];

  const mainCategoryOptions = [
    ...new Map(
      clients.map((client) => [
        client.mainCategory,
        { value: client.mainCategory, label: client.mainCategory },
      ])
    ).values(),
  ];

  const subCategoryOptions = [
    ...new Map(
      clients.map((client) => [
        client.subCategory,
        { value: client.subCategory, label: client.subCategory },
      ])
    ).values(),
  ];

  return (
    <>
      <div
        className="page-content"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div
          className="container-fluid"
          style={{ left: "120px", position: "relative", width: "80%" }}
        >
          <div className="row">
            <div className="col-xxl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="live-preview">
                    <form className="row g-3">
                      <div className="col-md-4">
                        <label
                          htmlFor="inputfirstname4"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          id="inputfirstname4"
                          placeholder="First Name"
                          required
                        />
                        {errors.firstName && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="inputlastname4"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          id="inputlastname4"
                          placeholder="Last Name"
                          required
                        />
                        {errors.lastName && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="phonenumberInput"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          className="form-control"
                          placeholder="(+91) 12345 67890"
                          id="phonenumberInput"
                          required
                        />
                        {errors.phoneNumber && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.phoneNumber}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="inputEmail4"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email"
                          required
                        />
                        {errors.email && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="inputAddress"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          className="form-control"
                          id="inputAddress"
                          placeholder="1234 Main Street"
                          required
                        />
                      </div>

                      <div
                        className="col-md-2 position-relative"
                        style={{ left: "83%" }}
                      >
                        <button
                          type="submit"
                          className="btn w-100 btn-submit"
                          style={{ fontSize: "13px" }}
                        >
                          Submit
                        </button>
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
