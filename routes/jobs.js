const express = require("express");

const jobsController = require("../controllers/jobs");
const router = express.Router();

router.post("/companies/:companyId/job", jobsController.createJob);
router.get("/companies/:companyId/jobs", jobsController.getCompanyJobs);
router.get("/jobs", jobsController.getAllJobs);
router.delete("/job/:companyId/:jobId", jobsController.deleteJobById);
router.put("/job/:companyId/:jobId", jobsController.updateJobById);

module.exports = router;
