const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mymongo';
async function connection()
{
try
{
// Use connect method to connect to the server
 await  MongoClient.connect(url, function(err, response) {
  //assert.equal(null, err);
  console.log(" mongodb connection success");
  global.db = response.db(dbName);
  
});
}
catch(e)
{
  console.log(e);
  throw(e);
}
}

 module.exports={
  connect:connection
}
