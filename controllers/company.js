const companyModel = require("../models/company");
const utils = require("../util/functions");

const defaultProfilePicture = "https://storage.googleapis.com/licenta_image_files/default_profile.jpg";

exports.createCompany = (req, res, next) => {
  const data = { ...req.body };
  utils.modifyVideoUrl(data);
  const companyId = req.params.companyId;
  if (data.imageUrl === null) {
    data.imageUrl = defaultProfilePicture;
  }
  companyModel.postCompany({ ...data }, companyId).then((response) => {
    if (!response) {
      res.status(500).json({ errorMessage: "Company not created" });
    } else {
      res.status(201).json({ successMessage: "Company created" });
    }
  });
};

exports.getCompany = (req, res, next) => {
  const companyId = req.params.companyId;
  companyModel.findCompanyById(companyId).then((company) => {
    if (!company) {
      res.status(404).json({ errorMessage: "Company not found" });
    } else {
      res.status(200).json(company);
    }
  });
};


exports.updateCompanyFields = (req, res, next) => {
  const fieldName = req.body.fieldName;
  const objData = req.body.obj;
  utils.modifyVideoUrl(objData);
  const companyId = req.params.companyId;
  companyModel.updateCompanyFields(companyId, fieldName, objData).then(response => {
    if (!response) {
      res.status(500).json({ errorMessage: "Company data could not be updated!" });
    } else {
      res.status(201).json({ successMessage: "Company data updated successfully!" });
    }
  });
}