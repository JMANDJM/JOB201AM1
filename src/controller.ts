
import express, { Request, Response, NextFunction } from 'express'
import DBModel from './model'
const mongoose = require('mongoose');
export const create = (req: Request, res: Response) => {
    const newObj = new DBModel(req.body);
    newObj.save().then((savedDocument: any) => {
        res.send({ ...savedDocument, message: 'ok' })
    });
}
export const list = (req: Request, res: Response) => {
    DBModel.find({}).then(function (data: Array<Object>) {
        res.send(data)
    })
}
export const get = (req: Request, res: Response) => {
    let sid = req.params.id.length != 24 ? '000000000000000000000000' : req.params.id
    let id = mongoose.Types.ObjectId(sid)
    DBModel.findById(id).then(function (data: Array<Object>) {
        res.send(data)
    })
}