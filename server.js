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
  var requestgpt = `Generate three random sequences of characters of length ${length} that contains `
  if (uppercase == true){
    requestgpt += ` uppercase letters,`
  }
  if (uppercase == false){
    requestgpt += ' no uppercase letters,'
  }
  if (symbols == true){
    requestgpt += `,with symbols,`
  }
  if (symbols == false){
    requestgpt += ` ,no symbols,`
  }
  if (numbers == true){
    requestgpt += ` and numbers.`
  }
  if (numbers == false){
    requestgpt += `and no numbers.`
  }

  console.log(requestgpt)
  var gpt = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.6,
    max_tokens: 256,
  });
  response = gpt.data.choices[0].text;
  console.log(response);
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