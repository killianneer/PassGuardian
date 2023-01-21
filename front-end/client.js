const socket = io("http://159.203.59.82:3000");


function submitGenerate(length,uppercase,symbols,numbers){
    socket.emit("Generate", length,uppercase,symbols,numbers, (response) => {
        console.log(response);
    });

}