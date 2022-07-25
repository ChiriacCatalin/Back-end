const express = require("express");

const companyController = require("../controllers/company");
const router = express.Router();


router.get("/companies/:companyId", companyController.getCompany);
router.post("/companies/:companyId", companyController.createCompany);
router.put("/companies/:companyId", companyController.updateCompanyFields);


module.exports = router;
