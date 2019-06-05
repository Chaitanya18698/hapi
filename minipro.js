var Hapi=require('hapi');

var MySQL=require('mysql');
require('dotenv').config()
const init=async()=>{

const server =  Hapi.Server({
     host: 'localhost',
     port: 8000
     });
   
// server.route({
//     method: 'GET',
//     path: '/api/PRODUCERS',
//     handler:(request,reply)=>{
//         return new Promise((resolve,reject)=>{
//         	 var connection = MySQL.createConnection({
//                 host     : process.env.DB_HOST,
//                 user     : process.env.DB_USER,
//                 password : process.env.DB_PASSWORD,
//                 database : process.env.DB_NAME
             
//         	});


//         		connection.connect();
//         		connection.query(`SELECT *FROM PRODUCERS`,
//         			function(errors,results,fields){
//         				if(errors) reject(errors)
//         					resolve(results);
//         			});
//         			connection.end();
//         });
//     }  

// });
server.route({
    method: 'POST',
    path: '/api/PRODUCERS',
    handler:(request,reply)=>{
        var newProducer=request.payload;
            var producername=request.payload.PRODUCER_NAME;
            var email=request.payload.EMAIL;
            var twitter_name=request.payload.TWITTER_NAME;
            var sound_cloud=request.payload.SOUND_CLOUD;



            
                if(producername.length>32)
                    return 'Producer name must be less than 32 characters';
                else if(producername.includes('XxXXStr8FirexXxX')==true)
                    return 'Enter a valid Name';
                else if(email.length>256)
                     return 'Email must be less than 256 char';
                else if(email.includes('@gmail.com')==false)
                    return 'Email must be valid';

                else if(twitter_name.length>16)
                    return 'length must be less than 16';
                else if(sound_cloud.length>32)
                     return 'must be less than 32';
                else
                {
                    return new Promise((resolve,reject)=>{
           
             var connection = MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });
         


               
                 connection.connect();
                connection.query(`INSERT INTO PRODUCERS(PRODUCER_NAME,EMAIL,PASSWORD_HASH,TWITTER_NAME,SOUND_CLOUD,PRODUCER_STATUS) VALUES('${newProducer.PRODUCER_NAME}','${newProducer.EMAIL}','${newProducer.PASSWORD_HASH}','${newProducer.TWITTER_NAME}','${newProducer.SOUND_CLOUD}','${newProducer.PRODUCER_STATUS}')`,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                            resolve(results);
                    });
                    connection.end();
                });
        };
    }  

});
// server.route({
//     method: 'GET',
//     path: '/api/PRODUCERS/{ID}',
//     handler:(request,reply)=>{
//         return new Promise((resolve,reject)=>{
//              var ID=request.params.ID;
//             var newID=request.payload;
           
//              var connection=MySQL.createConnection({
//                 host     : process.env.DB_HOST,
//                 user     : process.env.DB_USER,
//                 password : process.env.DB_PASSWORD,
//                 database : process.env.DB_NAME
             
//             });


//                 connection.connect();
//                 connection.query(`SELECT *FROM PRODUCERS  WHERE PRODUCERS_ID=${ID} `,
//                     function(errors,results,fields){
//                         if(errors) reject(errors)
//                         resolve(results)
//                     });
//                     connection.end();
//         });
//     }  

