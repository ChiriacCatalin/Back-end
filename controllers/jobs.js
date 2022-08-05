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
  jobsModel.findAllJobs().then((response) => {
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ errorMessage: "Error getting the jobs from the cloud" });
    }
  });
};
