/* chatserver server side code
responsible for running the server, 
handling requests and updating database */ 

const http = require('http')
const fs = require('fs')
const connection = require('./database/databaseConnector')
connection.connect()

function requestHandler(request, response){
	console.log(request.method, request.url)
	// show front-end on GET /
	if(request.method == 'GET'){
		if(request.url == '/'){
			response.writeHead(200, {"Content-Type" : "text/html"})
			fs.createReadStream("./index.html").pipe(response)
			//response.end()
		}
		else if(request.url == '/getMessages'){
			//send to db
			//build query
			var query = "SELECT * FROM tbl_chat_messages;"
			connection.query(query, function(error, result, column){
				if(error) console.log(error)
				else{
					var arr = []
					result = JSON.stringify(result)
					console.log(result)
					result = JSON.parse(result)
					for(var i in result){
						arr.push(result[i].message_body)
					}
				}
				response.writeHead(200, {"Content-Type" : "application/json"})
				response.write(JSON.stringify(result))
				response.end()
			})
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
		if(request.url == '/'){
			var body = []
			request.on('data', function(chunk) {
		  		body.push(chunk)
			})
			.on('end', function() {
				body = Buffer.concat(body).toString()
				// at this point, `body` has the entire request body stored in it as a string
				console.log(body)
				response.writeHead(200, {"Content-Type" : "text/html"})
				response.write("nice")
				response.end()
				//send to db
				//build query
				var query = "INSERT INTO tbl_chat_messages SET ?";
				var post = JSON.parse(body)
				post.sender_ip = request.connection.remoteAddress
				post.time = new Date(body.time)
				connection.query(query, post, function(error){
					if(error) console.log(error)
					else console.log("AOK")
				})
			})
		}
	}
	else{
		response.writeHead(400)
		response.write("Nope")
		response.end()
	}
}

http.createServer(requestHandler).listen(8888, '127.0.0.1')
console.log("server running")
