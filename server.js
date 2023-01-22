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
  var firstFalse = false;
  var requestgpt = `Generate three secure passwords from words that are related with the keyword ${length}. Feel free to use any character types.`

  if (uppercase == false){
    if (firstFalse == false){
      requestgpt += "However, here's what you cannot use: "
      firstFalse = true;
    }
    requestgpt += ' , capital letters'
  }

  if (symbols == false){
    requestgpt += ` , non alphanumeric characters`
  }

  if (numbers == false){
    requestgpt += ` , numbers`
  }

  console.log(requestgpt)
  var gpt = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.62,
    max_tokens: 256,
  });
  response = gpt.data.choices[0].text;
  if (uppercase == false){
    response = response.toLowerCase();
  }
  return response;
}


// EVENTS

io.on("connection", (socket) => {
    socket.on("Generate",async(length,uppercase,symbols,numbers, callback) => {
    const result = await generatePassword(length,uppercase,symbols,numbers);
    console.log(result);
    callback({status: result});
    });

});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);