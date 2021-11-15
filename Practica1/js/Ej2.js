"use strict";

function add(list, element) {
	if (element.ISBN && element.title) {
		if (!isFull(list)) {
			list.push(element);
			list.sort(function (elemA, elemB) {
				return elemA.ISBN.localeCompare(elemB.ISBN);
			});
		} else throw "List is full";
	} else throw "Parameter is not a book";
	return size(list);
}
