const express = require("express");
const {
  addCompany,
  deleteCompany,
  updateCompany,
  getAllCompanyNames,
  getCompanyNameById,
} = require("../controllers/companyController");

const companyRouter = express.Router();

companyRouter.post("/company", addCompany);
companyRouter.delete("/company/:id", deleteCompany);
companyRouter.put("/company/:id", updateCompany);
companyRouter.get("/company", getAllCompanyNames);
companyRouter.get("/company/:id", getCompanyNameById);

module.exports = companyRouter;
