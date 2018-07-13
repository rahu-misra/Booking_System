const joi=require ('joi');
const controller =require('../controller');
const async=require('async');
module.exports=[
  
    {
        method:'POST',
        path:'/admin/login',
        handler: async  (request,reply)=>{
          try{
          const body=request.payload;
          const token=  await controller.admin.login(body);
          return  token;
          }catch(err)
          {
              console.log(err)
              throw err;;
          }
        },
        config:{
      
          tags: ['api'],
          validate:{
            payload:{
              email:joi.string().email().required().error(new Error('please insert valid email')),
              password:joi.string().required().error(new Error('please give password'))
            }
          },
          plugins:{
            "hapi-swagger":{payloadType:"form"}
          },
        }
      },
      {
        method:'POST',
        path:'/admin/get_driver_details',
        config:{
              tags: ['api'],
          validate:{
            headers:joi.object().keys({
                      'token': joi.string().required(),
                     }).unknown(),
                     payload:{       
                      offset:joi.number().required().default(10)
                      
                    }
          },
      
      plugins:{
        "hapi-swagger":{payloadType:"form"}
      }
      },
        handler:  async (request, reply)=>{//const userPayload = request.payload;
          try {
            const token=request.headers.token;
              const userPayload = request.payload;
              const res= await controller.admin.driverdetails(token,userPayload);
              return res;
            }
              catch (err) {   
              console.log(err);
              throw (err);
          }
      }
      },
      {
        method:'POST',
        path:'/admin/get_customer_details',
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
              const res= await controller.admin.customerdetails(token);
              return res;
            }
              catch (err) {   
              console.log(err);
              throw (err);
          }
      }
     
    },
    {
      method:'POST',
      path:'/admin/assign_driver',
      config:{
        //description: 'admin assigning a driver',
            tags: ['api'],
        validate:{
          headers:joi.object().keys({
                    'token': joi.string().required(),
                   }).unknown(),
          payload:{       
            booking_id:joi.string().required().error(new Error('booking_id is required')),
            driver_id:joi.string().required().error(new Error('driver_id is required'))
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
                const res= await controller.admin.driverassign(userPayload,token);
                return res;
              }
                catch (err) {   
                console.log(err);
                throw (err);
            }
        }
        },
      
        {
          method:'POST',
          path:'/admin/get_all_bookings',
          config:{
           // description: 'admin getting the details of driver,booking and customer',
                tags: ['api'],
            validate:{
              headers:joi.object().keys({
                        'token': joi.string().required(),
                       }).unknown(),
                       payload:{
                        offset:joi.number().required().error(new Error('please add some offsets'))
                      }
            },
        
        plugins:{
          "hapi-swagger":{payloadType:"form"}
        }
        },
          handler:  async (request, reply)=>{
            try {
              const token=request.headers.token;
                //const userPayload = request.payload;
                const res= await controller.admin.allbookings(token);
                return res;
              }
                catch (err) {   
                console.log(err);
                throw (err);
            }
        }
        }
]
     