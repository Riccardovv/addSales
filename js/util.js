"use strict";
function showMessage(message) {
	document.getElementById("message").innerHTML = message;
}

function showMessageInElement(id, message) {
	document.getElementById(id).innerHTML = message;
}

function cleanMessage() {
	document.getElementById("message").innerHTML = "";
}

function cleanMessageInElement(id) {
	document.getElementById(id).innerHTML = "";
}

function addMessage(message) {
	document.getElementById("message").innerHTML += message + "<br>";
}

function addMessageInElement(id, message) {
	document.getElementById(id).innerHTML += message + "<br>";
}

let reg1 = /\d+(Gb|Mb)/;
