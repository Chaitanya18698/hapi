'use strict';
const Hapi = require('@hapi/hapi');
//const MySQL=require('mysql');
var students=[
    {
    name:'chay',
    age:21,
    hobbies:'fawr'
    },
    {
    name:'mani',
    age:21,
    hobbies:'fr'
    },
    {
    name:'satghi',
    age:31,
    hobbies:'wr'
    },
    ]
    const init=async()=>{
const server =  Hapi.Server({
     host: 'localhost',
     port: 8000
 
 const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'chay'
});
 
connection.connect();
   
});
 


server.route({
    method: 'GET',
    path: '/',
    handler:(request,h)=>{
        return students;
    }  
});
server.route({
    method:'POST',
    path:'/',
    handler:(request,h)=>{
        var newStudent=request.payload;
        student.push(newStudent);
        return students;
    }
})

server.route({
    method:'PUT',
    path:'/{age}',
    handler:(request,h)=>{
        var age=request.params.age;
        var newname=request.payload.name
        var studenttobeUpdated=students.filter((student)=>
        {
            return student.age==age;
        })
        studenttobeUpdated[0].name=newname
        return studenttobeUpdated
    }
})
server.route({
    method:'DELETE',
    path:'/{age}',
    handler:(request,h)=>{
        var age=request.params.age;
    var latestStudent=students.filter((student)=>{
        return student.age!=age;
    })
    return latestStudent;
}

})
await server.start();
    console.log('Server running on %s',server.info.uri);
};
process.on('unhandledRejection',(err)=>{
    console.log(err)
    process.exit(1)
});
init();