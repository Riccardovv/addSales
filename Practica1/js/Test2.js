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
let test = create();

console.log(add(test, book1));
console.log(add(test, book2));
