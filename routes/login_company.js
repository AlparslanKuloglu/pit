const express =require('express')
const Company =require('../models/Company')
const bcrypt=require('bcryptjs')
const router=express.Router()
const jwt=require('jsonwebtoken')
const axios = require('axios')

//get authenticate
router.post('/authenticate',(req,res)=>{
    const {email,password}=req.body
    Company.findOne({
        email
    },
    (err,user)=>{
        if(err) throw err
        if(!user){
            res.json({
                message:'Authenticate faild , user not found.',
                status:500
            })
        } else {
            bcrypt.compare(password,user.password).then(result=>{
                if(!result)
                {
                    res.json({message:'Authentication faild , wrong password.',status:500})
                } else {
                    const payload={
                        email
                    }
                    const token = jwt.sign(payload,req.app.get('api_secret_key'))
                    res.json({
                        message:'Email and Password Correct',
                        token,
                        email
                    })
                }
            })
        }
    }
    )
})

//Post partner
router.post('/',async(req,res)=>{

    const {
        company_name,
        name,
        project_type,
        phone,
        email,
        password,
        people_count,
        project_status,
        contact
    }=req.body
    const salt=bcrypt.genSaltSync(5)
    if(password.length < 8)
    {
    res.json({message:'Password must be greater than eight'})
    } else if (password.length > 16)
    {
    res.json({message:'Password must be less than sixteen'})
    } else 
    {
    const key=await bcrypt.hash(password,salt)
        try {

    //authCode hazırlanımı
    const authCode = req.body.company_name[0] + req.body.email[0] + req.body.password[1] + name[1]


            const company =new Company({
                people_count,
                phone,
                company_name,
                name,
                project_type,
                project_status,
                contact,
                email,
                password:key,
                authCode: authCode,
                authStatu: 0
            })
            const promise=await company.save()
            console.log(promise)
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
            "receiverEmailAddress": `${email}`,
            "subject": "Wellcome - Pitgrowth",
            "content": `<!doctype html>
            <html ⚡4email data-css-strict>
            <head>
              <meta charset="utf-8">
              <meta name="x-apple-disable-message-reformatting">
              <style amp4email-boilerplate>body{visibility:hidden}</style>
              
                <script async src="https://cdn.ampproject.org/v0.js"></script>
              
              
                <style amp-custom>
                  .u-row {
              display: flex;
              flex-wrap: nowrap;
              margin-left: 0;
              margin-right: 0;
            }
            
            .u-row .u-col {
              position: relative;
              width: 100%;
              padding-right: 0;
              padding-left: 0;
            }
            
            
            .u-row .u-col.u-col-100 {
              flex: 0 0 100%;
              max-width: 100%;
            }
            
            
            @media (max-width: 767px) {
              .u-row:not(.no-stack) {
                flex-wrap: wrap;
              }
            
              .u-row:not(.no-stack) .u-col {
                flex: 0 0 100%;
                max-width: 100%;
              }
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
            
            p {
              margin: 0;
            }
            
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
            
            * {
              line-height: inherit;
            }
            
            table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
                </style>
              
              
            </head>
            
            <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: transparent;color: #000000">
              <!--[if IE]><div class="ie-container"><![endif]-->
              <!--[if mso]><div class="mso-container"><![endif]-->
              <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0">
              <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    <div style="text-align:center;line-height:0"><div style="border-top-width:0px;border-top-style:solid;border-top-color:#ffffff;width:94%;display:inline-block;line-height:0px;height:0px;vertical-align:middle"> </div></div>
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <amp-img
                    alt=""
                    src="./foto.png"
                    width="2406"
                    height="548"
                    layout="intrinsic"
                   
                    style="width: 100%;max-width: 2406px;"
                  >
                  
                  </amp-img>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <amp-img
                    alt=""
                    src="./foto.png"
                    width="300"
                    height="300"
                    layout="intrinsic"
                   
                    style="width: 100%;max-width: 300px;"
                  >
                  
                  </amp-img>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Hello  ${promise.company_name}</span></p>
            <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
            <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Welcome to Pitgrowth. 🏎</span></p>
            <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
            <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">We are so happy to join us. </span></p>
            <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
            <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">On this Pit, we have 7 pillars to grow your business for you and you can find, select and meet with executive partners on gear wheel. 🏁</span></p>
            <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
            
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
              <!--[if mso]><style>.v-button {background: transparent;}</style><![endif]-->
            <div align="center">
              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.pitgrowth.com/login.html" style="height:37px; v-text-anchor:middle; width:74px;" arcsize="11%"  stroke="f" fillcolor="#236fa1"><w:anchorlock/><center style="color:#ffffff;font-family:arial,helvetica,sans-serif;"><![endif]-->  
                <a href="https://www.pitgrowth.com/login.html" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;text-align: center;color: #ffffff; background-color: #236fa1; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; ">
                  <span style="display:block;padding:10px 20px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">Login</span></span>
                </a>
              <!--[if mso]></center></v:roundrect><![endif]-->
            </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    <div style="text-align:center;line-height:0"><div style="border-top-width:1px;border-top-style:solid;border-top-color:#BBBBBB;width:100%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div></div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:arial,helvetica,sans-serif;" align="left">
                    <div style="text-align:center;line-height:0px"><a href="https://www.instagram.com/pitgrowth/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:11px"><amp-img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png" width="32" height="32"/></a><a href="https://twitter.com/pitgrowth" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:11px"><amp-img src="./foto.png" width="32" height="32"/></a><a href="https://www.linkedin.com/company/pitgrowth" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:11px"><amp-img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png" width="32" height="32"/></a><a href="info@pitgrowth.com" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:0px"><amp-img src="https://cdn.tools.unlayer.com/social/icons/circle/email.png" width="32" height="32"/></a></div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    <div style="text-align:center;line-height:0"><div style="border-top-width:1px;border-top-style:solid;border-top-color:#BBBBBB;width:100%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div></div>
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
              <div style="padding: 0px;">
                <div style="max-width: 650px;margin: 0 auto;">
                  <div class="u-row">
                    
            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
              <div style="width: 100%;padding:0px;">
                
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <amp-img
                    alt=""
                    src="./foto.png"
                    width="2390"
                    height="222"
                    layout="intrinsic"
                   
                    style="width: 100%;max-width: 2390px;"
                  >
                  
                  </amp-img>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              </div>
            </div>
            
                  </div>
                </div>
              </div>
            
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
              </tbody>
              </table>
              <!--[if mso]></div><![endif]-->
              <!--[if IE]></div><![endif]-->
            </body>
            
            </html>
            `,
            "startDate": "",
            "finishDate": ""
          }
          }); 


        res.json(promise)

        } catch (error) {
        res.json(error)
        }
    }
})

module.exports=router