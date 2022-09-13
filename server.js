const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const sqlite3=require('sqlite3').verbose();
const cors=require('cors')
const port = 3001;
const port2=3002;
const server = http.createServer(express);
const wss=new WebSocket.Server({server})
const db=new sqlite3.Database('./clientdata.db');

db.run(`CREATE TABLE IF NOT EXISTS messages(id NUMBER,message TEXT)`) 

wss.on('connection', function connection(ws,req) {
    ws.id=Math.floor((1 + Math.random()) * 0x10000);
    console.log(ws.id)
    const ip=req.socket.remoteAddress;
    console.log(`${ip} is now connected`)
  ws.on('message', function incoming(data) {
    const bytesString = String.fromCharCode(...data)
    db.run(`INSERT INTO messages(id,message) VALUES (?,?)`,[ws.id,bytesString],function(err){
      console.log(err)
    })
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {

        client.send(bytesString);


      }
    })
  })
})

//

const app = express();

app.use(cors());

app.get('/messages',(req,res)=>{
  let arr=[]
  db.all("SELECT * FROM messages", function(err, rows) {  
    rows.forEach(function (row) { arr.push(row) }) 
    res.send(arr)
  })
  console.log('there was a get req')
  

})


app.listen(port2)
server.listen(port)
console.log(port,port2)

//Math.floor((1 + Math.random()) * 0x10000))