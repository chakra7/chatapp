/* chatserver server side code
responsible for running the server, 
handling requests and updating database */ 

const http = require('http')
const fs = require('fs')

function requestHandler(request, response){
	console.log(request.method, request.url)
	// show front-end on GET /
	if(request.method == 'GET'){
		if(request.url == '/'){
			response.writeHead(200, {"Content-Type" : "text/html"})
			fs.createReadStream("./index.html").pipe(response)
			//response.end()
		}
		else if(request.url.includes('.js')){
			fs.readFile(__dirname + '/output/myCode.js', function (err, data) {
		        if (err) console.log(err)
		        response.writeHead(200, {'Content-Type': 'text/javascript'})
		        response.write(data)
		        response.end()
	      });
		}
		else{
			response.writeHead(404), {"Content-Type" : "text/plain"}
			response.write("not found")
			response.end()
		}
	}
	else if(request.method == 'POST'){
		response.writeHead(200)
		response.write("hoy vey")
		response.end()
	}
	else{
		response.writeHead(400)
		response.write("Nope")
		response.end()
	}
}

http.createServer(requestHandler).listen(8888)
console.log("server running")
