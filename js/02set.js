'use strict';

function workingWithSets(){
	cleanMessage ();
	//Nuevo objeto set.
	const mySet = new Set();

	//Añadimos elementos heterogéneos al set
	mySet.add(1);
	mySet.add(5);
	mySet.add('text');
	const o = {a: 1, b: 2};
	mySet.add(o);
	//Dos objetos diferentes con referencias diferentes
	mySet.add({a: 1, b: 2});

	//Tamaño del set
	addMessage (mySet.size); // 5

	//Existencia de elementos en el set

	addMessage (mySet.has(1)); //true
	addMessage (mySet.has(3)); //false
	addMessage (mySet.has('TEXT'.toLocaleLowerCase())); //true
	addMessage (mySet.has(o)); //true

	//Eliminar elementos
	mySet.delete(5);
	addMessage (mySet.has(5)); //false
	addMessage (mySet.size); // 4
	//No genera error eliminar un elemento no existente
	mySet.delete(11111);
}

function addElementsInSet(){
	cleanMessage ();
	//Crear un set a partir de un iterable
	const mySet = new Set([1,2,3]);
	addMessage (mySet.size); //3
	addMessage (mySet.has(1)); //true

	//Encadenado de llamadas a add()
	mySet.add(4).add(5).add(6);
	addMessage (mySet.size); //6
	addMessage (mySet.has(6)); //true

	//Vaciar set
	mySet.clear();
	addMessage (mySet.size); //0
}

function iterateOverSetV1(){
	cleanMessage ();
	const mySet = new Set([1,2,3]);
	//Al iterar recuperamos los elementos en orden de inserción
	for (let item of mySet) addMessage (item); //1,2,3
}

function iterateOverSetV2(){
	cleanMessage ();
	const mySet = new Set([1,2,3]);
	//Al iterar recuperamos los elementos en orden de inserción
	for (let item of mySet.values()) addMessage (item); //1,2,3
}

function iterateOverSetV3(){
	cleanMessage ();
	const mySet = new Set([1,2,3]);
	// Iteración utilizando forEach
	mySet.forEach(function (item){
		addMessage (item); //1,2,3
	});
}












