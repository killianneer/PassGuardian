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
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate 5 passwords seperated by commas of different formats with the following caracteristics : length of ${length}, ${uppercase} uppercase letters, ${symbols} symbols and ${numbers} numbers.`,
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