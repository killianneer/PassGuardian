const socket = io("http://137.184.74.124:3000");


function submitGenerate(length,uppercase,symbols,numbers){
    console.log("kss ert el dans le client")
    socket.emit("Generate", length,uppercase,symbols,numbers, (response) => {
        //var arrayPassword = response.split(',');
        console.log(response.status);
    });

}
