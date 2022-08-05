const express = require("express");

const jobsController = require("../controllers/jobs");
const router = express.Router();

router.post("/companies/:companyId/job", jobsController.createJob);
router.get("/companies/:companyId/jobs", jobsController.getCompanyJobs);
router.get("/jobs", jobsController.getAllJobs);

module.exports = router;
