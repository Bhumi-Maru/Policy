import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

export default function UserUpdate() {
  const { id } = useParams();
  console.log("Client ID from useParams:", id);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // Fetch client data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        const data = await response.json();

        if (data) {
          setFormValues({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            password: data.password || "",
          });
          console.log(formValues);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.status === 200) {
        showSuccessToast("Record Updated Successfully!");
        navigate("/user-creation");
      }
    } catch (error) {
      console.error("Error updating client data:", error);
    }
  };

  // Display a success toast message
  const showSuccessToast = (message) => {
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
                    <form className="row g-3" onSubmit={handleSubmit}>
                      {/* First Name */}
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
                          value={formValues.firstName}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputfirstname4"
                          placeholder="First Name"
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
                      {/* Last Name */}
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
                          value={formValues.lastName}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputlastname4"
                          placeholder="Last Name"
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
                      {/* Phone Number */}
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
                          value={formValues.phoneNumber}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="(+91) 12345 67890"
                          id="phonenumberInput"
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
                      {/* Email */}
                      <div className="col-md-6">
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
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email"
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
                      {/* password */}
                      <div className="col-md-6">
                        <label
                          htmlFor="passwordInput"
                          className="form-label"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Password
                        </label>
                        <input
                          type="text"
                          name="password"
                          value={formValues.password}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="password"
                          id="passwordInput"
                          required
                        />
                        {errors.password && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.password}
                          </span>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="col-md-12 position-relative">
                        <button
                          type="submit"
                          className="btn btn-submit"
                          style={{
                            fontSize: "13px",
                            float: "inline-end",
                            width: "167px",
                          }}
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
