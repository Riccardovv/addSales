"use strict";
//tamaño maximo de la lista
const maxArraySize = 20;

function validateISBN(elem) {
	let reg = /\d\d\d-\d\d-\d\d\d\d-\d\d\d-\d/;
	return reg.test(elem.ISBN);
}

//funcion create devuelve un array vacio
function create() {
	return new Array();
}

// devuelve true si la longitud de @list es 0, de lo contrario devuelve true
function isEmpty(list) {
	return !list.length;
}

//isFull devolvera true si el tamaño de @list es mayor que @maxArraySize

function isFull(list) {
	if (list.length === maxArraySize && !list.includes(undefined)) {
		return true;
	} else {
		return false;
	}
}

//devuelve el numero de elementos que contiene @list

function size(list) {
	let elements = 0;
	for (let i = 0; i < list.length; i++) {
		list[i] && elements++;
	}
	return elements;
}

function add(list, element) {
	if (element.ISBN && element.title) {
		if (!isFull(list)) {
			list.push(element);
		} else throw "List is full";
	} else throw "Parameter is not a book";
	return size(list);
}

function addAt(list, elem, index) {
	if (elem.ISBN && elem.title) {
		if (!isFull(list)) {
			if (index <= maxArraySize) {
				list[index] = elem;
			} else throw "index out of the list";
		} else throw "List is full";
	} else throw "Parameter is not a book";
	return size(list);
}

function get(list, index) {
	if (index <= maxArraySize) {
		return list[index];
	} else throw "index out of the list";
}

function toString(list) {
	let message = "";
	list.forEach((element) => {
		message +=
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
	return message;
}

function indexOf(list, elem) {
	if (elem.ISBN && elem.title) {
		let value = -1;
		for (let i = 0; i <= size(list); i++) {
			if (elem.ISBN == list[i].ISBN) {
				return i;
			}
		}
		return value;
	} else throw "Element is not a book";
}

function lastLndexOf(list, elem) {
	if (elem.ISBN && elem.title) {
		if (validateISBN(elem.ISBN)) {
			for (let i = list.length; i < 0; i--) {
				if (elem.ISBN == element.ISBN) {
					return i;
				}
			}
			return -1;
		} else throw "invalid ISBN";
	} else throw "Element is not a book";
}

//el maximo de elementos dependera de lo que hayamos establecido en la constante al principio
function capacity(list) {
	return maxArraySize;
}

function clear(list) {
	list.length = 0;
}

function firstElement(list) {
	if (list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			if (list[i] != undefined) {
				return list[i];
			}
		}
	} else throw "list is empty";
}

function lastElement(list) {
	if (list.length > 0) {
		return list[size(list)];
	} else throw "list is empty";
}

function remove(list, index) {
	if (index >= size(list)) {
		elem = {
			ISBN: list[index].ISBN,
			title: list[index].title,
			author: list[index].author,
			publicationDate: list[index].publicationDate,
			price: list[index].price,
		};
		list[index] = undefined;
		return elem;
	} else throw "index out of the list";
}

function removeElement(list, elem) {
	if (elem.ISBN && elem.title) {
		list.forEach((element) => {
			if (elem.ISBN == element.ISBN) {
				element = undefined;
				return true;
			}
		});
		return false;
	} else throw "Element is not a book";
}

function set(list, elem, index) {
	if (elem.ISBN && elem.title) {
		if (index >= size(list)) {
			element = {
				ISBN: list[index].ISBN,
				title: list[index].title,
				author: list[index].author,
				publicationDate: list[index].publicationDate,
				price: list[index].price,
			};
			list[index] = elem;
			return element;
		} else throw "index out of the list";
	} else throw "element is not a book";
}
