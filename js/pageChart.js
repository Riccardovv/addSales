"use strict";
// Contenedores de gráficos
const monthCtx = document.getElementById("monthlySales").getContext("2d");
const deptCtx = document.getElementById("deptSales").getContext("2d");
const yearlyLabel = document.getElementById("yearlyTotal");

//valores del grafico
let monthlySalesCamera=[];
let monthlySalesLaptop = [];
let monthlySalesPhone = [];
let monthlySalesTablet = [];
let monthlyLabels = [];

// Valores del formulario
const newAmount = document.getElementById("itemAmount");
const newMonth = document.getElementById("monthId");
const newProduct = document.forms[0].inlineRadioOptions;
const mes=document.getElementById("removeSales");
//valores de borrar
//mes.addEventListener(onChange,drawProduct)
//Variables
let deptSales = Array.of(0, 0, 0, 0);
let deptLabels = Array.of("Cámara", "Móvil", "Portátil", "Tablet");

//Colecciones para mostrar en gráficos.
let monthlySalesMap = new Map();


//Añadir ventas al gráfico, resetea los valores al añadir
function cleanAddSaleForm() {
	newMonth.value = "";
	newProduct.value = "";
	newAmount.value = "";

}
//rellena con 0 los valores del mapa no introducidos en un mes,
// para evitar fallos a la hora de añadir valores en meses posteriores
function completeMap(map,product,amount) {
if (product=="camara") {
	map.set(product,Number.parseInt(amount));
	map.set("movil", 0);
	map.set("portatil", 0);
	map.set("tablet", 0);
}else if (product=="movil") {

	map.set("camara", 0);
	map.set(product,Number.parseInt(amount));
	map.set("portatil", 0);
	map.set("tablet", 0);
}else if (product=="portatil") {

	map.set("camara", 0);
	map.set("movil", 0);
	map.set(product,Number.parseInt(amount));
	map.set("tablet", 0);
}else
map.set("camara", 0);
map.set("movil", 0);
map.set("portatil", 0);
map.set(product,Number.parseInt(amount));
}

function validateInput(value) {

	if (isNaN(value)) {
		throw {
			title: 'Error de validacion',
			message: 'el valor introducido no es un numero'
		}
	}
}

function addSale() {

	try {
		validateInput(newAmount.value);
		//comprueba si existe registro para el mes
		if (monthlySalesMap.has(newMonth.value)) {
			let map1=monthlySalesMap.get(newMonth.value);
				//si el mes tiene el valor, se suma el nuevo dato
				let total=Number.parseInt(map1.get(newProduct.value))+Number.parseInt(newAmount.value);
				map1.delete(newProduct.value);
				map1.set(newProduct.value, Number.parseInt(total));

		}else{
			//si no existe registro para el mes, se crea
			monthlySalesMap.set(newMonth.value, new Map())
			let add =monthlySalesMap.get(newMonth.value);
			completeMap(add, newProduct.value, Number.parseInt(newAmount.value));

		}
		switch (newProduct.value) {
			case "camara":
				deptSales[0]++;
				break;
			case "movil":
				deptSales[1]++;
				break;
			case "portatil":
				deptSales[2]++;
				break;
			case "tablet":
				deptSales[3]++;
				break;
		}
		//Recuento de totales
		initMonthlyTotalSales();

		//Actualizar gráfico
		updateDataset();
	} catch (error) {
		// Tratamiento de excepciones
		alert(error.message);
	} finally {
		// Reseteo de formulario
		cleanAddSaleForm();
	}
}
//funcion que actualiza el grafico con los nuevos valores introducidos
function updateDataset() {
	initMonths();
	initCamera();
	initPhone();
	initLaptop();
	initTablet();
	initMonthlyTotalSales();

	monthlySalesChart.data.datasets[0].data = monthlySalesCamera;
	monthlySalesChart.data.datasets[1].data = monthlySalesPhone;
	monthlySalesChart.data.datasets[2].data = monthlySalesLaptop;
	monthlySalesChart.data.datasets[3].data = monthlySalesTablet;
	monthlySalesChart.data.labels = monthlyLabels;
	monthlySalesChart.update();

	deptSalesChart.clear();
	deptSalesChart.update();

}
//Iteración para calcular el total de ventas
function initMonthlyTotalSales() {
	let total=0;
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			total+=value;
		})
	})
	yearlyLabel.innerHTML = total+"€";

}

//Encontrar el primer elemento
function findOver5000() {
	let position = -1;
	let quantity = monthSales.find(function (elem, index) {
		if (elem > 5000) {
			position = index;
			return true;
		}
		return false;
	});
	alert("Cantidad: " + quantity + " Posición: " + position);
}

