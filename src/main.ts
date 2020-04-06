import mongoose, { Document, Model, Schema } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import moment from 'moment';
import morgan from 'morgan';
import fs from "fs";
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 10099
const http = require('http');
const server = http.createServer(app);
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '150mb',
    extended: true
}));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())
app.use("/uploads", express.static('uploads'));
app.use("/10099/api/v1/uploads", express.static('uploads'));
app.use(morgan('combined'))
mongoose.connect('mongodb://localhost:27017/job201', { useNewUrlParser: true, useUnifiedTopology: true });


var storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, 'uploads/')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        var uploadDir = `uploads/${req.body.name}`
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, `${req.body.name}/${moment().format('YYMMDD_HHmmss')}_${file.originalname}`)
    }
})

var upload = multer({
    storage: storage
})
const job = require('./router')(app)
app.post('/10030/api/v1/upload', upload.single('file'), function (req, res, next) {
    res.send({
        status: 'success',
        timestamp: moment(),
        file: req.file,
    })
    next()
})

server.listen(port, () => console.log(`express is running on port ${port}`))