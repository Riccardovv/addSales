"use strict";

function indexOfExample(){
	cleanMessageInElement("message2");
	let numbers = [32, -5, 66, 32, 23, 14, 32, 16];
	addMessageInElement("message2", findNumberPositions(numbers, 32));//0,3,6
	addMessageInElement("message2", numbers);//32,-5,66,32,23,14,32,16

	addNumberCollection (numbers, 32);
	addMessageInElement("message2", numbers);//32,-5,66,32,23,14,32,16
	addNumberCollection (numbers, 1);
	addMessageInElement("message2", numbers);//32,-5,66,32,23,14,32,16,1

	updateNumberCollection(numbers, 66);
	addMessageInElement("message2", numbers);//32,-5,32,23,14,32,16,1
	updateNumberCollection(numbers, 66, 1);
	addMessageInElement("message2", numbers);//32,-5,32,23,14,32,16,1
	updateNumberCollection(numbers, -5, 0);
	addMessageInElement("message2", numbers);//32,0,32,23,14,32,16,1

	updateAllNumbersCollection(numbers, 32, 15);
	addMessageInElement("message2", numbers);//15,0,15,23,14,15,16,1
	updateAllNumbersCollection(numbers, 15, 32);
	addMessageInElement("message2", numbers);//32,0,32,23,14,32,16,1
}

function findNumberPositions(array, elem){
	let indexes = [];
	let index = array.indexOf(elem);
	while (index != -1) {
		indexes.push(index);
		index = array.indexOf(elem, index + 1);
	}
	return indexes;
}

function addNumberCollection (array, elem) {
	if (array.indexOf(elem) === -1) {
		array.push(elem);
	}
	return array;
}

function updateNumberCollection(array, elem, newElement) {
  let index = array.indexOf(elem);
  newElement = Number(newElement);
  if (index >= 0) {
    (newElement || newElement === 0) ?
      array.splice(index, 1, newElement) :
      array.splice(index, 1);
	}
	return array;
}

function updateAllNumbersCollection(array, elem, newElement) {
  let index = array.indexOf(elem);
  newElement = Number(newElement);
  while (index > -1) {
    (newElement || newElement === 0) ?
      array.splice(index, 1, newElement) :
      array.splice(index, 1);
			index = array.indexOf(elem);
  }
}

let computers = [
	{
		computerID: 134,
		brand: 'HP',
		model: 'EliteBook',
		memory: 16,
	},
	{
		computerID: 14,
		brand: 'HP',
		model: 'EliteBook',
		memory: 32,
	},
	{
		computerID: 456,
		brand: 'HP',
		model: 'Pavilion',
		memory: 16,
	},
];

function findHighPerformanceComputer(){
	let computer = computers.find(function(elem){
		return elem.memory > 16;
	});
	showMessage("ID: " + computer.computerID +
		" Brand: " + computer.brand +
		" Memory: " + computer.memory);//ID: 14 Brand: HP Memory: 32
}

function updateMemoryV1(){
	let localComputers = [...computers]; //Copia del array
	let updatedIds = []; //Array para obtener Ids modificados
	let memory = 16;
	//Objeto sustituto para intercambiar en el array original
	let newComputer =	{
		memory: 24,
		SSD: 1024
	};
	//Iteración sobre el array original
  localComputers.forEach(function (elem, index, array) {
		//Modificamos el array origininal si se cumple la condición
    if (elem.memory === memory) { //callback puede acceder a memory por ser una función interna
			//El parámetro array referencia el array original
      array[index] = { //Creamos un objeto nuevo
				computerID: elem.computerID,
				brand: elem.brand,
				model: elem.model,
				memory: newComputer.memory, //callback puede acceder por ser una función interna
				SSD: newComputer.SSD
			};
			//Guardamos el array.
			//callback puede acceder por ser una función interna
			updatedIds.push(elem.computerID);
    }
  });
	showMessage(updatedIds);//134,456
}

function changeComputer(elem, index, array) {
	//El argumento this puede ser utilizado en la invocación del callback
	if (elem.memory === this.memory) {
		array[index] = {
			computerID: elem.computerID,
			brand: elem.brand,
			model: elem.model,
			memory: this.newComputer.memory,
			SSD: this.newComputer.SSD
		};
		//this.updatedIds es una referencia por lo que el cambio permanece en el objeto
		this.updatedIds.push(elem.computerID);
	}
}

