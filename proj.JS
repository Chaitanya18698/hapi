var Hapi=require('hapi');

var MySQL=require('mysql');

const init=async()=>{

const server =  Hapi.Server({
     host: 'localhost',
     port: 8000
     });
     const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'MP'
});
 
connection.connect();
   
};
server.route({
    method: 'GET',
    path: '/api/MP',
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
        	 var connection = MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
        	});
        		connect.connect();
        		connection.query('SELECT *FROM PRODUCERS',
        			function(errors,results,fields){
        				if(errors) reject(errors)
        					resolve(PRODUCERS);
        			};
        			connect.end();
        });
    }  

});
await server.start();
    console.log('Server running on %s',server.info.uri);

process.on('unhandledRejection',(err)=>{
    console.log(err)
    process.exit(1)
});
init();

