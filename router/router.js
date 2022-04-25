const express = require('express')
const res = require('express/lib/response')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const {MemberModel, MemberSchema} = require('../model/db')
const async = require('async')
let result = {}

router.get("/submit",(req,res)=>{
    res.render("index",{path:"/schedule/submit"})
}).get('/search',(req,res)=>{
    res.render("index",{path:"/schedule/search"})
})

function addSchedule(day, dayName, memberName){
    if(day !== undefined) {
        for(const tmp of day){
            if(tmp.length == 1){
                day = [day]
            }
            break;
        }
    }else{
        day = []
    }
    test = ["sibal"]
    mon = "tue"
    MemberModel.findOneAndUpdate({name:memberName},{tue:test},(err,docs)=>{
        console.log(docs)
    })
}

router.post("/schedule/submit",(req,res)=>{
    let {mon,tue,wed,thr,fri,sat,sun,memberName} = req.body
    day = [mon,tue,wed,thr,fri,sat,sun]
    dayName = ["mon","tue","wed","thr","fri","sat","sun"]
    for(const i in day){
        if(day[i] !== undefined){
            for(const tmp of day[i]){
                if(tmp.length == 1) day[i] = [day[i]]
                break
            }
        }else day[i] = []
    }
    update = {
        "mon" : day[0],
        "tue" : day[1],
        "wed" : day[2],
        "thr" : day[3],
        "fri" : day[4],
        "sat" : day[5],
        "sun" : day[6]
    }
    MemberModel.findOneAndUpdate({name:memberName},update,(err,docs)=>{
        if(err)console.error(err)
    })
    res.redirect('/submit')
})

router.post("/schedule/search",(req,res)=>{
    let {mon,tue,wed,thr,fri,sat,sun} = req.body
    day = [mon,tue,wed,thr,fri,sat,sun]
    dayName = ["mon","tue","wed","thr","fri","sat","sun"]
    let nameList = []
    MemberModel.find({},(err,docs)=>{
        for(const m of docs){
            for(const i in day){
                console.log(i)
                if(day[i] == undefined) continue
                console.log(`Searching:${dayName[i]}...`)
                for(const tmp of day[i]){
                    if(tmp.length == 1){
                        day[i] = [day[i]]
                    }
                    break;
                }
                let available = m[dayName[i]]
                for(const j of available){
                    if(day[i].indexOf(j) != -1){
                        // console.log(`${m["name"]} is free on ${dayName} ${i}`)
                        nameList.push(m["name"].concat(" on ",dayName[i],":",available))
                        console.log(m["name"])
                    }
                }
            }
        }
        res.send(nameList)
    })
})

router.get('/members/all',(req,res)=>{
    MemberModel.find({},(err,docs)=>{
        if(docs !== undefined){
            res.send(docs)
        }
    })
})

router.post('/members/add',(req,res)=>{
    //중복검사 함수 추가
    let {memberName, pwd} = req.body
    newData = new MemberModel()
    newData.name = memberName
    newData.pwd = pwd
    newData.save()
})

router.get('/members/test',(req,res)=>{
    memberName = "이준수"
    pwd = "admin"
    newData = new MemberModel()
    newData.name = memberName
    newData.pwd = pwd
    newData.save()
    res.send(result)
})

router.get('/members/rename',(req,res)=>{
    MemberModel.replaceOne({name:req.query.name},{name:req.query.newName},(err,docs)=>{
        if(err)console.error(err)
        res.send(docs)
    })
})

module.exports = router