function updateMemoryV2(){
	let localComputers = [...computers];
	let updatedIds = [];
	let memory = 16;
	let newComputer =	{
		memory: 24,
		SSD: 1024
	};
  localComputers.forEach(changeComputer, {//Argumento this
		updatedIds: updatedIds, //El array es una referencia, puede ser modificado
		memory: memory,
		newComputer: newComputer
	});
	showMessage(updatedIds);//134,456
}

function mapArray() {
	cleanMessage ();
	let updatedIds = [];
	let memory = 16;
	let newComputer =	{
		memory: 24,
		SSD: 1024
	};
  let newComputers = computers.map(function (elem) {
    if (elem.memory === memory) {
      return {
				computerID: elem.computerID,
				brand: elem.brand,
				model: elem.model,
				memory: newComputer.memory,
				SSD: newComputer.SSD
			};
    } else{
			return elem;
		}
  });
	newComputers.forEach(function(elem){
		addMessage(elem.computerID);
	});//134,	14,	456
}

function sortComputersById(){
	cleanMessage ();
	let localComputers = [...computers];
	localComputers.sort(function(elemA,elemB){
		return elemA.computerID - elemB.computerID;
	});
	localComputers.forEach(function(elem){
		addMessage(elem.computerID);
	});//14,134,456
}

function sortComputersByModel(){
	cleanMessage ();
	let localComputers = [...computers];
	localComputers.sort(function(elemA,elemB){
		return elemA.model.localeCompare(elemB.model);
	});
	localComputers.forEach(function(elem){
		addMessage(elem.model);
	});//Pavilion,EliteBook,EliteBook
}

function evenAndOddNumbers(){
	cleanMessage ();
	let numbers = [32, -5, 66, 32, 23, 14, 32, 16];
	let evenNumbers = numbers.filter(function (elem) {
		return !(elem % 2);
	});
	let oddNumbers = numbers.filter(function (elem) {
		return (elem % 2);
	});

	addMessage(evenNumbers);//32,66,32,14,32,16
	addMessage(oddNumbers);//-5,23
}

function removeArrayElements(){
	cleanMessage ();
	let falsyElementsArray = ['text', 0, '', undefined, 'green', null, 5, false, NaN];
	falsyElementsArray = falsyElementsArray.filter(Boolean);

	let finitesNumbersArray = [ 1, 2, , 3, , 3, , , 0, , , 4, , 4, , 5, , 6 , NaN ];
	finitesNumbersArray = finitesNumbersArray.filter(Number.isFinite);

	addMessage(falsyElementsArray);//text,green,5
	addMessage(finitesNumbersArray);//1,2,3,3,0,4,4,5,6
}

function everyAndSomeElements(){
	cleanMessage ();
	let users = [
		{username:"user1", birth:new Date(1999,7,3)},
		{username:"user2", birth:new Date(1998,2,23)},
		{username:"user3", birth:new Date(2010,6,19)},
		{username:"user4", birth:new Date(1995,10,12)}
	];
	addMessage(users.every(isOlderLegalAge));//false
	addMessage(users.some(isOlderLegalAge));//true
}

function isOlderLegalAge(user){
	let today = new Date();
	today.setFullYear(today.getFullYear() - 18);
  return (user.birth < today);
}

function destructuringArray(){
	cleanMessage ();
	let postalCodeArray = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52"];
	let [Alava,Albacete,Alicante,Almeria,Avila,Badajoz,Baleares,Barcelona,Burgos,Caceres,Cadiz,Castellon,CiudadReal,Cordoba,Coruna,Cuenca,Gerona,Granada,Guadalajara,Guipuzcoa,Huelva,Huesca,Jaen,Leon,Lerida,LaRioja,Lugo,Madrid,Malaga,Murcia,Navarra,Orense,Asturias,Palencia,LasPalmas,Pontevedra,Salamanca,SantaCruzdeTenerife,Cantabria,Segovia,Sevilla,Soria,Tarragona,Teruel,Toledo,Valencia,Valladolid,Vizcaya,Zamora,Zaragoza,Ceuta,Melilla] = postalCodeArray;
	addMessage(Albacete); //02
	addMessage(CiudadReal); //13
	addMessage(Cuenca); //16
	addMessage(Guadalajara); //19
	addMessage(Toledo); //45
}


