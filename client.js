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
    document.getElementById("output").innerHTML = "";
    //check if password contains special characters
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    var containsSpecialChar = false;
    for (var i = 0; i < password.length; i++) {
        if (specialChars.indexOf(password.charAt(i)) != -1) {
            containsSpecialChar = true;
            break;
        }
    }
    // check if password contains numbers
    var containsNumber = false;
    for (var i = 0; i < password.length; i++) {
        if (!isNaN(password.charAt(i))) {
            containsNumber = true;
            break;
        }
    }
    // check if password contains uppercase
    var containsUppercase = false;
    for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 95) {
            containsUppercase = true;
            break;
        }
    }
    var numberofPos = 26;
    if (containsSpecialChar == true){
        console.log("contains special char");
        numberofPos += 32;
    }
    if (containsNumber == true){
        console.log("contains number");
        numberofPos += 10;
    }
    if (containsUppercase == true){
        console.log("contains uppercase");
        numberofPos += 26;
    }
    var time = Math.pow(numberofPos,password.length)/2000000000;
    time = (((time/3600)/24)/365);
    
    console.log(time);

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");
    var progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    progressBar.appendChild(progress);
    document.getElementById("output").appendChild(progressBar);
    var percentage = (time/2)*100;
    if (percentage > 100){
        percentage = 100;
    }
    console.log(percentage);
    if (percentage <=30){
        progress.setAttribute("style", "background-color: #ff0000;");

    }
    else if (percentage <= 60){
        progress.setAttribute("style", "background-color: #ffff00;");
     }
    else
        {
        progress.setAttribute("style", "background-color: #00ff00;");
    }
    progress.style.width = percentage + "%";
    
    var paragraph = document.createElement("p");
    var text = document.createTextNode(`The password will take ${time} years to crack.`);
    paragraph.appendChild(text);
    document.getElementById("output").appendChild(paragraph);


    socket.emit("Evaluate", password, (response) =>{
            var paragraph = document.createElement("p");
            var text = document.createTextNode(response.status);
            paragraph.appendChild(text);
            document.getElementById("output").appendChild(paragraph);
    });
}
