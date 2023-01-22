const socket = io("http://137.184.74.124:3000");


function submitGenerate(length,uppercase,symbols,numbers){
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").innerHTML = "Loading...";
    socket.emit("Generate", length,uppercase,symbols,numbers, (response) => {
        var arrayPassword = response.status.split(',');
        document.getElementById("output").innerHTML = "";
        for (var i = 0; i < arrayPassword.length; i++) {
            var paragraph = document.createElement("p");
            var text = document.createTextNode(arrayPassword[i]);
            paragraph.appendChild(text);
            document.getElementById("output").appendChild(paragraph);
        }
        
    });

}
