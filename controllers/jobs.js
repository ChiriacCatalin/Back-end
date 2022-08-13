const { response } = require("express");
const jobsModel = require("../models/jobs");
const utils = require("../util/functions");

exports.createJob = (req, res, next) => {
  const companyId = req.params.companyId;
  let data = { ...req.body };
  utils.modifyVideoUrl(data);
  data.date = Date.now();
  jobsModel.createJob(companyId, data).then((response) => {
    if (!response) {
      res
        .status(500)
        .json({ errorMessage: "Job could not be uploaded to the cloud" });
    } else {
      res.status(201).json({ successMessage: "Job uploaded succesfuly" });
    }
  });
};

exports.getCompanyJobs = (req, res, next) => {
  const companyId = req.params.companyId;
  jobsModel.findJobsByCompanyId(companyId, null).then((response) => {
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ errorMessage: "Error getting the company jobs" });
    }
  });
};

exports.getAllJobs = (req, res, next) => {
  const lastDate = req.query.lastDate;
  jobsModel.findAllJobs(lastDate).then((response) => {
    if (response) {
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json({ errorMessage: "Error getting the jobs from the cloud" });
    }
  });
};

exports.deleteJobById = (req, res, next) => {
  const companyId = req.params.companyId;
  const jobId = req.params.jobId;
  jobsModel.deleteJobById(companyId, jobId).then((response) => {
    if (!response) {
      res.status(500).json({ errorMessage: "Job could not be removed!" });
    } else {
      res
        .status(200)
        .json({ successMessage: "Job data removed successfully!" });
    }
  });
};

exports.updateJobById = (req, res, next) => {
  const companyId = req.params.companyId;
  const jobId = req.params.jobId;
  let data = { ...req.body };
  utils.modifyVideoUrl(data);
  data.date = Date.now();
  jobsModel.updateJobById(companyId, jobId, data).then((response) => {
    if (!response) {
      res.status(500).json({ errorMessage: "Job could not be updated" });
    } else {
      res.status(201).json({ successMessage: "Job updated succesfuly" });
    }
  });
};
