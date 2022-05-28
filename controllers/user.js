const express = require("express");
const userModel = require("../models/user");

exports.createUser = (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ successMessage: "User created" });
};
