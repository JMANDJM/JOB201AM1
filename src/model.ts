import { NextFunction } from "express";
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
firstName:String,
lastName:String,
prefix:String,
email:String,
phone:String,
location:String,
resumeUrl:String,
coverLetterUrl:String,
currentCompany:String,
currentTitle:String,
portfolioUrl:String,
howDidYouHear:String,
dateOfBirth:Date,
})
const Job = mongoose.model('JOb', schema);
export default Job