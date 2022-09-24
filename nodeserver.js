/*
  Information:
    - Solid-js 
    - Babeljs
    - Nodejs API
    - http web server.

*/
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
// https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists


import { WebSocketServer } from 'ws';
import http from 'http';
import fs,{readFileSync} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Babel from '@babel/standalone';
import solid from 'babel-preset-solid';

const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(__dirname)

const PORT = process.env.PORT || 1337;

Babel.registerPreset("solid", solid());

function checkFileExistsSync(filepath){
  let flag = true;
  try{
    fs.accessSync(filepath, fs.constants.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
}

function headerJS(response,text){
  //response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.writeHead(200, {'Content-Type': 'text/javascript','Content-Length':text.length});
  response.write(text);
  response.end();
}

var server = http.createServer(function(request, response) {

  //check for url 

  if(request.url == "/"){
    //console.log("INDEX...")
    fs.readFile('./index.html',function (err, data){
      response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
      response.write(data);
      response.end();
    });
    return;
  }

  if(request.url == "/test.jsx"){
    //console.log("INDEX...")
    //var input = 'const getMessage = () => <div>"Hello World";</div>';
    var input = 'const getMessage = () => "Hello World";';
    var output = Babel.transform(input,{presets: ["solid"]}).code;
    console.log(output)
    response.writeHead(200, {'Content-Type': 'text/javascript'});
    response.write(output);
    response.end();
    return;
  }

  if(request.url.endsWith(".jsx")){
    console.log("found jsx")
    console.log(request.url)
    try{
      let output = readFileSync(join(__dirname, request.url));
      //console.log(output.toString())
      output = Babel.transform(output.toString(),{presets: ["solid"]}).code;
      headerJS(response, output)
      return;
    }catch(e){
      console.log(e)
    }
  }

  if(request.url.endsWith(".js")){
    //console.log("found css")
    //console.log(request.url)
    try{
      //let output = readFileSync(join(__dirname, request.url));
      fs.readFile(join(__dirname, request.url),function (err, data){
        headerJS(response, data)
      });
      return;
    }catch(e){
      console.log(e)
    }
  }

  if(request.url.endsWith(".css")){
    //console.log("found css")
    //console.log(request.url)
    try{
      //let output = readFileSync(join(__dirname, request.url));
      fs.readFile(join(__dirname, request.url),function (err, data){
        response.writeHead(200, {'Content-Type': 'text/css','Content-Length':data.length});
        response.write(data);
        response.end();
      });

      return;
    }catch(e){
      console.log(e)
    }
  }
  
  if(request.url.indexOf("/components/") == 0){
    console.log(request.url)
    //console.log(request.url.indexOf("/components/"))
    let ext = ".jsx";
    let checkJSX = checkFileExistsSync(join(__dirname, request.url)+".jsx")
    if(checkJSX){
      ext = ".jsx";
    }
    let checkJS = checkFileExistsSync(join(__dirname, request.url)+".js")
    if(checkJS){
      ext = ".js";
    }
    console.log("EXT:", ext)
    if(checkJSX){
      try{
        let output = readFileSync(join(__dirname, request.url+ext));
        //console.log(output.toString())
        output = Babel.transform(output.toString(),{presets: ["solid"]}).code;
        headerJS(response, output)
        return;
      }catch(e){
        console.log(e)
      }
    }
    if(checkJS){
      try{
        //let output = readFileSync(join(__dirname, request.url));
        fs.readFile(join(__dirname, request.url+ext),function (err, data){
          headerJS(response, data)
        });
        return;
      }catch(e){
        console.log(e)
      }
    }

  }

  response.end("Error");
});

/*
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log("connect?")
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
  ws.send('this is a websocket example');
});
*/

server.on('upgrade', function upgrade(request, socket, head) {
  //const { pathname } = parse(request.url);

  // This function is not defined on purpose. Implement it with your own logic.
  console.log('upgrade???', request.url);
  /*
  authenticate(request, function next(err, client) {
    if (err || !client) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, client);
    });
  });
  */
});


server.listen(PORT, function() {
  console.log((new Date()) + `\nServer is listening on port http://localhost:${PORT}`);
});