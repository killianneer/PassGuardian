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
        if (password.charAt(i) == password.charAt(i).toUpperCase()) {
            containsUppercase = true;
            break;
        }
    }
    var numberofPos = 26;
    if (containsSpecialChar == true){
        numberofPos += 32;
    }
    if (containsNumber == true){
        numberofPos += 10;
    }
    if (containsUppercase == true){
        numberofPos += 26;
    }
    var time = Math.pow(numberofPos,password.length)/1000000000;
    time = (((time/3600)/24)/365);
    
    console.log(time);

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");
    var progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    progressBar.appendChild(progress);
    document.getElementById("output").appendChild(progressBar);
    var id = setInterval(frame, 10);
    var width = 0;
    var percentage = (time/2)*100;
    if (percentage > 100){
        percentage = 100;
    }
    function frame() {
        if (width >= percentage) {
            clearInterval(id);
        } else {
            width++;
            progress.style.width = width + "%";
        }
    }

    socket.emit("Evaluate", password, (response) =>{
        console.log(response.status);
    });
}
