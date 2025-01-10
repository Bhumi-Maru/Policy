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
  const [companies, setCompanies] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch clients
        const clientRes = await fetch("http://localhost:8000/api/clients");
        // Fetch companies
        const companyRes = await fetch("http://localhost:8000/api/company");

        const mainCategoryRes = await fetch(
          "http://localhost:8000/api/mainCategory"
        );

        const subCategoryRes = await fetch(
          "http://localhost:8000/api/subCategory"
        );

        if (
          !clientRes.ok ||
          !companyRes.ok ||
          !mainCategoryRes.ok ||
          !subCategoryRes.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const clientsData = await clientRes.json();
        const companiesData = await companyRes.json();
        const mainCategoryData = await mainCategoryRes.json();
        const subCategoryData = await subCategoryRes.json();

        setClients(clientsData);
        setCompanies(companiesData);
        setMainCategories(mainCategoryData);
        setSubCategories(subCategoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const clientOptions = clients.map((client) => {
    const clientName =
      client.firstName && client.lastName
        ? `${client.firstName} ${client.lastName}`
        : "Unknown Client";
    return { value: client._id, label: clientName };
  });

  // Company dropdown options
  const companyOptions = companies.map((company) => ({
    value: company._id,
    label: company.companyName,
  }));

  const mainCategoryOptions = mainCategories.map((category) => ({
    value: category._id,
    label: category.mainCategoryName,
  }));

  const subCategoryOptions = subCategories.map((sub) => ({
    value: sub._id,
    label: sub.subCategoryName,
  }));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";

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
        navigate("/policy");
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
      {/* form */}
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
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Client Name
                          </label>
                          <Select
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
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Company Name
                          </label>
                          <Select
                            options={companyOptions}
                            onChange={(option) =>
                              handleSelectChange("companyName", option)
                            }
                            placeholder="Select a company"
                          />
                          {errors.companyName && (
                            <small className="text-danger">
                              {errors.companyName}
                            </small>
                          )}
                        </div>

                        {/* Main Category */}
                        <div className="col-md-3">
                          <label
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Main Category
                          </label>
                          <Select
                            options={mainCategoryOptions}
                            onChange={(option) =>
                              handleSelectChange("mainCategory", option)
                            }
                            placeholder="Select a main category"
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
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            Sub Category
                          </label>
                          <Select
                            placeholder="Select a main category"
                            options={subCategoryOptions}
                            onChange={(option) =>
                              handleSelectChange("subCategory", option)
                            }
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
                            style={{ fontSize: "13px", fontWeight: "bold" }}
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
