const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
function checkAuth() {
    document.getElementById("mainBody").visibility = "hidden";
    var expected = localStorage.getItem("expected");
    if(urlParams.get("auth") === null || expected == null) {
        alert("nice try mr goldstein");
        window.location.href = "../";
        return;
    }
    var sentAuthString = atob(urlParams.get("auth"));
    if(sentAuthString !== expected) {
        alert("nice try mr goldstein");
        window.location.href = "../";
    }
    document.getElementById("mainBody").visibility = "visible";
    localStorage.removeItem("expected");


}