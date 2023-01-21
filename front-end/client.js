const socket = io("http://137.184.57.78:3000");


function submitGenerate(length,uppercase,symbols,numbers){
    console.log("kss ert el dans le client")
    socket.emit("Generate", length,uppercase,symbols,numbers, (response) => {
        console.log(response);
    });

}
