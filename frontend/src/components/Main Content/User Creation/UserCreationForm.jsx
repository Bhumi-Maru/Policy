import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form validation before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/user-creation");
      } else {
        const errorData = await response.json();
        if (
          errorData.message &&
          errorData.message ===
            "Email already exists. Please use a different email."
        ) {
          setErrors({ email: errorData.message });
        } else {
          setErrors("Failed to create user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("Error submitting form. Please check your network connection.");
    }
  };

  return (
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
                  <form onSubmit={handleSubmit} className="row g-3">
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
                        value={formData.firstName}
                        onChange={handleInputChange}
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
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
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
                        value={formData.email}
                        onChange={handleInputChange}
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

                    {/* Password */}
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
                        value={formData.password}
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
                          width: "167px",
                          float: "inline-end",
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
  );
}
