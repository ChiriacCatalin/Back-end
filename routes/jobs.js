const express = require("express");

const jobsController = require("../controllers/jobs");
const router = express.Router();

router.post("/companies/:companyId/job", jobsController.createJob);
router.get("/companies/:companyId/jobs", jobsController.getCompanyJobs);
router.get("/jobs", jobsController.getAllJobs);
router.delete("/job/:companyId/:jobId", jobsController.deleteJobById);
router.put("/job/:companyId/:jobId", jobsController.updateJobById);

router.post("/companies/:companyId/job/:jobId/applicants/:userId", jobsController.addApplicant);
router.get("/companies/:companyId/job/:jobId/applicants", jobsController.getAllJobAplicants);
router.delete("/companies/:companyId/job/:jobId/applicants/:userId", jobsController.deleteApplcantById);


router.get("/job/:jobId/applicants", jobsController.getAllAplicants); // for testing purposes

module.exports = router;
