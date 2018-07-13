const connection1 = require('../connection1.js');
//const con=require('../connection2.js');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const bcrypt = require('../bcrypt/bcryptfile');
const jwtDecode = require('jwt-decode');
const async = require('async');
module.exports = {

  checkmail: async (email) => {
    try {

      const result = await con.query("SELECT * FROM users WHERE email = ?", [email])
      return result;
    }
    catch (err) {
      console.log(err);
      throw err;
    }

  },
  checknumber: async (phone_no) => {
    try {

      const result = await con.query("SELECT * FROM users WHERE phone_no = ?", [phone_no])
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
      const result = await con.query("INSERT INTO users (name,email,password,phone_no,city,created_at) VALUES (?,?,?,?,?,?)", [body.name, body.email, body.password, body.phone_no, body.city, created_at]);
      // console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  checkid: async (email) => {
    //console.log(email)
    try {
      const mail = await con.query("SELECT * FROM users WHERE email = ?", [email])
      // console.log(">>>>>"+a)
      if (mail.length > 0) {
        if (mail[0].flag == 0) {
          const change = await con.query("UPDATE users SET flag='1' WHERE flag='0'")
          return mail
        }
        else
          return "user is Verified";
      }
      else
        return "user Not Found";

    }
    catch (err) {
      console.log(err);
      throw err;
    }

  },
  genToken: async (body) => {
    try {
      // console.log(body);
      var token = await jwt.sign({ id: body[0].user_id }, 'key', {
        expiresIn: 86400 // expires in 24 hours
      });
      return token;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  verifyToken: async (token) => {
    try {
      console.log(token);
      const decode = await jwt.verify(token, "key");
      console.log(decode);
      const newid = decode.id;
      return newid;
    } catch (err) {
      console.log(err)
      throw (err);
    }
  },
  insertbooking: async (body, user_id, address_id) => {
    try {
      console.log(body)
      const result = await con.query("INSERT INTO booking (user_id,bookingaddress_id,fare,vehicletype) VALUES (?,?,?,?)", [user_id, address_id, body.fare, body.vehicletype]);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  addAddress: async (add) => {
    try {
      console.log(add);
      const created_at = new Date();
      const result = await con.query("INSERT INTO bookingaddress (source,destination,pickup_location,created_at) VALUES (?,?,?,?)", [add.source, add.destination, add.pickup_location, created_at]);
      //console.log(result);
      return result;
    }
    catch (err) {
      console.log(err)
      throw err;
    }
  },

  idCheck: async (checkingid) => {
    try {
      const result = await con.query("select * from users where user_id = ? ;", [checkingid]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}