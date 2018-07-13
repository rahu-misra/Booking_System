const joi = require('joi');
const controller = require('../controller');
const async = require('async');
module.exports = [
  {
    method: 'POST',
    path: '/users/signup',
    config: {
      tags: ['api'],
      validate: {
        payload: {

          name: joi.string().required(),
          email: joi.string().email().required().error(new Error('email is not valid')),
          password: joi.string().required(),
          phone_no: joi.string().error(new Error('phone number not valid')).required(),
          city: joi.string().required(),
          }
      },
      plugins: {
        "hapi-swagger": { payloadType: "form" }
      },


      handler: async (request, reply) => {
        try {
          console.log(request.payload);
          const userPayload = request.payload;
          const res = await controller.user.register(userPayload);
          return res;
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/users/otpverification',
    config: {
      tags: ['api'],
      validate: {
        payload: {
          email: joi.string().email().required().error(new Error('email is not valid')),
          otp: joi.number().required().error(new Error('otp not valid'))
          }
      },

      plugins: {
        "hapi-swagger": { payloadType: "form" }
      }
    },
    handler: async (request, reply) => {
      try {
        const userPayload = request.payload;
        const res = await controller.user.otpverify(userPayload);
        return res;
      }
      catch (err) {
        console.log(err);
      }
    }
  },

  {
    method: 'POST',
    path: '/users/login',
    handler: async (request, reply) => {
      try {
        const body = request.payload;
        const token = await controller.user.login(body);
        return token;
      } catch (err) {
        console.log(err)
        throw (err);
      }
    },
    config: {
      tags: ['api'],
      validate: {
        payload: {
          email: joi.string().email().required().error(new Error(' email not valid')),
          password: joi.string().required().error(new Error(' password not valid'))
        }
      },
      plugins: {
        "hapi-swagger": { payloadType: "form" }
      },
    }
  },
  {
    method:'POST',
    path:'/users/createbooking',
    config:{
      description: 'user creating a booking',
          tags: ['api'],
      validate:{
        headers:joi.object().keys({
                  'token': joi.string().required(),
                 }).unknown(),
        payload:{       
          source: joi.string().required(),
          destination: joi.string().required(),
          pickup_location : joi.string().required(),
          fare: joi.string().required(),
          vehicletype:joi.string().required()
        }
      },
  
  plugins:{
    "hapi-swagger":{payloadType:"form"}
  }
  },
    handler:  async (request, reply)=>{
      try {
        const token=request.headers.token;
          const userPayload = request.payload;
          const res= await controller.user.createbooking(userPayload,token);
          return res;
        }
          catch (err) {   
          console.log(err);
          throw (err);
      }
  }
  }
 
]
