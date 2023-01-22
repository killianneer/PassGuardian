const socket = io("http://137.184.74.124:3000");


function submitGenerate(length,uppercase,symbols,numbers){
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").innerHTML = "Loading...";
    socket.emit("Generate", length,uppercase,symbols,numbers, (response) => {
        console.log(response.status);
        var arrayPassword = response.status.split(' ');
        document.getElementById("output").innerHTML = "";
        for (var i = arrayPassword.length-1; i >= arrayPassword.length-3; i--) {
            var paragraph = document.createElement("p");
            var text = document.createTextNode(arrayPassword[i]);
            paragraph.appendChild(text);
            document.getElementById("output").appendChild(paragraph);
        }
        
    });

}

function submitEvaluate(password){
    socket.emit("Evaluate", password, (response) =>{
        console.log(response.status);
    });
}
