const express = require("express");
const userModel = require("../models/user");
const utils = require("../util/functions");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel.findUserById(userId).then((user) => {
    if (!user) {
      res.status(404).json({ errorMessage: "User not found" });
    } else {
      res.status(200).json(user);
    }
  });
};

const defaultProfilePicture = "https://picsum.photos/id/237/200/200";

exports.createUser = (req, res, next) => {
  // console.log(req.body);
  const data = { ...req.body };
  utils.modifyVideoUrl(data);
  // console.log(data);
  const userId = req.params.userId;
  if (data.mainInfo.imageUrl === null) {
    data.mainInfo.imageUrl = defaultProfilePicture;
  }
  userModel.postUser({ ...data }, userId).then((response) => {
    if (!response) {
      res.status(500).json({ errorMessage: "User not created" });
    } else {
      res.status(201).json({ successMessage: "User created" });
    }
  });
};

exports.updateUserFields = (req, res, next) => {
  const fieldName = req.body.fieldName;
  const objData = req.body.obj;
  const userId = req.params.userId;
  userModel.updateUserFields(userId, fieldName, objData).then(response => {
    if (!response) {
      res.status(500).json({ errorMessage: "User data could not be updated!" });
    } else {
      res.status(201).json({ successMessage: "User data updated successfully!" });
    }
  })
};

exports.deleteUserFields = (req, res, next) => {
  const fieldName = req.body.fieldName;
  const objData = req.body.obj;
  const userId = req.params.userId;
  userModel.deleteUserFields(userId, fieldName, objData).then(response => {
    if (!response) {
      res.status(500).json({ errorMessage: "User data could not be removed!" });
    } else {
      res.status(200).json({ successMessage: "User data removed successfully!" });
    }
  })
};
