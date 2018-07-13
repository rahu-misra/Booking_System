const hapi = require('hapi');
const routes = require('./routes');
const async = require('async');
const connection1 = require('./connection1.js');
const connection2 = require('./connection2.js');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = hapi.server({
  port: 8080,
  host: 'localhost'
});

const swaggerOptions = {
  info: {
    title: 'Test API Documentation',
    version: '0.0.1'
  },
};
const init = async () => {
  try {

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);
    await server.start();
    console.log(`server running at port:${server.info.uri}`);
    await connection1.connect();
    await connection2.connect();
  }
  catch (error) {
    console.log(error);
    throw (error)
  }
}
init();

server.route(routes);