//Resetear gráfico
function resetMonthlySales() {
	monthlySalesMap.clear();
	initMonthlyTotalSales();
	deptSales =[0,0,0,0];
	updateDataset();

}

// Ejercicio Set
function getSalesMonths() {
	monthlySalesMap.forEach(function (amount, month) {
		alert(month + ": " + amount);
	});
}

//crea el segundo select con los valores de venta de los producto para el mes seleccionado
function drawProduct() {
	try {
		let removeProd = $("#removeProduct");
	removeProd.empty();
	let opt=document.getElementById("removeSales").value;
	let map=monthlySalesMap.get(opt);
	for (let [elem, value] of map.entries()) {
		// Creamos elemento option con jQuery
		let opti = $("<option>").val(elem).text(elem+" "+value+"€");
		// Añadimos elemento al select.
		removeProd.append(opti);
	}
	} catch (error) {

	}

}


// Crear select con los valores de los meses que existen
function drawSelectMontlySales() {
	// Seleccionamos elemento usando id con jQuery
	let removeSales = $("#removeSales");
	// Eliminamos option del select.
	removeSales.empty();
	let opt="";
	for (let [month] of monthlySalesMap.entries()) {
		// Creamos elemento option con jQuery
		opt = $("<option>").val(month).text(month);
		// Añadimos elemento al select.
		removeSales.append(opt);
	}

	drawProduct();

}




// Borrar meses de la colección, se llama al pulsar el boton de borrar datos
function removeMonthlySale() {
	let removeSales = document.getElementById("removeSales");
	let removeProduct = document.getElementById("removeProduct");
	let map = monthlySalesMap.get(removeSales.value);
	map.delete(removeProduct.value);
	map.set(removeProduct.value,0);
	console.log(map);
	let borrar= true;
	borrar=map.get("camara")==0 && map.get("movil")==0 && map.get("portatil")==0 && map.get("tablet")==0;
	console.log(map);
	console.log('borrar vale '+borrar);
	if (borrar) {
		monthlySalesMap.delete(removeSales.value);
		console.log('entra el if');
	}
	updateDataset();
	initMonthlyTotalSales();
	drawSelectMontlySales();

}



//funcion que pone los meses en el array para el grafico
function initMonths() {
	let data= new Array();
	monthlySalesMap.forEach(function (value, key) {
		data.push(key);
	});

	monthlyLabels=data;
}

//funcion que pone los datos de ventas de camaras en un array
function initCamera() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="camara") {
				data.push(value);
			}
		})
	})
	monthlySalesCamera=data;
}
//crea el array con los valore de venta de moviles para mostrarlo en el grafico
function initPhone() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="movil") {
				data.push(value);
			}
		})
	})
	monthlySalesPhone=data;
}
//crea el array con los valore de venta de portatiles para mostrarlo en el grafico
function initLaptop() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="portatil") {
				data.push(value);
			}
		})
	})
	monthlySalesLaptop=data;
}
//crea el array con los valore de venta de tablets para mostrarlo en el grafico
function initTablet() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="tablet") {
				data.push(value);
			}
		})
	})
	monthlySalesTablet=data;
}


//grafico de barras
let monthlySalesChart = new Chart(monthCtx, {
    type: 'bar',
    data: {
        labels: monthlyLabels,
        datasets: [{
            label: 'Cámaras',
            data: monthlySalesCamera,
            backgroundColor: 'rgba(238, 184, 104, 1)',
            borderWidth: 0
        },
        {
            label: 'Móviles',
            data: monthlySalesLaptop,
            backgroundColor: 'rgba(75, 166, 223, 1)',
            borderWidth: 0
        },
        {
            label: 'Portátil',
            data: monthlySalesPhone,
            backgroundColor: 'rgba(239, 118, 122, 1)',
            borderWidth: 0
        },
        {
            label: 'Tablets',
				data: monthlySalesTablet,
            backgroundColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 0
        }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Gráfico de sectores
let deptSalesChart = new Chart(deptCtx, {
	type: "pie",
	data: {
		labels: deptLabels,
		datasets: [
			{
				label: "Número de ventas",
				data: deptSales,
				backgroundColor: [
					"rgba(238, 184, 104, 1)",
					"rgba(75, 166, 223, 1)",
					"rgba(239, 118, 122, 1)",
					"rgba(40, 167, 69, 1)",
				],
				borderWidth: 0,
			},
		],
	},
	options: {},
});
