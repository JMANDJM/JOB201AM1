import express, { Express } from 'express'
module.exports = (app:Express) => {
var path = require('path');
var root = path.dirname(require.main.filename)
const ctrl = require(root + '/controller.js')
	app.post('/api/v1/job/', ctrl.create)
	app.get('/api/v1/job/:id/', ctrl.get)
    app.get('/api/v1/jobs/',  ctrl.list)
}