"use strict";

//funcion create devuelve un array vacio
function create() {
	return new Set();
}

// devuelve true si la longitud de @list es 0, de lo contrario devuelve true
function isEmpty(list) {
	return !list.size;
}

//devuelve el numero de elementos que contiene @list

function size(list) {
	return list.size;
}

function add(list, element) {
	if (element.ISBN && element.title) {
		list.add(element);
	} else throw "Parameter is not a book";
	return size(list);
}

function has(set, elem) {
	if (elem.ISBN) {
		if (set.values().ISBN == elem.ISBN) {
			return true;
		} else return false;
	} else throw "element is not a book";
}

function toString(set) {
	let str = "";
	set.forEach((element) => {
		str +=
			"- " +
			element.ISBN +
			" " +
			element.title +
			" " +
			element.author +
			" " +
			element.publicationDate.toLocaleDateString() +
			" " +
			element.price +
			"€ ";
	});
	return str;
}

function clear(set) {
	set.clear();
}

function remove(set, elem) {
	if (elem.ISBN) {
		return set.delete(elem);
	} else throw "element is not a book";
}

function validateISBN(elem) {
	let reg = /\d{3}-\d{2}-\d{4}-\d{3}-\d/;
	return reg.test(elem.ISBN);
}
