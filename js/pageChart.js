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
//Variables
let deptSales = Array.of(0, 0, 0, 0);
let deptLabels = Array.of("Cámara", "Móvil", "Portátil", "Tablet");

//Colecciones para mostrar en gráficos.
let monthlySalesMap = new Map();


//Añadir ventas al gráfico
function cleanAddSaleForm() {
	newMonth.value = "";
	newProduct.value = "";
	newAmount.value = "";

}
function completeMap(map,product,amount) {
if (product=="option1") {
	map.set(product,Number.parseInt(amount));
	map.set("option2", 0);
	map.set("option3", 0);
	map.set("option4", 0);
}else if (product=="option2") {

	map.set("option1", 0);
	map.set(product,Number.parseInt(amount));
	map.set("option3", 0);
	map.set("option4", 0);
}else if (product=="option3") {

	map.set("option1", 0);
	map.set("option2", 0);
	map.set(product,Number.parseInt(amount));
	map.set("option4", 0);
}else
map.set("option2", 0);
map.set("option3", 0);
map.set("option4", 0);
map.set(product,Number.parseInt(amount));

}

function addSale() {
	try {

		if (monthlySalesMap.has(newMonth.value)) {

			let map1=monthlySalesMap.get(newMonth.value);

			if (map1.has(newProduct.value)) {

				let total=Number.parseInt(map1.get(newProduct.value))+Number.parseInt(newAmount.value);
				map1.delete(newProduct.value);
				map1.set(newProduct.value, Number.parseInt(total));

			}else{
				map1.set(newProduct.value, Number.parseInt(newAmount.value));
			}
		}else{
			monthlySalesMap.set(newMonth.value, new Map())
			let add =monthlySalesMap.get(newMonth.value);
			//add.set(newProduct.value, Number.parseInt(newAmount.value));
			completeMap(add, newProduct.value, newAmount.value);

		}
		switch (newProduct.value) {
			case "option1":
				deptSales[0]++;
				break;
			case "option2":
				deptSales[1]++;
				break;
			case "option3":
				deptSales[2]++;
				break;
			case "option4":
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
function updateDataset() {
	initMonths();
		initCamera();
		initPhone();
		initLaptop();
		initTablet();
		console.log(monthlySalesMap);
		 monthlySalesChart.data.datasets[0].data = monthlySalesCamera;
		 monthlySalesChart.data.datasets[1].data = monthlySalesPhone;
		 monthlySalesChart.data.datasets[2].data = monthlySalesLaptop;
		 monthlySalesChart.data.datasets[3].data = monthlySalesTablet;
		console.log(monthlyLabels);
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

function drawProduct() {
	let removeProd = $("#removeProduct");
	let map1=monthlySalesMap.get(mes.value);
	console.log('el mes es: '+mes.value);
	console.log(map1);
	for (let [product, amount] of map1.entries()) {
		// Creamos elemento option con jQuery
		let opt = $("<option>").val(product).text(amount);
		// Añadimos elemento al select.
		removeProduct.append(opt);
	}
}

// Crear select con
function drawSelectMontlySales() {
	// Seleccionamos elemento usando id con jQuery
	let removeSales = $("#removeSales");
	// Eliminamos option del select.
	removeProd.empty();
	removeSales.empty();
	for (let [month, amount] of monthlySalesMap.entries()) {
		// Creamos elemento option con jQuery
		let opt = $("<option>").val(month).text(month);
		// Añadimos elemento al select.
		removeSales.append(opt);

	}
	drawProduct();
}




// Borrar meses de la colección
function removeMonthlySale() {
	let removeSales = document.getElementById("removeSales");
	// Borramos de la colección la venta.
	//monthlySalesMap.delete(removeSales.value);
	// Actualizamos colección en el gráfico
	updateDataset();
	// Actualizasmos la vista
	initMonthlyTotalSales();
	drawSelectMontlySales();
	drawProduct();
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
			if (key=="option1") {
				data.push(value);
			}
		})
	})
	monthlySalesCamera=data;
}
function initPhone() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="option2") {
				data.push(value);
			}
		})
	})
	monthlySalesPhone=data;
}
function initLaptop() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="option3") {
				data.push(value);
			}
		})
	})
	monthlySalesLaptop=data;
}
function initTablet() {
	let data=new Array();
	monthlySalesMap.forEach(function (value, key) {
		value.forEach(function (value,key) {
			if (key=="option4") {
				data.push(value);
			}
		})
	})
	monthlySalesTablet=data;
}



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
