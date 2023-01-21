// SERVER DECLARATION

const httpServer = require("http").createServer();
const io =require("socket.io")(httpServer, {
  // ...
});

// LIBRARY DECLARATION

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// FUNCTIONS

async function generatePassword(length,uppercase,symbols,numbers) {
  var requestgpt = `Generate 5 passwords seperated by commas of different formats with the following caracteristics : length of ${length},`
  if (uppercase == true){
    requestgpt += ` ${uppercase} uppercase letters,`
  }
  if (symbols == true){
    requestgpt += ` ${symbols} symbols,`
  }
  if (numbers == true){
    requestgpt += ` ${numbers} numbers.`
  }


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.7,
    max_tokens: 256,
  });
  return response;
}


// EVENTS

io.on("connection", (socket) => {
    socket.on("Generate",async(length,uppercase,symbols,numbers, callback) => {
    var result = await generatePassword(length,uppercase,symbols,numbers);
    callback({status: result});
    });

});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);