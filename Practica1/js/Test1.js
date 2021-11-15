let book = {
	ISBN: "978-84-9804-654-0",
	title: "El Quijote",
	author: "Miguel de Cervantes",
	publicationDate: new Date(1605, 0, 1),
	price: 20,
};

let book1 = {
	ISBN: "978-84-9804-654-0",
	title: "La Biblia",
	author: "anonimo",
	publicationDate: new Date(110, 7, 14),
	price: 10,
};

let book2 = {
	ISBN: "978-84-9804-654-",
	title: "La Biblia",
	author: "anonimo",
	publicationDate: new Date(110, 7, 14),
	price: 10,
};

console.log("---------TEST EJ1----------");
//prueba ej 1
console.log("crear array");
let test = create();
console.log("funcion is empty: " + isEmpty(test));
console.log("funcion is full: " + isFull(test));
console.log(
	"añadir un elemento a la lista, devuelve el tamaño: " + add(test, book)
);
add(test, book2);
console.log(
	"añadir en una posicion, devuelve el tamaño: " + addAt(test, book1, 5)
);

console.log("get devuelve un elemento; " + get(test, 0));
console.log("to string: " + toString(test));

console.log("index of devuelve el indice:" + indexOf(test, book));
console.log("capacidad maxima" + capacity(test));
console.log("primer elemento: " + firstElement(test));
console.log("ultiumo elemento: " + firstElement(test));
console.log("remove element: " + remove(test, book1));
console.log("cambiar elemento" + set(test, book1, 0));
console.log("vaciar lista" + clear(test));
