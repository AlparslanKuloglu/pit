const express =require('express')
const router=express.Router()
const Company = require('../models/Company')
const Partner = require('../models/Partner')
const Meeting =require('../models/Meeting')
const axios = require('axios')

// Get All Meetings 
router.get('/',async(req,res)=>{
    try {
        const promise=await Meeting.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by id
router.get('/:id',async(req,res)=>{
    try {
        const promise=await Meeting.findById(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by partner id
router.get('/partner/:id',async(req,res)=>{
    try {
        const promise=await Meeting.find({partner_id:req.params.id}).sort({created_at:1})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by company id
router.get('/company/:id',async(req,res)=>{
    try {
        const promise=await Meeting.find({company_id:req.params.id}).sort({created_at:1})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Post Meeting
router.post('/',async(req,res)=>{
    try {
        const meet=new Meeting(req.body)
        const promise=await meet.save()
        const partner = await Partner.findById(promise.partner_id)
        const company = await Company.findById(promise.company_id)
    
        if(partner && company){

            const accountId = 'eyJBZG1pbklkIjoiMzQ1MTMiLCJFbWFpbCI6InRhbGhhZWxtYWxpQHBpdGdyb3d0aC5jb20iLCJDdXN0b21lcklkIjoiQTgzOEI4OUMxQjVCNEJFRUJCQjU2NDYyOTMxNEE3MTkiLCJDb21wYW55SWQiOjUyNDczLCJJc0V4cHJlc3MiOnRydWV9'

            const tokenRequest =
            await axios('https://diyaccountapi.relateddigital.com/tokens'  , {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             data: {
              "email":"talhaelmali@pitgrowth.com",
              "password":"Theagaed987"
              }
           }); 
          
          
           const token = tokenRequest.data.tokenValue
          
          
           const sendMail =
           await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           },
           data: {
            "senderProfileId": 60857,
            "receiverEmailAddress": `${partner.email}`,
            "subject": "Meet Talebi",
            "content": `<h1>${company.company_name} ${promise.date} ${promise.time} tarihinde sizinle görüşme talep etti.<h1/>`,
            "startDate": "",
            "finishDate": ""
          }
          }); 



        }

        res.json(promise)
    } catch (error) {
        res.json("asd")
    }
})

//Update Meeting
router.put('/:id',async(req,res)=>{
    try {
        const exMeet = await Meeting.findById(req.params.id)
        const promise=await Meeting.findByIdAndUpdate(req.params.id,req.body,{new:true})
        const partner = await Partner.findById(promise.partner_id)
        const company = await Company.findById(promise.company_id)


        if(partner && company){

            const accountId = 'eyJBZG1pbklkIjoiMzQ1MTMiLCJFbWFpbCI6InRhbGhhZWxtYWxpQHBpdGdyb3d0aC5jb20iLCJDdXN0b21lcklkIjoiQTgzOEI4OUMxQjVCNEJFRUJCQjU2NDYyOTMxNEE3MTkiLCJDb21wYW55SWQiOjUyNDczLCJJc0V4cHJlc3MiOnRydWV9'

            const tokenRequest =
            await axios('https://diyaccountapi.relateddigital.com/tokens'  , {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             data: {
              "email":"talhaelmali@pitgrowth.com",
              "password":"Theagaed987"
              }
           }); 
          
          
           const token = tokenRequest.data.tokenValue


            
           if(!(promise.date===exMeet.date)){
            const sendMail =
            await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            data: {
             "senderProfileId": 60857,
             "receiverEmailAddress": `${company.email}`,
             "subject": "Meet Talebi",
             "content": `<h1>${partner.company_name}, ${exMeet.date} ${exMeet.time} tarihindeki görüşme talebinizi ${promise.date} ${promise.time} tarihiyle değiştirdi.<h1/>`,
             "startDate": "",
             "finishDate": ""
           }
           })} 



           if(promise.status==="Approved"){
            const sendMail =
            await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            data: {
             "senderProfileId": 60857,
             "receiverEmailAddress": `${company.email}`,
             "subject": "Meet Talebi",
             "content": `<h1>${partner.company_name}, ${exMeet.date} ${exMeet.time} tarihindeki görüşme talebinizi kabul etti.<h1/>`,
             "startDate": "",
             "finishDate": ""
           }
           })} 
          
          if(promise.status==="Denied"){
           const sendMail =
           await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           },
           data: {
            "senderProfileId": 60857,
            "receiverEmailAddress": `${company.email}`,
            "subject": "Meet Talebiniz Reddedildi",
            "content": `<h1>${partner.company_name}, ${exMeet.date} ${exMeet.time} tarihindeki görüşme talebinizi reddetti.<h1/>`,
            "startDate": "",
            "finishDate": ""
          }
          })} 

        }



        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Delete Meeting
router.delete('/:id',async(req,res)=>{
    try {
        const promise=await Meeting.findByIdAndDelete(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router