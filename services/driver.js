const connection1 = require('../connection1.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('../bcrypt/bcryptfile');
const async = require('async');
module.exports = {
  checkmail: async (email) => {
    // console.log(email)
    try {
      const result = await con.query("SELECT * FROM driver WHERE email = ?", [email])
      //console.log(result);
      return result;
    }
    catch (err) {
      console.log(err);
      throw err;
    }

  },
  driverBookingJoin:async(bookingaddress_id)=>
 {
    const a =await con.query("SELECT * FROM booking INNER JOIN bookingaddress  ON booking.bookingaddress_id = bookingadress.bookingaddress_id WHERE bookingadress.bookingaddress_id = ?  limit 10 ",[bookingaddress_id])
    return a; 
 },
 getbookings:async(driver_id)=>
{
  try{ 
    const a= await con.query("SELECT * FROM  bookingaddress JOIN booking ON bookingaddress.bookingaddress_id=booking.bookingaddress_id JOIN users ON booking.user_id=users.user_id WHERE booking.driver_id=? ",[driver_id])
    return a;
  }catch(err)
  {
    
    throw err;
  }
},
checkBooking: async (id)=> 
{
    try{
   const a=  await con.query("SELECT * FROM booking WHERE booking_id = ?",[id])
   if(a.length>0){
     return a
   }
    else
    return "driver not found";
  }
catch(error){
  console.log(error)
  throw error
}
},
updateDriver:async (driver_id,booking_id)=> 
{
    try{
      const a=  await con.query("UPDATE booking SET driver_id = ? WHERE booking_id=?",[driver_id,booking_id])
      if(a.changedRows==1){
        const b =  await con.query("UPDATE booking SET booking_status = ? WHERE booking_id=?",["CONFIRMED",booking_id])
        return b
      }
      else{
        return "driver Aready Assigned";
      }
  }
catch(error){
  console.log(error)
  throw error
}
},
  checknumber: async (phone_no) => {
    //console.log(email)
    try {

      const result = await con.query("SELECT * FROM driver WHERE phone_no = ?", [phone_no])
      // console.log(result);
      return result;
    }
    catch (err) {
      console.log(err);
      throw err;
    }

  },

  addnewuser: async (body) => {
    try {
      body.password = await bcrypt.encryptPassword(body.password);
      const created_at = new Date();
      const result = await con.query("INSERT INTO driver (name,email,password,phone_no,age,created_at) VALUES (?,?,?,?,?,?)", [body.name, body.email, body.password, body.phone_no, body.age, created_at]);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  checkid: async (email) => {
    console.log(email)
    try {
      const a = await con.query("SELECT * FROM driver WHERE email = ?", [email])
      if (a.length > 0) {
        if (a[0].flag == 0) {
          const b = await con.query("UPDATE driver SET flag='1' WHERE flag='0'")
          return a
        }
        else
          return "driver Verified";
      }
      else
        return "driver not found";

    }
    catch (err) {
      console.log(err);
      throw err;
    }

  },
  genToken: async (body) => {
    try {
      // console.log(body);
      console.log(body[0].driver_id)
      var token = jwt.sign({ id: body[0].driver_id }, 'driver', {
        expiresIn: 86400 // expires in 24 hours
      });
      return token;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  idCheck: async (id) => {
    try {
      const a = await con.query("SELECT * FROM driver WHERE driver_id = ?", [id])
      if (a.length > 0) {
        return a
      }
      else
        throw "driver not found";
    }
    catch (error) {
      console.log(error)
      throw error
    }
  },
  verifyToken: async (token) => {
    try {
      console.log(token);
      const decode = await jwt.verify(token, "driver");

      console.log(decode);
      const newdriverid = decode.id;
      console.log(newdriverid + "..............");
      return newdriverid;
    } catch (err) {
      //console.log(e)
      throw (err);
    }
  },
}