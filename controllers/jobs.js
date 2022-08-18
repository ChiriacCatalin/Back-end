const { response } = require("express");
const jobsModel = require("../models/jobs");
const userModel = require("../models/user");
const utils = require("../util/functions");

exports.createJob = (req, res, next) => {
  const companyId = req.params.companyId;
  let data = { ...req.body };
  utils.modifyVideoUrl(data);
  data.date = Date.now();
  data.filterCity = data.city.toLowerCase().replace(/\s+/g, " ").trim();
  data.fiterCompanyName = data.companyName
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  jobsModel.createJob(companyId, data).then((response) => {
    if (!response) {
      res
        .status(500)
        .json({ errorMessage: "Job could not be uploaded to the cloud" });
    } else {
      res.status(201).json({ successMessage: "Job uploaded successfully" });
    }
  });
};

exports.getCompanyJobs = (req, res, next) => {
  const companyId = req.params.companyId;
  const lastDate = req.query.lastDate;
  jobsModel.findJobsByCompanyId(companyId, lastDate).then((response) => {
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ errorMessage: "Error getting the company jobs" });
    }
  });
};

exports.getAllJobs = (req, res, next) => {
  jobsModel.findAllJobs(req.query).then((response) => {
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

  jobsModel.getAllJobAplicants(companyId, jobId).then((applicants) => {
    if (applicants) {
      for (const applicant of applicants) {
        jobsModel
          .deleteApplicantById(companyId, jobId, applicant.id)
          .then((_) => {});
      }
    }
    jobsModel.deleteJobById(companyId, jobId).then((response) => {
      if (!response) {
        res.status(500).json({ errorMessage: "Job could not be removed!" });
      } else {
        res
          .status(200)
          .json({ successMessage: "Job data removed successfully!" });
      }
    });
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

exports.addApplicant = (req, res, next) => {
  const companyId = req.params.companyId;
  const jobId = req.params.jobId;
  const userId = req.params.userId;
  let data = { ...req.body };
  utils.modifyVideoUrl(data);
  data.date = Date.now();
  userModel.findUserById(userId).then((user) => {
    if (!user) {
      res
        .status(500)
        .json({ errorMessage: "User data could not be found by the company" });
    } else {
      data.userId = userId;
      data.userProfile = user.mainInfo.imageUrl;
      data.userName = user.mainInfo.name;
      jobsModel
        .addApplicant(companyId, jobId, userId, data)
        .then((response) => {
          if (!response) {
            res
              .status(500)
              .json({ errorMessage: "Could not apply to the job" });
          } else {
            res
              .status(201)
              .json({ successMessage: "Successfully applied to the job" });
          }
        });
    }
  });
};

exports.getAllJobAplicants = (req, res, next) => {
  const companyId = req.params.companyId;
  const jobId = req.params.jobId;
  jobsModel.getAllJobAplicants(companyId, jobId).then((response) => {
    if (!response) {
      res
        .status(500)
        .json({ errorMessage: "Could not get all the applicants for the job" });
    } else {
      res.status(200).json(response);
    }
  });
};

exports.deleteApplcantById = (req, res, next) => {
  const companyId = req.params.companyId;
  const jobId = req.params.jobId;
  const userId = req.params.userId;
  jobsModel.deleteApplicantById(companyId, jobId, userId).then((response) => {
    if (!response) {
      res.status(500).json({ errorMessage: "Applicant could not be removed!" });
    } else {
      res
        .status(200)
        .json({ successMessage: "Applicant data removed successfully!" });
    }
  });
};

///for testing purposes
exports.getAllAplicants = (req, res, next) => {
  const jobId = req.params.jobId;
  jobsModel.getAllAplicants(jobId).then((response) => {
    if (!response) {
      res
        .status(500)
        .json({ errorMessage: "Could not get all the applicants" });
    } else {
      res.status(200).json(response);
    }
  });
};
