import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { states, citiesMapping } from "../../../Data/data";
import * as bootstrap from "bootstrap";

export default function UpdateAgent() {
  const { id } = useParams();
  console.log("Client ID from useParams:", id);
  const [isOpenAadhar, setIsOpenAadhar] = useState(false);
  const [isOpenPan, setIsOpenPan] = useState(false);
  const [isOpenOtherDocument, setIsOpenOtherDocument] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
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

  // Fetch client data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/agent/${id}`);
        const data = await response.json();

        if (data) {
          setFormValues({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            streetAddress: data.streetAddress || "",
            area: data.area || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
            document_name: data.document_name || "",
            document_url: data.document_url || "",
            aadharCard: data.aadharCard || "",
            pan: data.pan || "",
            otherDocuments: data.otherDocuments || "",
          });

          console.log(formValues);

          // Set the selected state and update cities
          const clientState = states.find(
            (state) => state.value === data.state
          );
          if (clientState) {
            setSelectedState(clientState);
            setCities(citiesMapping[clientState.value] || []);
          }

          // Set the selected city
          const clientCity = citiesMapping[data.state]?.find(
            (city) => city.value === data.city
          );
          if (clientCity) {
            setSelectedCity(clientCity);
          }
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

  const handleInputChangeFile = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setFormValues((prevState) => ({
      ...prevState,
      otherDocuments: fileNames,
    }));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(citiesMapping[state.value] || []);
    setSelectedCity(null);
    setFormValues((prevData) => ({ ...prevData, state: state.value }));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFormValues((prevData) => ({ ...prevData, city: city.value }));
  };

  // const formatDocumentNames = (documents) => {
  //   if (!documents || documents.length === 0) {
  //     return "No Other Documents Available";
  //   }

  //   // Limit the number of displayed names to 3
  //   const displayedDocs = documents.slice(0, 3).map(
  //     (doc) =>
  //       doc.split("/").pop().replace(/-\d+/, "").slice(0, 10) + // Truncate each name
  //       (doc.length > 10 ? "..." : "") // Append ellipsis for long names
  //   );

  //   // Append an indication for additional documents if applicable
  //   const extraCount = documents.length - displayedDocs.length;
  //   return extraCount > 0
  //     ? `${displayedDocs.join(", ")}, +${extraCount} more`
  //     : displayedDocs.join(", ");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/agent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.status === 200) {
        showSuccessToast("Record updated successfully!");
        navigate("/agent");
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
                          value={formValues.streetAddress}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputAddress"
                          placeholder="1234 Main Street"
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
                          value={formValues.area}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputArea"
                          placeholder="Enter your Area"
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
                          value={formValues.zip}
                          onChange={handleInputChange}
                          className="form-control"
                          id="inputZip"
                          placeholder="Zip code"
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
                          onClick={() => setIsOpenAadhar(!isOpenAadhar)}
                          onChange={handleInputChangeFile}
                          className="form-control"
                          id="aadharCard"
                        />
                        {isOpenAadhar && (
                          <div
                            className="mt-2 alert alert-dismissible text-white alert-label-icon fade show"
                            role="alert"
                            style={{ color: "black", fontSize: "13px" }}
                          >
                            <i
                              className="ri-information-line label-icon"
                              style={{ color: "black" }}
                            ></i>
                            <span
                              style={{
                                position: "relative",
                                fontSize: "13px",
                                left: "104px",
                                color: "black",
                              }}
                            >
                              {formValues.aadharCard &&
                              typeof formValues.aadharCard === "string"
                                ? formValues.aadharCard
                                    .split("/")
                                    .pop()
                                    .replace(/-\d+/, "")
                                : formValues.aadharCard
                                ? formValues.aadharCard.name
                                : "No Aadhar Card Available"}
                            </span>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                              onClick={() => setIsOpenAadhar(false)}
                            ></button>
                          </div>
                        )}
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
                          onClick={() => setIsOpenPan(!isOpenPan)}
                          onChange={handleInputChangeFile}
                          className="form-control"
                          id="pan"
                        />
                        {isOpenPan && (
                          <div
                            className="mt-2 alert alert-dismissible text-white alert-label-icon fade show"
                            role="alert"
                            style={{ color: "black", fontSize: "13px" }}
                          >
                            <i
                              className="ri-information-line label-icon"
                              style={{ color: "black" }}
                            ></i>

                            <span
                              style={{
                                position: "relative",
                                fontSize: "13px",
                                left: "104px",
                                color: "black",
                              }}
                            >
                              {formValues.pan &&
                              typeof formValues.pan === "string"
                                ? formValues.pan
                                    .split("/")
                                    .pop()
                                    .replace(/-\d+/, "")
                                : formValues.pan
                                ? formValues.pan.name
                                : "No Aadhar Card Available"}
                            </span>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            ></button>
                          </div>
                        )}
                      </div>
                      {/* Other Documents */}
                      <div className="col-md-4">
                        <label
                          htmlFor="aadharCard"
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Other Document
                        </label>
                        <input
                          type="file"
                          name="aadharCard"
                          onClick={() =>
                            setIsOpenOtherDocument(!isOpenOtherDocument)
                          }
                          onChange={handleInputChangeFile}
                          className="form-control"
                          id="aadharCard"
                        />
                        {isOpenOtherDocument && (
                          <div
                            className="mt-2 alert alert-dismissible text-white alert-label-icon fade show"
                            role="alert"
                            style={{ color: "black", fontSize: "13px" }}
                          >
                            <i
                              className="ri-information-line label-icon"
                              style={{ color: "black" }}
                            ></i>

                            <span
                              style={{
                                position: "relative",
                                fontSize: "13px",
                                left: "104px",
                                color: "black",
                              }}
                            >
                              {formValues.otherDocuments &&
                              typeof formValues.otherDocuments === "string"
                                ? formValues.otherDocuments
                                    .split("/")
                                    .pop()
                                    .replace(/-\d+/, "")
                                : formValues.otherDocuments
                                ? formValues.otherDocuments[0].split("/").pop()
                                : "No Other Document Available"}
                            </span>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            ></button>
                          </div>
                        )}
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
    </>
  );
}
