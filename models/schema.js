//create tables

function createusers_Table(callback) {
    console.log("hi");
    let sql = "CREATE TABLE IF NOT EXISTS `users` (user_id int(10) NOT NULL  AUTO_INCREMENT PRIMARY KEY   ,name VARCHAR(10) NOT NULL, ,phone_no BIGINT(11) NOT NULL,email VARCHAR(30) NOT NULL ,password VARCHAR(15) NOT NULL, flag INT(2) NOT NULL DEFAULT '0',created_at TIMESTAMP(6) );"
    console.log('user table created');
    return DATABASE.query(sql, callback);
}

function createdriver_Table(callback) {
    //console.log("hi");
    let sql = "CREATE TABLE IF NOT EXISTS `driver` (driver_id int(10)  NOT NULL  AUTO_INCREMENT PRIMARY KEY  ,name VARCHAR(10) NOT NULL,phone_no BIGINT(11)NOT NULL,email VARCHAR(30) NOT NULL,password VARCHAR(15) NOT NULL,age VARCHAR(10) NOT NULL,flag INT(2) NOT NULL DEFAULT '0',created_at TIMESTAMP(6));"
    console.log(' driver table created');
    return DATABASE.query(sql, callback);
}


function createadmin_Table(callback) {
    //console.log("hi");
    let sql = "CREATE TABLE IF NOT EXISTS `admin` ( admin_id int(10) NOT NULL AUTO_INCREAMENT PRIMARY KEY  ,name VARCHAR(10) NOT NULL,phone_no BIGINT(11) NOT NULL,email VARCHAR(30) NOT NULL,password VARCHAR(15) NOT NULL,created_at TIMESTAMP(6));"
    console.log(' admin table created');
    return DATABASE.query(sql, callback);
}

function createotp_Table(callback) {
    //console.log("hi")
    let sql = "CREATE TABLE IF NOT EXISTS `Otp_detail` ( user_id int(10) NOT NULL  AUTO_INCREMENT PRIMARY KEY  ,mobile BIGINT(11) NOT NULL,verification_code INT(20) NOT NULL,verified VARCHAR(15) NOT NULL,date TIMESTAMP(6));"
    console.log('otp table created')
    return DATABASE.query(sql, callback)

}



async function bookingaddress(callback) {
    console.log("hi");
    // let mysql = "CREATE TABLE IF NOT EXISTS `bookingaddress` (address_id INT(10) NOT NULL AUTO_INCREMENT  PRIMARY KEY,booking_id INT(10) NOT NULL,source VARCHAR(20),destination VARCHAR(20) NOT NULL,created_at TIMESTAMP(6),FOREIGN KEY (booking_id) REFERENCES booking(booking_id))";
    // console.log('address_detail created');
   console.log('hi');
    let mysql = "CREATE TABLE IF NOT EXISTS `bookingaddress` (bookingaddress_id INT(10) NOT NULL AUTO_INCREMENT  PRIMARY KEY,source VARCHAR(20),destination VARCHAR(20) NOT NULL,pickup_location VARCHAR(30) NOT NULL,date TIMESTAMP(6))";
    console.log('address_detail created');
    return con.query(mysql, callback);

}

async function booking(callback) {
    console.log("hi");
    let mysql = "CREATE TABLE IF NOT EXISTS `booking` (booking_id INT(10) NOT NULL AUTO_INCREMENT  PRIMARY KEY,user_id INT(10) NOT NULL,address_id INT(10) NOT NULL ,driver_id INT(10) NOT NULL ,booking_type VARCHAR(20) NOT NULL,booking_name VARCHAR(20) NOT NULL,seat INT(20) NOT NULL,created_at TIMESTAMP(6),FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (address_id) REFERENCES Address_detail(address_id))";
    console.log('booking_detail created');
    return con.query(mysql, query);
}

