// SERVER DECLARATION

const httpServer = require("http").createServer();
const io =require("socket.io")(httpServer, {
  cors: { origin: ["http://137.184.74.124", "http://passguardian.tech"],methods: ["GET", "POST"] }
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
  var requestgpt = `Generate a list of three secure passwords from words that are related with the keyword ${length}. Feel free to use any character types.`

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
  if (symbols == false){
    response = response.replace(/[^a-zA-Z0-9 ]/g, "");
  }
  if (numbers == false){
    response = response.replace(/[0-9]/g, "");
  }
  response = response.replace("1.", "");
  response = response.replace("2.", "");
  response = response.replace("3.", "");
  return response;
}

async function evaluatePassword(password) {
  var response = false;
  var length = password.length;
  var requestgpt = `how can the password ${password} be improved?`;

  console.log(requestgpt)
  var gpt = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: requestgpt,
    temperature: 0.2,
    max_tokens: 512,
  });
  response = gpt.data.choices[0].text;
  console.log(response);
  return response;
}

// EVENTS

io.on("connection", (socket) => {
    socket.on("Generate",async(length,uppercase,symbols,numbers, callback) => {
    const result = await generatePassword(length,uppercase,symbols,numbers);
    console.log(result);
    callback({status: result});
    });
    socket.on("Evaluate",async(password, callback) => {
      const result = await evaluatePassword(password);
      callback({status: result});
      });
});

// PORT CONFIG + ON READY LOG
console.log("Server : OK");
httpServer.listen(3000);