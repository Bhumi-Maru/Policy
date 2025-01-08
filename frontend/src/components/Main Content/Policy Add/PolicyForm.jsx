import React, { useState, useEffect } from "react";
import "./PolicyForm.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function PolicyForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    companyPolicy: "",
    mainCategory: "",
    subCategory: "",
    issueDate: "",
    expiryDate: "",
    policyAmount: "",
    policyAttachment: null,
  });

  // Fetch options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/api/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const clientOptions = clients.map((client) => ({
    value: client._id,
    label: `${client.firstName} ${client.lastName}`,
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.companyPolicy)
      newErrors.companyPolicy = "Company Policy is required";
    if (!formData.mainCategory)
      newErrors.mainCategory = "Main Category is required";
    if (!formData.subCategory)
      newErrors.subCategory = "Sub Category is required";
    if (!formData.issueDate) newErrors.issueDate = "Issue Date is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry Date is required";
    if (!formData.policyAmount)
      newErrors.policyAmount = "Policy Amount is required";
    if (!formData.policyAttachment)
      newErrors.policyAttachment = "Policy Attachment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (field, option) => {
    setFormData({ ...formData, [field]: option ? option.value : "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataWithFiles = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFiles.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:8000/api/policy", {
        method: "POST",
        body: formDataWithFiles,
      });

      if (response.ok) {
        navigate("/client");
      } else {
        alert("Failed to create policy. Please try again.");
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
                    {loading ? (
                      <p>Loading options...</p>
                    ) : error ? (
                      <p className="text-danger">Error: {error}</p>
                    ) : (
                      <>
                        {/* Client Name */}
                        <div className="col-md-3">
                          <label
                            htmlFor="clientName"
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Client Name
                          </label>
                          <Select
                            id="clientName"
                            options={clientOptions}
                            onChange={(option) =>
                              handleSelectChange("clientName", option)
                            }
                            placeholder="Select a client"
                          />

                          {errors.clientName && (
                            <small className="text-danger">
                              {errors.clientName}
                            </small>
                          )}
                        </div>

                        {/* Company Name */}
                        <div className="col-md-3">
                          <label
                            htmlFor="companyPolicy"
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Company Name
                          </label>
                          <Select
                            id="companyPolicy"
                            options={companyOptions}
                            onChange={(option) =>
                              handleSelectChange("companyPolicy", option)
                            }
                            placeholder="Select a company"
                            isClearable
                          />
                          {errors.companyPolicy && (
                            <small className="text-danger">
                              {errors.companyPolicy}
                            </small>
                          )}
                        </div>

                        {/* Main Category */}
                        <div className="col-md-3">
                          <label
                            htmlFor="mainCategory"
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Main Category
                          </label>
                          <Select
                            id="mainCategory"
                            options={mainCategoryOptions}
                            onChange={(option) =>
                              handleSelectChange("mainCategory", option)
                            }
                            placeholder="Select a main category"
                            isClearable
                          />
                          {errors.mainCategory && (
                            <small className="text-danger">
                              {errors.mainCategory}
                            </small>
                          )}
                        </div>

                        {/* Sub Category */}
                        <div className="col-md-3">
                          <label
                            htmlFor="subCategory"
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Sub Category
                          </label>
                          <Select
                            id="subCategory"
                            options={subCategoryOptions}
                            onChange={(option) =>
                              handleSelectChange("subCategory", option)
                            }
                            placeholder="Select a sub category"
                            isClearable
                          />
                          {errors.subCategory && (
                            <small className="text-danger">
                              {errors.subCategory}
                            </small>
                          )}
                        </div>

                        {/* Issue Date */}
                        <div className="col-md-3">
                          <label
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Issue Date
                          </label>
                          <input
                            type="date"
                            name="issueDate"
                            className="form-control"
                            value={formData.issueDate}
                            onChange={handleInputChange}
                          />
                          {errors.issueDate && (
                            <small className="text-danger">
                              {errors.issueDate}
                            </small>
                          )}
                        </div>

                        {/* Expiry Date */}
                        <div className="col-md-3">
                          <label
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            name="expiryDate"
                            className="form-control"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                          />
                          {errors.expiryDate && (
                            <small className="text-danger">
                              {errors.expiryDate}
                            </small>
                          )}
                        </div>

                        {/* Policy Amount */}
                        <div className="col-md-3">
                          <label
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Policy Amount
                          </label>
                          <input
                            type="number"
                            name="policyAmount"
                            className="form-control"
                            value={formData.policyAmount}
                            onChange={handleInputChange}
                          />
                          {errors.policyAmount && (
                            <small className="text-danger">
                              {errors.policyAmount}
                            </small>
                          )}
                        </div>

                        {/* Policy Attachment */}
                        <div className="col-md-3">
                          <label
                            className="form-label"
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Policy Attachment
                          </label>
                          <input
                            type="file"
                            name="policyAttachment"
                            className="form-control"
                            onChange={handleFileChange}
                          />
                          {errors.policyAttachment && (
                            <small className="text-danger">
                              {errors.policyAttachment}
                            </small>
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
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
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
