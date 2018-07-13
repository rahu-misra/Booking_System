const connection1=require('../connection1.js');
const jwt= require('jsonwebtoken');
const bcrypt=require('../bcrypt/bcryptfile');
const async=require('async');
module.exports={
    checkmail: async(email)=>
    {
        try{
const result= await con.query("SELECT * FROM admin where email=?",[email])
//console.log(result);
return result;
        }catch(err)
        {
            console.log(err)
            throw(err);
        }
    },
    genToken: async (body)=>{
        try{
        var token = await jwt.sign({ id: body[0].admin_id }, 'admin', {
           expiresIn: 86400 
         });
         return token;
       }
       catch(err)
       {
         console.log(err);
         throw err;
       }
     },
     verifyToken: async(token)=>
 {
   try{
   console.log(token);
  const decode=await jwt.verify(token,"admin");
console.log(decode);
  const newid=decode.id;
  return newid;
   }catch(err){
     console.log(err)
     throw(err);
   }
 },
 driverBookingJoin:async(bookingaddress_id)=>
 {
    const data =await con.query("SELECT * FROM booking INNER JOIN bookingaddress  ON booking.bookingaddress_id = bookingaddress.bookingaddress_id WHERE bookingaddress.bookingaddress_id = ?  limit 10 ",[bookingaddress_id])
    return data; 
 },
 driverdetails:async(offset)=>
 {
const data=await con.query("SELECT * FROM driver limit 50 offset ?",[offset.offset])
return data;
 },
 customerdetails:async(token)=>
 {
const data=await con.query("SELECT * FROM users")
return data;
 },
 allbookings:async(token)=>
 {
const data=await con.query("SELECT * FROM booking")
return data;
 }
}