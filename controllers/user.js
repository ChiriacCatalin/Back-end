const express = require("express");
const userModel = require("../models/user");
const utils = require("../util/funtions");


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
