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
  var requestgpt = `Generate 3 long readable pass-phrase seperated by commas with the following charateristics : with a minimum of fifty characters,`
  if (uppercase == true){
    requestgpt += ` with uppercase letters,`
  }
  if (uppercase == false){
    requestgpt += ' without uppercase letters,'
  }
  if (symbols == true){
    requestgpt += ` with symbols,`
  }
  if (symbols == false){
    requestgpt += ` without symbols,`
  }
  if (numbers == true){
    requestgpt += ` with numbers.`
  }
  if (numbers == false){
    requestgpt += ` without numbers.`
  }

  console.log(requestgpt)
  var gpt = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.7,
    max_tokens: 256,
  });
  response = gpt;
  await new Promise(resolve => setTimeout(resolve, 500));
  return response;
}


// EVENTS

io.on("connection", (socket) => {
    socket.on("Generate",async(length,uppercase,symbols,numbers, callback) => {
    console.log("kss ert el dans le serveur")
    const result = await generatePassword(length,uppercase,symbols,numbers);
    console.log(result);
    callback({status: result});
    });

});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);