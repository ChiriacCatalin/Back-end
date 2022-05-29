const express = require("express");
const userModel = require("../models/user");

exports.createUser = (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ successMessage: "User created" });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel.findUserById(userId).then(user => {
    if(!user){
      res.status(404).json({errorMessage: "User not found"});
    }
    else{
      res.status(200).json(user);
    }
  })
}

const defaultProfilePicture = 'https://picsum.photos/id/237/200/200';

exports.createUser = (req, res, next) => {
  const data = req.body;
  const userId = req.params.userId;
  userModel.postUser({ ...data, imageUrl: defaultProfilePicture }, userId).then(response => {
    if (!response) {
      res.status(500).json({ errorMessage: "User not created" });
    } else {
      res.status(201).json({ successMessage: "User created" });
    }
  });
};
