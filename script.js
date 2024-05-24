const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const lowercaseShuffle = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const uppercaseShuffle = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digitsShuffle = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "{", "]", "}", ":", ";", "\"", "'", "<", ",", ".", ">", "/", "?", "\\", "|"];
const symbolsShuffle = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "{", "]", "}", ":", ";", "\"", "'", "<", ",", ".", ">", "/", "?", "\\", "|"];

const acceptedPasswords = [
    "PaBo",
    "3yOK",
    "zv1C",
    "lJOnT",
    "47BKj",
    "a8nz1",
    "qUIWyL",
    "oRhbiL",
    "52E9Ui",
    "NnpWHGx",
    "9KMdmXR",
    "intPwBk",
    "FHPEJlC2",
    "6fcP7UkQ",
    "TwHQWnNO",
    "oKM6vOl24",
    "nAiWV5Ekw",
    "2WqRewZmk",
    "telSFm9WWi",
    "4ZGoTgREeM",
    "n3mD4Auz0G",
];
var realString = "";
const delay = ms => new Promise(res => setTimeout(res, ms));

const keyMap = new Map();
var changeAllowed = false;
var cheated = false;
function listener() {
    shuffle(lowercaseShuffle);
    shuffle(uppercaseShuffle);
    shuffle(digitsShuffle);
    shuffle(symbolsShuffle);
    spin()

    for(var i = 0; i < lowercase.length; i++) {
        keyMap.set(lowercase[i], lowercaseShuffle[i]);
    }
    for(var i = 0; i < uppercase.length; i++) {
        keyMap.set(uppercase[i], uppercaseShuffle[i]);
    }
    for(var i = 0; i < digits.length; i++) {
        keyMap.set(digits[i], digitsShuffle[i]);
    }
    for(var i = 0; i < symbols.length; i++) {
        keyMap.set(symbols[i], symbolsShuffle[i]);
    }
    document.getElementById("password").addEventListener("keydown", async (event) => {
        changeAllowed = true;
        var box = document.getElementById("passwordInput");
        if (keyMap.get(event.key) != null) {
            var keyPress = keyMap.get(event.key);
            event.preventDefault();
            document.getElementById("password").value += keyPress;
            realString += keyPress;
        }
        else if(event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            return;
        }
        if(event.key === "Shift") {
            return;
        }
        else if(event.key === "Backspace") {
            event.preventDefault();
            var val =document.getElementById("password").value
            document.getElementById("password").value = val.substring(0, val.length-1);
            realString = realString.substring(0, realString.length - 1);
        }

        var mL = Math.random() * 210 - 110;
        var mT = Math.random() * 10;
        box.style.marginLeft = mL + "%";
        box.style.marginTop = mT + "vh";


    });
    document.getElementById("password").addEventListener("keyup", (event) => {
        changeAllowed = false;
    })
    document.getElementById("password").addEventListener("input", (event) => {
        if(!changeAllowed) {
            cheated = true;

        }
    });
    document.getElementById("password").addEventListener("paste", (event) => {
        cheated = true;
    })
}

function shuffle(array) {
    for(var i = array.length -1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function darkMode() {
    var url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D";
    for(var i = 0; i < 5; i++) {
        window.open(url, '_blank');
    }
}

function signIn() {
    if(document.getElementById("password").value !== realString) {
        cheated = true;
    }

    if(acceptedPasswords.includes(document.getElementById("password").value)) {
        if(cheated) {
            alert("Try it again, without cheating...");
            window.location.href = window.location.href;
            return;
        }
        var varAuth = randomString(15);
        localStorage.setItem("expected", varAuth);
        var authString = btoa(document.getElementById("password").value + "auth2=" + varAuth);

        window.location.href = "signedIn/?auth=" + authString;
    }
    else {
        if(cheated) {
            alert("You cheated and still got the wrong password?");
            return;
        }
        alert("Incorrect Password");
    }
}

function randomString(length) {
    var allChars = lowercase.concat(uppercase).concat(digits).concat(symbols);
    var string = "";
    for(var i = 0; i < length; i++) {
        var randomNumber = Math.trunc(Math.random() * allChars.length);
        string += allChars[randomNumber];
    }
    return string;
}

var currTransform = 0;
async function spin() {
    while(true) {
        document.getElementById("theBody").style.transform = "rotate(1deg)";
        await delay(2500);
        document.getElementById("theBody").style.transform = "rotate(-1deg)";
        await delay(2500);
    }
}

