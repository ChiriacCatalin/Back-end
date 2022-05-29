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