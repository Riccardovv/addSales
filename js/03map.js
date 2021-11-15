"use strict";

function workingWithMaps(){
	cleanMessage ();
	const myMap = new Map();

	let obj = {},
			f = function () {},
			str = "Text";

	// Asignar valores a un Map

	myMap.set(obj, "Valor con Object");
	myMap.set(f, "Valor con function");
	myMap.set(str, "Valor con string");

	addMessage(myMap.size); // 3

	// Obtener valores
	addMessage(myMap.get(obj)); //Valor con Object
	addMessage(myMap.get(f)); //Valor con function
	addMessage(myMap.get({})); //undefined

	// Borrar elementos
	myMap.delete(obj);
	addMessage(myMap.size); // 2
}

function iterateOverMapV1(){
	cleanMessage ();
	const myMap = new Map([[0, "cero"], [1, "uno"]]);
	// Iterando con for/of
	for (let [key, value] of myMap) {
		addMessage("Clave: " + key + " Valor: " + value);
	}
}

function iterateOverMapV2(){
	cleanMessage ();
	const myMap = new Map([[0, "cero"], [1, "uno"]]);
	// Iterando sobre arrays de claves y valores
	for (let key of myMap.keys()) {
		addMessage("Clave: " + key);
	}
	for (let value of myMap.values()) {
		addMessage("Valor: " + value);
	}
}

function iterateOverMapV3(){
	cleanMessage ();
	const myMap = new Map([[0, "cero"], [1, "uno"]]);
	// Iteramos sobre un array con las entradas.
	for (let [key, value] of myMap.entries()) {
		addMessage("Clave: " + key + " Valor: " + value);
	}
}

function iterateOverMapV4(){
	cleanMessage ();
	const myMap = new Map([[0, "cero"], [1, "uno"]]);
	// Iteramos sobre el método forEach
	myMap.forEach(function(value, key, m) {
		addMessage("Clave: " + key + " Valor: " + value);
	})
}
