const async = require('async');
const bcrypt = require('../bcrypt/bcryptfile');
const services = require('../services');
const twilio = require('../twilio/twilio');
let otp = {};
module.exports = {

  register: async (body) => {
    try {

      let mail = await services.user.checkmail(body.email);
      if (mail.length == 0) {
        let result = await services.user.checknumber(body.phone_no);
        if (result.length == 0) {
          const a = await services.user.addnewuser(body);
          var randomotp = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
          otp.value = twilio.sendSms(body.phone_no, randomotp);
          return { StatusCode: 200, message: "user registered successful", data: body, otp: otp.value };
        }
        else {
          return "phone Exist";
        }

      }
      else {
        return "email Exit";
      }
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
  otpverify: async (body) => {
    try {

      const a = await services.user.checkid(body.email);

      if (body.otp == otp.value) {
        
        return { statuscode: 200, message: "otp verified" }
      }
      else
        return invalidOTP
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
  login: async (body) => {
    try {

      let status = await services.user.checkmail(body.email);
      console.log(status);
      if (status.length > 0) {
        let verify = status[0].flag;
        if (verify != 1)
          return ConstantMsg.otpnotverified;
        else {
          const check = await bcrypt.decryptPassword(body.password, status[0].password)
          //console.log("000000000", check)
          if (!check) {

            let tooken = await services.user.genToken(status)
            //console.log(a);

            return { statuscode: 200, message: "login successfull", data: status, token: tooken };
            //
          }
          else {
            return "invalid Credentials";
          }
        }
      }
      else {
        return "user Not Found";
      }
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  createbooking: async (body, token) => {
    try {
      // console.log(body,token);
      let a = await services.user.verifyToken(token);
      const obj = {
        vehicletype : body.vehicletype,
         fare : body.fare
       }
       const add = {
        source: body.source,
        destination : body.destination,
        pickup_location : body.pickup_location
    }
      const addressDetail = await services.user.addAddress(add);
      console.log('-----------------', addressDetail);
      const addressid = addressDetail.insertId
      if (addressDetail == null)
        return ConstantMsg.notInserted
      else {
        const bookingDetail = await services.user.insertbooking(obj, a, addressid);
        const data = {
          user_id: a,
          source: add.source,
          destination: add.destination,
          pickup_location: add.pickup_location,
          bookingaddress_id: addressid,
          fare: obj.fare,
          vehicletype: obj.vehicletype

        }
        return { statuscode: 200, message:"your booking is successfully done", data: data, token: token };
      }
    } catch (err) {
      console.log(err)
      throw (err);
    }
 
  }

}


