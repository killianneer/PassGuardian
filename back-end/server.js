// SERVER DECLARATION

const httpServer = require("http").createServer();
const io =require("socket.io")(httpServer, {
  cors: { origin: "http://137.184.74.124",methods: ["GET", "POST"] }
});

// LIBRARY DECLARATION

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// FUNCTIONS

async function generatePassword(length,uppercase,symbols,numbers) {
  var response = false;
  var requestgpt = `Generate 5 passwords seperated by commas of different formats with the following caracteristics : length of ${length},`
  if (uppercase == true){
    requestgpt += ` with uppercase letters,`
  }
  if (symbols == true){
    requestgpt += ` with symbols,`
  }
  if (numbers == true){
    requestgpt += ` with numbers.`
  }

  console.log(requestgpt)
  response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.7,
    max_tokens: 256,
  });
  setTimeout(() => {  console.log(response["data"]["choices"][0]["text"]);return response["data"]["choices"][0]["text"] }, 10000);
}


// EVENTS

io.on("connection", (socket) => {
    socket.on("Generate",async(length,uppercase,symbols,numbers, callback) => {
    console.log("kss ert el dans le serveur")
    var result = await generatePassword(length,uppercase,symbols,numbers);
    callback({status: result});
    });

});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);