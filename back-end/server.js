// SERVER DECLARATION

const httpServer = require("http").createServer();
const io =require("socket.io")(httpServer, {
  // ...
});

// MYSQL CONNECTION DECLARATION

var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "123MonRayDanPauAnd",
  database: "card_game"
});

//MODULES DECLARATION

var bcrypt = require("bcryptjs");
const { verify } = require("crypto");


// FUNCTIONS
async function verifyLoginCredentials(username, password){
    var functionResult = false;
    if(username.length >= 2 && password.length >= 2){
        mysqlConnection.query("SELECT password FROM users WHERE username =?",[username], function(err, result, fields){
                 if (result.length > 0){
                         mysqlPassword = String(result[0].password);
                         functionResult = bcrypt.compareSync(password,mysqlPassword);
                 }
         })
   }
   await new Promise(resolve => setTimeout(resolve, 500));
   return functionResult;
}

async function submitSignUpCredentials(username, email, password){
  var functionResult = false;
  var newId;
  mysqlConnection.query("SELECT FOUND_ROWS() from users", function(err, result, fields){
    newId = result[0]['FOUND_ROWS()'];
  });
  var hashedPassword = bcrypt.hashSync(password,10);
  var insert = "INSERT INTO users (id, username, password, email, cards, coins) VALUES (?,?,?,?,?,?)";
  await new Promise(resolve => setTimeout(resolve, 500));
  mysqlConnection.query(insert, [newId, username, hashedPassword, email, '', 0], (error,result,fields) => {
    if(!error){
      functionResult = true;
    }
  })
  await new Promise(resolve => setTimeout(resolve, 500));
  return functionResult;
}

// EVENTS

io.on("connection", (socket) => {
    socket.on("userAuthSignUp",async(username, email, password, callback) => {
    var result = await submitSignUpCredentials(username, email, password);
    callback({status: result});
    });
    socket.on("userAuthLogin",async(username, password, callback) => {
    var result = await  verifyLoginCredentials(username,password);
      callback({status:result});
    });
});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);