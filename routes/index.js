
   const user= require('./user.js');
   const driver= require('./driver.js');
   const admin= require('./admin.js');
   const  all = [].concat(user,driver,admin);
   module.exports = all;
 
 
 
   