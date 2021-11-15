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

console.log("crear set" + create());
let test = create();
console.log("esta vacio: " + isEmpty(test));
console.log("numero de elementos" + size(test));
console.log("se añade 1 elemento: " + add(test, book1));
console.log("numero de elementos" + size(test));

console.log("se comprueba si esá el elemento: " + has(test, book));
console.log("to string: " + toString(test));
console.log("borrar elemento: " + remove(test, book1));
console.log("vaciar lista" + clear(test));
