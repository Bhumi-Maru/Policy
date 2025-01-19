import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from "react-select";

export default function UpdatePolicy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
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
  const [policy, setPolicy] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  console.log("clients" + clients);
  console.log("policy data ", policy);
  useEffect(() => {
    const fetchOptions = async () => {
      setError(null);
      try {
        const policyRes = await fetch("http://localhost:8000/api/policy");
        const clientRes = await fetch("http://localhost:8000/api/clients");
        const companyRes = await fetch("http://localhost:8000/api/company");
        const mainCategoryRes = await fetch(
          "http://localhost:8000/api/mainCategory"
        );
        const subCategoryRes = await fetch(
          "http://localhost:8000/api/subCategory"
        );

        if (
          !policyRes ||
          !clientRes.ok ||
          !companyRes.ok ||
          !mainCategoryRes.ok ||
          !subCategoryRes.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const policyData = await policyRes.json();
        const clientsData = await clientRes.json();
        const companiesData = await companyRes.json();
        const mainCategoryData = await mainCategoryRes.json();
        const subCategoryData = await subCategoryRes.json();

        setPolicy(policyData);
        setClients(clientsData);
        setCompanies(companiesData);
        setMainCategories(mainCategoryData);
        setSubCategories(subCategoryData);

        // Fetch the existing policy data for the given `id`
        // const policyRes = await fetch(`http://localhost:8000/api/policy/${id}`);
        // if (policyRes.ok) {
        //   const policyData = await policyRes.json();
        //   setFormData({
        //     clientName: policyData.clientName,
        //     companyPolicy: policyData.companyPolicy,
        //     mainCategory: policyData.mainCategory,
        //     subCategory: policyData.subCategory,
        //     issueDate: policyData.issueDate,
        //     expiryDate: policyData.expiryDate,
        //     policyAmount: policyData.policyAmount,
        //     policyAttachment: policyData.policyAttachment,
        //   });
        // } else {
        //   throw new Error("Failed to fetch policy data");
        // }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOptions();
  }, [id]);

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

  // pagination
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(clients.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const currentData = clients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div
      className="page-content"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      {/* form 1 */}
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
                    {error ? (
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
                            value={clientOptions.find(
                              (option) => option.value === formData.clientName
                            )}
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
                            placeholder="Select a sub category"
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
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form 2 */}
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
                    {error ? (
                      <p className="text-danger">Error: {error}</p>
                    ) : (
                      <>
                        {/* Issue Date */}
                        <div className="col-md-2">
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
                        <div className="col-md-2">
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
                          style={{
                            top: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                          }}
                        >
                          <button
                            type="submit"
                            className="btn w-30 btn-submit"
                            style={{ fontSize: "13px" }}
                          >
                            Add
                          </button>
                          <button
                            type="submit"
                            className="btn w-30 btn-submit"
                            style={{ fontSize: "13px" }}
                          >
                            Bin
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
              <div className="card-body">
                <div className="listjs-table" id="customerList">
                  <div className="table-responsive table-card mt-3 mb-1">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th
                            className="srno_sort"
                            data-sort="serial number"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            SR No.
                          </th>
                          {/* Issue Date */}
                          <th
                            className="issueDate_sort"
                            data-sort="address"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Issue Date
                          </th>
                          {/* Expiry Date */}
                          <th
                            className="expiryDate_sort"
                            data-sort="address"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Expiry Date
                          </th>
                          {/* policyAmount */}
                          <th
                            className="policyAmount_sort"
                            data-sort="policyAmount"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Policy Amount
                          </th>
                          {/* Policy Attachment */}
                          <th
                            className="policyAttachment_sort"
                            data-sort="doc"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Policy Attachment
                          </th>
                          <th
                            className="action_sort"
                            data-sort="action"
                            style={{
                              textAlign: "-webkit-center",
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {currentData.length > 0 ? (
                          currentData.map((client, index) => (
                            <tr key={index}>
                              {/* Serial Number */}
                              <td
                                className="serial number"
                                data-sort="serial number"
                                style={{ fontSize: ".8rem" }}
                              >
                                &nbsp; &nbsp; &nbsp;
                                {(currentPage - 1) * rowsPerPage + index + 1}
                              </td>
                              {/* Issue Date */}
                              <td
                                className="issue_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {policy.issueDate}
                                {console.log(
                                  "policy issueDate",
                                  policy[0]?.issueDate
                                )}
                              </td>

                              {/* Expiry Date */}
                              <td
                                className="expiry_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {client.expiryDate}
                              </td>
                              <td
                                className="policy_amount"
                                style={{ fontSize: ".8rem" }}
                              >
                                &nbsp; &nbsp; &nbsp; {client.policyAmount}
                              </td>
                              {/* Document Link */}
                              <td
                                data-column-id="policy attachment"
                                style={{ textAlign: "center" }}
                              >
                                <i
                                  className="ri-pushpin-fill"
                                  style={{
                                    color: "#405189",
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={client.policyAttachment}
                                ></i>
                              </td>
                              {/* Edit and Delete Actions */}
                              <td>
                                <div
                                  className="d-flex gap-2 justify-content-center"
                                  style={{ textAlign: "-webkit-center" }}
                                >
                                  {/* Edit Button */}
                                  <div className="edit">
                                    {console.log("Client ID:", clients.id)}
                                    <Link
                                      to={`/policy-update-form/${client._id}`}
                                      //   onClick={() =>
                                      //     handleMenuClick("Update policy")
                                      //   }
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-edit-2-line"></i>
                                    </Link>
                                  </div>
                                  {/* Delete Button */}
                                  <div className="remove">
                                    <Link
                                      //   onClick={() => handleDelete(client)}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-delete-bin-2-line"></i>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{
                                      width: "75px",
                                      height: "75px",
                                    }}
                                  ></lord-icon>
                                  <h5
                                    className="mt-2"
                                    style={{
                                      fontSize: "16.25px",
                                      color: "#495957",
                                    }}
                                  >
                                    Sorry! No Result Found
                                  </h5>
                                  <p
                                    className="text-muted mb-0"
                                    style={{
                                      fontSize: "13px",
                                      color: "#878A99",
                                    }}
                                  >
                                    We've searched more than 150+ Orders. We did
                                    not find any orders for your search.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* pagination */}
                  <div className="gridjs-footer" style={{ boxShadow: "none" }}>
                    {currentData.length > 0 && (
                      <div className="gridjs-pagination">
                        <div
                          style={{ fontSize: "13px" }}
                          role="status"
                          aria-live="polite"
                          className="gridjs-summary"
                        >
                          Showing <b>{(currentPage - 1) * rowsPerPage + 1}</b>{" "}
                          to{" "}
                          <b>
                            {Math.min(
                              currentPage * rowsPerPage,
                              clients.length
                            )}
                          </b>{" "}
                          of <b>{currentData.length}</b> results
                        </div>
                        <div className="gridjs-pages">
                          <button
                            style={{ fontSize: "13px", cursor: "pointer" }}
                            tabIndex="0"
                            role="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            title="Previous"
                            aria-label="Previous"
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              style={{
                                fontSize: "13px",
                                backgroundColor:
                                  currentPage === i + 1 ? "#405189" : "",
                              }}
                              tabIndex="0"
                              role="button"
                              className={
                                currentPage === i + 1
                                  ? "gridjs-currentPage"
                                  : ""
                              }
                              onClick={() => handlePageChange(i + 1)}
                              title={`Page ${i + 1}`}
                              aria-label={`Page ${i + 1}`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            style={{ fontSize: "13px" }}
                            tabIndex="0"
                            role="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            title="Next"
                            aria-label="Next"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card" style={{ border: "none" }}>
              <div className="card-body">
                <div className="listjs-table" id="customerList">
                  <div className="table-responsive table-card mt-3 mb-1">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th
                            className="srno_sort"
                            data-sort="serial number"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            SR No.
                          </th>
                          Expiry Date
                          <th
                            className="expiryDate_sort"
                            data-sort="address"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Expiry Date
                          </th>
                          policyAmount 
                          <th
                            className="policyAmount_sort"
                            data-sort="policyAmount"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Policy Amount
                          </th>
                          Policy Attachment
                          <th
                            className="policyAttachment_sort"
                            data-sort="doc"
                            style={{
                              fontSize: ".8rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Policy Attachment
                          </th>
                          <th
                            className="action_sort"
                            data-sort="action"
                            style={{
                              textAlign: "-webkit-center",
                              fontSize: ".8rem",
                              fontWeight: "bold",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {currentData.length > 0 ? (
                          currentData.map((client, index) => (
                            <tr key={index}>
                              Serial Number
                              <td
                                className="serial number"
                                data-sort="serial number"
                                style={{ fontSize: ".8rem" }}
                              >
                                &nbsp; &nbsp; &nbsp;
                                {(currentPage - 1) * rowsPerPage + index + 1}
                              </td>

                              Expiry Date
                              <td
                                className="expiry_date"
                                style={{ fontSize: ".8rem" }}
                              >
                                {client.expiryDate}
                              </td>

                              <td
                                className="policy_amount"
                                style={{ fontSize: ".8rem" }}
                              >
                                &nbsp; &nbsp; &nbsp; {client.policyAmount}
                              </td>

                              Document Link
                              <td
                                data-column-id="policy attachment"
                                style={{ textAlign: "center" }}
                              >
                                <i
                                  className="ri-pushpin-fill"
                                  style={{
                                    color: "#405189",
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={client.policyAttachment}
                                ></i>
                              </td>

                              Edit and Delete Actions
                              <td>
                                <div
                                  className="d-flex gap-2 justify-content-center"
                                  style={{ textAlign: "-webkit-center" }}
                                >
                                  Edit Button
                                  <div className="edit">
                                    {console.log("Client ID:", clients.id)}
                                    <Link
                                      to={`/policy-update-form/${client._id}`}
                                      onClick={() =>
                                        handleMenuClick("Update policy")
                                      }
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-edit-2-line"></i>
                                    </Link>
                                  </div>

                                  Delete Button
                                  <div className="remove">
                                    <Link
                                      onClick={() => handleDelete(client)}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i className="ri-delete-bin-2-line"></i>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{
                                      width: "75px",
                                      height: "75px",
                                    }}
                                  ></lord-icon>
                                  <h5
                                    className="mt-2"
                                    style={{
                                      fontSize: "16.25px",
                                      color: "#495957",
                                    }}
                                  >
                                    Sorry! No Result Found
                                  </h5>
                                  <p
                                    className="text-muted mb-0"
                                    style={{
                                      fontSize: "13px",
                                      color: "#878A99",
                                    }}
                                  >
                                    We've searched more than 150+ Orders. We did
                                    not find any orders for your search.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade zoomIn"
          id="deleteRecordModal"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ borderBottom: "none" }}>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="btn-close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mt-2 text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/gsqxdxog.json"
                    trigger="loop"
                    colors="primary:#f7b84b,secondary:#f06548"
                    style={{ width: "100px", height: "100px" }}
                  ></lord-icon>
                  <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you Sure?</h4>
                    <p class="text-muted mx-4 mb-0">
                      Are you sure you want to remove this record?
                    </p>
                  </div>
                </div>
                <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                  <button
                    type="button"
                    class="btn w-sm btn-light close-btn"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn w-sm btn-danger remove"
                    id="delete-record"
                  >
                    Yes, Delete It!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
