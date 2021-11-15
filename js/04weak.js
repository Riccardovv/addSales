"use strict";

function weakSetExample(){
	cleanMessage ();
	let visitedSet = new WeakSet();

	let john = { name: "John" };
	let pete = { name: "Pete" };

	visitedSet.add(john); // John nos visita
	visitedSet.add(pete); // luego Pete
	// visitedSet tiene 2 usuarios
	{
		let mary = { name: "Mary" };
		visitedSet.add(mary);
		addMessage(visitedSet.has(mary)); // true
		// visitedSet tiene 3 usuarios
	}
	// Mary desaparece de la colección por acabar su bloque y perderse su referencia.
	addMessage(visitedSet.has(john)); // true
	addMessage(visitedSet.has(pete)); // true
}


function weakMapExample(){
	// incrementar el recuento de visitas
	function countUser(user) {
		let count = visitsCountMap.get(user) || 0;
		visitsCountMap.set(user, count + 1);
	}

	cleanMessage ();
	let visitsCountMap = new WeakMap();
	{
		let john = { name: "John" };
		countUser(john); // cuenta sus visitas
		countUser(john); // cuenta sus visitas
		countUser(john); // cuenta sus visitas
		addMessage(visitsCountMap.get(john)); // 3
	}
	// John deja de pertenecer automáticamente a la colección.
}

function cache(){
	// calcular y recordad el resultado
	function process(obj) {
		if (!cache.has(obj)) {
			let result = 0;
			for (let i=1;i<64;i++) result = result + 2 ** i;
			cache.set(obj, result);
		}
		return cache.get(obj);
	}
	cleanMessage ();
	let cache = new WeakMap();

	let obj = {/* Objeto cualquiera */};

	addMessage(process(obj)); // 18446744073709552000
	addMessage(process(obj)); // 18446744073709552000
}

