const joi = require('joi');
const controller = require('../controller');
const async = require('async');
module.exports = [
  {
    method: 'POST',
    path: '/driver/signup',
    config: {

      tags: ['api'],
      validate: {
        payload: {

          name: joi.string().required(),
          email: joi.string().email().required().error(new Error('email is not valid')),
          password: joi.string().required(),
          phone_no: joi.string().regex(/^[0-9]+$/).min(10).max(13).error(new Error('phone number is not valid')).required(),
          age: joi.number().required()
        }
      },
      plugins: {
        "hapi-swagger": { payloadType: "form" }
      },


      handler: async (request, reply) => {
        try {
          console.log(request.payload);
          const userPayload = request.payload;
          const res = await controller.driver.register(userPayload);
          return res;
        }
        catch (e) {
          console.log(e);
        }

      }
    }
  },
  {
    method: 'POST',
    path: '/driver/otpverification',
    config: {
      //description: 'verifying a driver via otp',
      tags: ['api'],
      validate: {
        payload: {
          otp: joi.number().required().error(new Error('otp is not valid')),
          email: joi.string().email().required().error(new Error('email is not valid')),
        }
      },

      plugins: {
        "hapi-swagger": { payloadType: "form" }
      }
    },
    handler: async (request, reply) => {
      try {
        const userPayload = request.payload;
        const res = await controller.driver.otpverify(userPayload);
        return res;
      }
      catch (e) {
        console.log(e);
      }
    }
  },

  {
    method: 'POST',
    path: '/driver/login',
    handler: (request, reply) => {
      const body = request.payload;
      const token = controller.driver.login(body);
      return token;
    },
    config: {
      tags: ['api'],
      validate: {
        payload: {
          email: joi.string().email().required().error(new Error('email is not valid')),
          password: joi.string().required().error(new Error('password is not valid'))
        }
      },
      plugins: {
        "hapi-swagger": { payloadType: "form" }
      },
    }
  },
  {
    method:'POST',
    path:'/driver/getbooking',
    config:{
          tags: ['api'],
      validate:{
        headers:joi.object().keys({
          'token': joi.string().required(),
         }).unknown(),
      },
  
  plugins:{
    "hapi-swagger":{payloadType:"form"}
  }
  },
    handler:  async (request, reply)=>{
      try {
        const token=request.headers.token;
          const res= await controller.driver.getbookings(token);
          return res;
        }
          catch (err) {   
          console.log(err);
          return err
      }
  }
  }
  ]
  

