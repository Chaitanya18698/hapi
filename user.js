'user strict'
cont Hapi=require('@hapi/hapi');
const init=async()=>{
	const server=Hapi.server({
		port:8000,
		host:'localhost'
	})
	server.route({
		path='/',
		method='GET',
		handler:()
	})



}