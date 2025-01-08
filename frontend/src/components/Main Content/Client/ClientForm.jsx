import React, { useState } from "react";
import "./ClientForm.css";
import Select from "react-select";
import { states, citiesMapping } from "../../../Data/data";
import { useNavigate } from "react-router-dom";

export default function ClientForm() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    area: "",
    city: "",
    state: "",
    zip: "",
    document_url: "",
    document_name: "",
    aadharCard: null,
    pan: null,
    otherDocuments: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(citiesMapping[state.value] || []);
    setSelectedCity(null);
    setFormData((prevData) => ({ ...prevData, state: state.value }));
  };

  // Handle city change
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFormData((prevData) => ({ ...prevData, city: city.value }));
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    // Handle single and multiple file inputs
    if (name === "otherDocuments") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  // Form validation before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    if (!formData.area) newErrors.area = "Area is required";
    if (!formData.zip) newErrors.zip = "Zip is required";
    if (!formData.aadharCard) newErrors.aadharCard = "Aadhar Card is required";
    if (!formData.pan) newErrors.pan = "PAN is required";
    if (!formData.otherDocuments)
      newErrors.otherDocuments = "Other Documents are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataWithFiles = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "otherDocuments" && key !== "aadharCard" && key !== "pan") {
        formDataWithFiles.append(key, value);
      }
    });

    // Append single file fields
    if (formData.aadharCard) {
      formDataWithFiles.append("aadharCard", formData.aadharCard);
    }
    if (formData.pan) {
      formDataWithFiles.append("pan", formData.pan);
    }

    // Append multiple files
    if (formData.otherDocuments) {
      Array.from(formData.otherDocuments).forEach((file) => {
        formDataWithFiles.append("otherDocuments", file);
      });
    }

    console.log("Form data being sent:", formDataWithFiles);

    try {
      const response = await fetch("http://localhost:8000/api/clients", {
        method: "POST",
        body: formDataWithFiles,
      });

      if (response.ok) {
        navigate("/client");
      } else {
        alert("Failed to create client. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please check your network connection.");
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
                    {/* Street Address */}
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
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main Street"
                        required
                      />
                    </div>
                    {/* State */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputState"
                        className="form-label"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        State
                      </label>
                      <Select
                        name="state"
                        options={states}
                        value={selectedState}
                        onChange={handleStateChange}
                        placeholder="Select your state"
                        required
                      />
                    </div>
                    {/* City */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputCity"
                        className="form-label"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        City
                      </label>
                      <Select
                        name="city"
                        options={cities}
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder="Select your city"
                        isDisabled={!selectedState}
                        required
                      />
                    </div>
                    {/* Area */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputArea"
                        className="form-label"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        Area
                      </label>
                      <input
                        name="area"
                        type="text"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="form-control"
                        id="inputArea"
                        placeholder="Enter your Area"
                        required
                      />
                    </div>
                    {/* Zip */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputZip"
                        className="form-label"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        Zip
                      </label>
                      <input
                        name="zip"
                        type="text"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="form-control"
                        id="inputZip"
                        placeholder="Zip code"
                        required
                      />
                      {errors.zip && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.zip}
                        </span>
                      )}
                    </div>
                    {/* Aadhar Card */}
                    <div className="col-md-4">
                      <label
                        htmlFor="aadharCard"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        Aadhar Card
                      </label>
                      <input
                        type="file"
                        name="aadharCard"
                        onChange={handleFileChange}
                        className="form-control"
                        id="aadharCard"
                        required
                      />
                    </div>
                    {/* PAN Card */}
                    <div className="col-md-4">
                      <label
                        htmlFor="pan"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        PAN Card
                      </label>
                      <input
                        type="file"
                        name="pan"
                        onChange={handleFileChange}
                        className="form-control"
                        id="pan"
                        required
                      />
                    </div>
                    {/* Other Documents */}
                    <div className="col-md-4">
                      <label
                        htmlFor="otherDocuments"
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        Other Documents
                      </label>
                      <input
                        type="file"
                        name="otherDocuments"
                        onChange={handleFileChange}
                        className="form-control"
                        id="otherDocuments"
                        required
                        multiple
                      />
                    </div>
                    {/* Submit Button */}
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
  );
}
