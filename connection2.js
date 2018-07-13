const mysql = require('async-mysql');
const bcrypt = require('./bcrypt/bcryptfile.js');

// Connection with database
async function connection() {
  try {
    global.con = await mysql.connect({
      host: "localhost",
      user: "root",
      passwsord: "",
      database: "Database"
    });
  //   con.connect(function(err){
  //     if(err){
  //         throw err;
  //     }
  //     else{
  //         console.log("connected");
  //         schema.schema.createusers_Table();
  //         schema.schema.createdriver_Table();
  //         schema.schema.createadmin_Table();
  //         schema.schema.createotp_Table();
  //         schema.schema.bookingaddress();
  //         schema.schema.booking();
          
  //     }
  
  // })

    console.log("msql connection success..");
    const name ="Rahul"
        const email = "rahulmishra5596@gmail.com"
        const phone_no= "+8279916623"
        let password = "rahul"
        const hash =  await bcrypt.encryptPassword(password)
        password = hash

        const name1="Mishra"
        const email1 = "mishra@gmail.com"
        const phone_no1 = "+8279916623"
        let password1 = "12345"
        const hash1 =  await bcrypt.encryptPassword(password)
        password1 = hash
        
        const created_at = new Date();
        const a=await  con.query(`INSERT INTO admin (name,email,password,phone_no,created_at)
        SELECT * FROM (SELECT ?,?,?,?,?) AS tmp
        WHERE NOT EXISTS (SELECT name FROM admin WHERE name = ?) LIMIT 1;`,[name,email,password,phone_no,created_at,name])

        const a1=await  con.query(`INSERT INTO admin (name,email,password,phone_no,created_at)
        SELECT * FROM (SELECT ?,?,?,?,?) AS tmp
        WHERE NOT EXISTS (SELECT name FROM admin WHERE name = ?) LIMIT 1;`,[name1,email1,password1,phone_no1,created_at,name1])

    
  }
  catch (err) {
    console.log(err)
    throw (err);
  }
}
//connection();

module.exports =
  {
    connect: connection
  }
