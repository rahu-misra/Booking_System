const twilio = require('twilio');
class Twilio{
static sendSms(receiver,body)
{
let TWILIO_PHONE_NUMBER="+(781) 790-4078";
let CELL_PHONE_NUMBER=receiver;

const client = new twilio("AC1cd864cba4f75f8571aad6fba9866463","963d911bc8cda1111e370a26658eb716");
  client.messages.create({
  from: TWILIO_PHONE_NUMBER,
  to: CELL_PHONE_NUMBER,
  body: body
}).then((message) => console.log(message.body))
return body
}

}

module.exports=Twilio;