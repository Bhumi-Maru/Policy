import React from "react";
import Select from "react-select";

const companyOptions = [
  { value: "lic", label: "Life Insurance Corporation of India (LIC)" },
  { value: "hdfcLife", label: "HDFC Life" },
  { value: "iciciPrudential", label: "ICICI Prudential" },
  { value: "bajajAllianz", label: "Bajaj Allianz" },
  { value: "sbiLife", label: "SBI Life" },
  { value: "maxLife", label: "Max Life" },
  { value: "relianceLife", label: "Reliance Life" },
  { value: "tataAIALife", label: "Tata AIA Life" },
  { value: "adityaBirlaSunLife", label: "Aditya Birla Sun Life" },
  { value: "hdfcErgo", label: "HDFC ERGO" },
  { value: "starHealth", label: "Star Health and Allied Insurance" },
  { value: "newIndiaAssurance", label: "New India Assurance" },
  { value: "bhartiAXALife", label: "Bharti AXA Life" },
  { value: "kotakMahindraLife", label: "Kotak Mahindra Life" },
  { value: "bhartiAXAGeneral", label: "Bharti AXA General" },
  { value: "futureGenerali", label: "Future Generali India" },
];

const mainCategoryOptions = [
  { value: "lifeInsurance", label: "Life Insurance" },
  { value: "healthInsurance", label: "Health Insurance" },
  { value: "generalInsurance", label: "General Insurance" },
  { value: "generalInsurance", label: "Car Insurance" },
  { value: "generalInsurance", label: "Home Insurance" },
  { value: "generalInsurance", label: "Travel Insurance" },
];

const subCategoryOptions = [
  { value: "individualLife", label: "Individual Life Insurance" },
  { value: "healthInsurancePlan", label: "Health Insurance Plan" },
  { value: "childPlan", label: "Child Plan" },
  { value: "endowmentPlan", label: "Endowment Plan" },
  { value: "ulip", label: "Unit-Linked Insurance Plan (ULIP)" },
  { value: "pensionPlan", label: "Pension Plan" },
  { value: "termPlan", label: "Term Insurance Plan" },
  { value: "wholeLifeInsurance", label: "Whole Life Insurance Plan" },
  { value: "savingsPlan", label: "Savings Plan" },
  { value: "criticalIllnessPlan", label: "Critical Illness Plan" },
  { value: "motorInsurance", label: "Motor Insurance" },
  { value: "homeInsurance", label: "Home Insurance Plan" },
  { value: "groupInsurance", label: "Group Insurance Plan" },
];

export default function PolicyCategory() {
  return (
    <>
      <div
        className="page-content"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div
          className="container-fluid"
          style={{
            left: "120px",
            position: "relative",
            width: "80%",
          }}
        >
          <div className="row">
            <div className="col-xxl-6 col-lg-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Policy</h4>
                </div>
                <div className="card-body">
                  <div className="live-preview">
                    <form action="javascript:void(0);" className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="companyInput" className="form-label">
                          Company Policy :
                        </label>
                        <Select
                          options={companyOptions}
                          placeholder="Select Company Policy"
                          id="companyInput"
                        />
                      </div>

                      <div className="col-md-4">
                        <label
                          htmlFor="mainCategoryInput"
                          className="form-label"
                        >
                          Main Category :
                        </label>
                        <Select
                          options={mainCategoryOptions}
                          placeholder="Select Main Category"
                          id="mainCategoryInput"
                        />
                      </div>

                      <div className="col-md-4">
                        <label
                          htmlFor="subCategoryInput"
                          className="form-label"
                        >
                          Sub Category :
                        </label>
                        <Select
                          options={subCategoryOptions}
                          placeholder="Select Sub Category"
                          id="subCategoryInput"
                        />
                      </div>

                      <div
                        className="col-md-4 position-relative"
                        style={{ left: "33.5%" }}
                      >
                        <div>
                          <button
                            type="submit"
                            className="btn w-100 btn-submit"
                          >
                            Submit
                          </button>
                        </div>
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