// });
server.route({
    method: 'DELETE',
    path: '/api/PRODUCERS/{ID}',
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
             var DID=request.params.ID;
           // var newID=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`DELETE FROM PRODUCERS WHERE PRODUCERS_ID=${DID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  

});
server.route({
    method: 'PUT',
    path: '/api/PRODUCERS/{ID}',
    handler:(request,reply)=>{
         var newProducer=request.payload;
            var producername=request.payload.PRODUCER_NAME;
            var email=request.payload.EMAIL;
            var twitter_name=request.payload.TWITTER_NAME;
            var sound_cloud=request.payload.SOUND_CLOUD;



            
                if(producername.length>32)
                    return 'Producer name must be less than 32 characters';
                else if(producername.includes('XxXXStr8FirexXxX')==true)
                    return 'Enter a valid Name';
                else if(email.length>256)
                     return 'Email must be less than 256 char';
                else if(email.includes('@gmail.com')==false)
                    return 'Email must be valid';

                else if(twitter_name.length>16)
                    return 'length must be less than 16';
                else if(sound_cloud.length>32)
                     return 'must be less than 32';
                else
                {
        return new Promise((resolve,reject)=>{
             var ID=request.params.ID;
           // var newID=request.payload;
           var newdata=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`UPDATE PRODUCERS SET PRODUCER_NAME='${newdata.PRODUCER_NAME}',PRODUCER_STATUS='${newdata.PRODUCER_STATUS}', EMAIL='${newdata.EMAIL}', TWITTER_NAME='${newdata.TWITTER_NAME}',SOUND_CLOUD='${newdata.SOUND_CLOUD}' WHERE PRODUCERS_ID=${ID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  

}

});


server.route({
    method:'GET',
    path:'/api/PRODUCERS/{ID}/approvedBEAT',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
            var ID=request.params.ID;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME                
            });
            connection.connect();
            connection.query(`SELECT * FROM BEAT WHERE PRODUCER_ID=${ID} AND APPROVED=1`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method: 'POST',
    path: '/api/BEAT',
    handler:(request,reply)=>{
        var newBeat=request.payload;
            var beatname=request.payload.BEAT_NAME;
            var url=request.payload.BEAT_URL;
            var apprvddate=request.payload.APPROVED_DATE;
            var apprvd=request.payload.APPROVED;
            var submitdate=request.payload.SUBMIT_DATE;
            var pdate=request.payload.POST_DATE;
            var pid=request.payload.PRODUCER_ID;


            if(beatname>64)
                return 'Name length must be less than 64'
            else if(beatname.includes('MUST LISTEN'))
                return 'unknown text'


            
                // if(producername.length>32)
                //     return 'Producer name must be less than 32 characters';
                // else if(producername.includes('XxXXStr8FirexXxX')==true)
                //     return 'Enter a valid Name';
                // else if(email.length>256)
                //      return 'Email must be less than 256 char';
                // else if(email.includes('@gmail.com')==false)
                //     return 'Email must be valid';

                // else if(twitter_name.length>16)
                //     return 'length must be less than 16';
                // else if(sound_cloud.length>32)
                //      return 'must be less than 32';
                else
                {
                    return new Promise((resolve,reject)=>{
           
             var connection = MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });
         


               
                 connection.connect();
                connection.query(`INSERT INTO BEAT(BEAT_NAME,BEAT_URL,APPROVED,SUBMIT_DATE,APPROVED_DATE,POST_DATE,PRODUCER_ID) VALUES('${beatname}','${url}','${apprvd}','${submitdate}','${apprvddate}','${pdate}','${pid}')`,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                            resolve(results);
                    });
                    connection.end();
                });
        };
    }  

});
server.route({
    method:'GET',
    path:'/api/BEAT/{ID}',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
            var ID=request.params.ID;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME                
            });
            connection.connect();
            connection.query(`SELECT * FROM BEAT WHERE BEAT_ID=${ID}`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method: 'DELETE',
    path: '/api/BEAT/{ID}',
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
             var DID=request.params.ID;
           // var newID=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`DELETE FROM BEAT WHERE BEAT_ID=${DID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  

});
server.route({
    method: 'PUT',
    path: '/api/BEAT/{ID}',
    handler:(request,reply)=>{
         var beatname=request.payload.BEAT_NAME;
         var url=request.payload.BEAT_URL;
         var submitdate=request.payload.SUBMIT_DATE;
           



            
                if(beatname.length>=32)
                    return 'Producer name must be less than 32 characters';
                else if(beatname.includes('MUST LISTEN'))
                    return 'unknown string'
                
                else
                {
        return new Promise((resolve,reject)=>{
             var ID=request.params.ID;
           // var newID=request.payload;
           var newdata=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`UPDATE BEAT SET BEAT_NAME='${newdata.beatname}',BEAT_URL='${newdata.url}', SUBMIT_DATE='${newdata.submitdate}' WHERE BEAT_ID=${ID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  

}

});
server.route({
    method:'GET',
    path:'/api/BEAT/submitted',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
            var ID=request.params.ID;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME
            });
            connection.connect();
            connection.query(`SELECT * FROM BEAT WHERE APPROVED=0`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method:'GET',
    path:'/api/BEAT/approved/{start}/{end}',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
       //     var ID=request.params.ID;
            var start=request.params.start;
            var end=request.params.end;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME
            });
            connection.connect();
            connection.query(`SELECT *FROM BEAT WHERE POST_DATE > '${start}' AND POST_DATE < '${end}'`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method:'GET',
    path:'/api/BEAT/posted/{start}',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
       //     var ID=request.params.ID;
            var start=request.params.start;
            //var curr=request.params.curr;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME
            });
            connection.connect();
            connection.query(`SELECT *FROM BEAT WHERE POST_DATE > '${start}' AND POST_DATE<CURRENT_DATE() AND APPROVED=1`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method:'GET',
    path:'/api/BEAT/pending',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
       //     var ID=request.params.ID;
            // var start=request.params.start;
            // var end=request.params.end;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME
            });
            connection.connect();
            connection.query(`SELECT *FROM BEAT WHERE APPROVED_DATE >  CURRENT_DATE() AND APPROVED=1`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method:'GET',
    path:'/api/PRODUCERS/{ID}/submittedbeats',
    handler:(request,reply)=>{
       
        return new Promise((resolve,reject)=>{
            var ID=request.params.ID;

            var connection=MySQL.createConnection({
               host: process.env.DB_HOST,
               password:process.env.DB_PASSWORD,
               user:process.env.DB_USER,
               database:process.env.DB_NAME                
            });
            connection.connect();
            connection.query(`SELECT BEAT_NAME,PRODUCER_NAME FROM BEAT INNER JOIN PRODUCERS ON PRODUCERS.PRODUCERS_ID=BEAT.PRODUCER_ID WHERE PRODUCERS_ID='${ID}'`,
            function(errors,results,fields){
                if(errors) reject(errors)
                    resolve(results)
            
            });
            connection.end();
        });
        
    }
    

})
server.route({
    method: 'PUT',
    path: '/api/BEAT/{ID}/approve',
    handler:(request,reply)=>{
         var beatname=request.payload.BEAT_NAME;
         var url=request.payload.BEAT_URL;
         var submitdate=request.payload.SUBMIT_DATE;
         var aprovedate=request.payload.APPROVED_DATE;
         var postdate=request.payload.POST_DATE;

           



            
                // if(beatname.length>=32)
                //     return 'Producer name must be less than 32 characters';
                // else if(beatname.includes('MUST LISTEN'))
                //     return 'unknown string'
                
                // else
                // {
        return new Promise((resolve,reject)=>{
             var ID=request.params.ID;
           // var newID=request.payload;
           var newdata=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`UPDATE BEAT SET APPROVED=1,APPROVED_DATE='${aprovedate}',SUBMIT_DATE='${submitdate}',POST_DATE='${postdate}' WHERE BEAT_ID=${ID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  



});
server.route({
    method: 'PUT',
    path: '/api/BEAT/{ID}/unapprove',
    handler:(request,reply)=>{
         var beatname=request.payload.BEAT_NAME;
         var url=request.payload.BEAT_URL;
         var submitdate=request.payload.SUBMIT_DATE;
         var aprovedate=request.payload.APPROVED_DATE;
         var postdate=request.payload.POST_DATE;

           



            
                // if(beatname.length>=32)
                //     return 'Producer name must be less than 32 characters';
                // else if(beatname.includes('MUST LISTEN'))
                //     return 'unknown string'
                
                // else
                // {
        return new Promise((resolve,reject)=>{
             var ID=request.params.ID;
           // var newID=request.payload;
           var newdata=request.payload;
           
             var connection=MySQL.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
             
            });


                connection.connect();
                connection.query(`UPDATE BEAT SET APPROVED=0,APPROVED_DATE=NULL,SUBMIT_DATE=NULL,POST_DATE=NULL WHERE BEAT_ID=${ID} `,
                    function(errors,results,fields){
                        if(errors) reject(errors)
                        resolve(results)
                    });
                    connection.end();
        });
    }  



});
await server.start();
    console.log('Server running on %s',server.info.uri);
}
process.on('unhandledRejection',(err)=>{
    console.log(err)
    process.exit(1)
});
init();

