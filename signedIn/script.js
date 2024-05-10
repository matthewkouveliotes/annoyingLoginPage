const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
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
function checkAuth() {
    if(urlParams.get("auth") === null) {
        alert("nice try you cheater");
        window.location.href = "../";
    }
    else {
        var sentAuthString = atob(urlParams.get("auth"));
        var authIndex = sentAuthString.indexOf("auth2=");
        var before = sentAuthString.substring(0, authIndex);
        var auth2 = sentAuthString.substring(authIndex + 6);
        var expectedAuth = localStorage.getItem("expected");
        if(expectedAuth == null) {
            window.location.href = "../";
            return;
        }
        if(auth2 !== expectedAuth) {
           alert("Incorrect Auth2");
           window.location.href = "../";
           return;
        }
        localStorage.removeItem("expected");
        if(!acceptedPasswords.includes(before)) {
            alert("nice try you cheater");
            window.location.href = "../";
            return;
        }

    }
}