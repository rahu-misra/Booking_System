const async = require('async');
const bcrypt = require('../bcrypt/bcryptfile');
const services = require('../services');
module.exports = {
    login: async (body) => {
        try {
            let status = await services.admin.checkmail(body.email);
            if (status.length == 0) {
                const responsedata = {
                    code: 400,
                    message: 'email does not exist'
                }
                return { code: responsedata.code, message: responsedata.message }
            }
            else {
                console.log(body.password, status[0].password)

                const check = await bcrypt.decryptPassword(body.password, status[0].password)
                if (!check) {
                    let tooken = await services.admin.genToken(status)
                    //console.log(tooken);

                    return { statuscode: 200, message: "login Success", data: status, token: tooken };
                }
                else {
                    const responsedata = {
                        code: 400,
                        message: 'password not valid'
                    }
                    return { code: responsedata.code, message: responsedata.message }
                }
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    },
    driverdetails: async (token, offset) => {
        try {

            const a = await services.admin.verifyToken(token);
            const data = await services.admin.driverdetails(offset);
            return { statuscode: 200, message: "these are the customer details", data: data, token: token };
        }
        catch (err) {
            console.log(err)
            throw err;
        }

    },
    customerdetails: async (token) => {
        try {

            const a = await services.admin.verifyToken(token);
            const data = await services.admin.customerdetails(token);
            return { statuscode: 200, message: "these are deatils of the user", data: data, token: token };
        }
        catch (err) {
            console.log(err)
            throw err;
        }

    },
    allbookings: async (token) => {
        try {

            const a = await services.admin.verifyToken(token);
            const data = await services.admin.allbookings(token);
            return { statuscode: 200, message: "these are all the details", data: data, token: token };
        }
        catch (err) {
            console.log(err)
            throw err;
        }

    },

    driverassign:async (body,token)=>
    {
      try{
    
    const a=await services.admin.verifyToken(token);
    const driver_id=body.driver_id;
    const booking_id=body.booking_id;
    const driver = await services.driver.idCheck(driver_id);
    const booking = await services.driver.checkBooking(booking_id);
    const driverupdate = await services.driver.updateDriver(driver_id,booking_id);
    
    const detail = await services.admin.driverBookingJoin(booking[0].bookingaddress_id)
    
    
    return {statuscode:200,message:"the driver is successfully assigned to the booking",data:detail,token:token};
    }
    catch(err)
    {
      console.log(err)
      throw err;
    }
    
    },




}