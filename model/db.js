const mongoose = require('mongoose')

let db = {}

MemberSchema = new mongoose.Schema({
    name:String,
    pwd:String,
    mon:[String],
    tue:[String],
    wed:[String],
    thr:[String],
    fri:[String],
    sat:[String],
    sun:[String]
})

MemberModel = new mongoose.model('members',MemberSchema)

module.exports = {MemberSchema, MemberModel}