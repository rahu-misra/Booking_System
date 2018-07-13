const async = require('async');
const bcrypt = require('../bcrypt/bcryptfile');
const services = require('../services');
const twilio = require('../twilio/twilio');
let otp = {};
module.exports = {

  register: async (body) => {
    try {

      let status = await services.driver.checkmail(body.email);
      //  console.log(status);
      //body.phone_no = body.phone_no;
      if (status.length == 0) {
        let result = await services.driver.checknumber(body.phone_no);
        if (result.length == 0) {


          const a = await services.driver.addnewuser(body);
          var randomotp = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
          otp.value = twilio.sendSms(body.phone_no, randomotp);
          return { StatusCode: 200, message: "driver added successfully", data: body, otp: otp.value };
        }
        else {
          return "phoneExist";
        }

      }
      else {
        return "emailExit";
      }
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  otpverify: async (body) => {
    try {

      const a = await services.driver.checkid(body.email);

      if (body.otp == otp.value) {
        // return response.sendOtpSuccess()
        return { statuscode: 200, message: "driver's otp verified" }
      }
      else
        return "invalidOTP";
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async (body) => {
    try {

      let status = await services.driver.checkmail(body.email);
      //console.log(status);
      if (status.length > 0) {
        let verify = status[0].flag;
        if (verify != 1)
          return "otp not verified";
        else {
          
          const check = await bcrypt.decryptPassword(body.password, status[0].password)
          // console.log("..................",check)
          if (!check) {
            let tooken = await services.driver.genToken(status)
            //console.log(tooken);

            return { statuscode: 200, message: "driver's login successfull", data: status, token: tooken };
            
          }
          else {
            throw "invalid Credentials";
          }
        }
      }
      else {
        throw "user Not Found";
      }
      }
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  getbookings:async(token)=>
    {
      try{
      const a=await services.driver.verifyToken(token);
      console.log(a+">>>>");
      const result= await services.driver.getbookings(a);
      if(result.length<1)
      {
        return "driver not assigned booking";
      }
      else
      return {statuscode:200,message:"get bookings done successfully",data:result,token:token};
      }
      catch(err)
      {
        
        throw(err);
      }
    }
  }


