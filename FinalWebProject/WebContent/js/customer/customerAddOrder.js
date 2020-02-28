function addOrder() {
	formTitle.innerText = "";
	orderTable.style.display = 'none';
	addOrderBut.style.display = 'none';
	buttonLogOut.style.display = 'none';
	langBut.style.display = 'none';
	addOrderOutBut.style.display = 'inline-block';
	addOrderOutBut.addEventListener('click', addOrderOut, false);
	sessionStorage.setItem('addOrder', true);
	if(sessionStorage.dishes != null){
		var dishes = new Map(JSON.parse(sessionStorage.dishes));
	}else{
		var dishes = new Map();
	}
	addOrderOutBut.value = back;
	formTitle.innerText = selectDishesLabel;
	var sectionAddOrder = getDiv('sectionAddOrder', 'sectionAddOrder');
	var form = document.createElement('form');
	form.id = 'form';
	form.style.width = '60%';
	form.style.margin = "0 auto";
	var selectDish = document.createElement('select');
	selectDish.id = 'select';
	selectDish.className = 'input';
	selectDish.style.width = '200px';
	getMenu(selectDish);
	var amountField = getInput('text', 'field', 'input', '');
	amountField.style.width = '30px';
	amountField.style.height = '27px';
	amountField.style.marginLeft = '50px';
	var addBut = getInput('button', 'addDishBut', 'log-button', addDishButLabel);
	addBut.addEventListener('mousedown', () => {addDish(selectDish.value, amountField.value, dishes)}, false);
	form.append(selectDish);
	form.append(amountField);
	form.append(addBut);
	sectionAddOrder.append(form);
	var mainDiv = document.getElementById('main');
	mainDiv.append(sectionAddOrder);
}

function addDish(dish, amount, dishes) {
	var sectionAddOrder = document.getElementById('sectionAddOrder');
	if(dish == 0 || amount == 0 || parseInt(amount, 10) * 0 != 0){
		alert(errorSelectDish);
	}else{
		var httpRequest = new XMLHttpRequest();
		if(sessionStorage.getItem('language') == 'ru'){
			var controller = 'GetDishControllerRu';
		}else{
			var controller = 'GetDishController';
		}
		httpRequest.open("POST", controller, true);
		httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		httpRequest.send(dish);
		httpRequest.responseType = 'json';
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState == XMLHttpRequest.DONE){
				if(httpRequest.status == 200){
					dish = httpRequest.response; 
					var row = getDishRow(dish, amount, dishes);
					sectionAddOrder.append(row);
					dishes.set(dish, amount);
					sessionStorage.dishes = JSON.stringify(Array.from(dishes.entries()));
					var sendOrderBut = getInput('button', 'sendOrderBut', 'log-button', makeOrderButLabel);
					sendOrderBut.style.margin = '10 auto';
					sendOrderBut.addEventListener('mousedown', sendOrder, false);
					var mainDiv = document.getElementById('main');
					if(dishes.size == 1){
						mainDiv.append(sendOrderBut);
					}
					document.getElementById('select').value = 0;
					document.getElementById('field').value = '';
				}
			}
		};
	}
}

function getDishRow(dish, amount, dishes) {
	var arrDish = new Array(dish.id, dish.name, dish.cost, amount);
	var row = getDiv('idDish-'+dish.id, 'orderTable-row');
	for (var i = 0; i < arrDish.length; i++) {
		var cell = document.createElement('div');
		cell.className = 'orderTable-cell';
		i == 0 ? cell.style.width = '9%' : cell.style.width = '19%'; 
		i == 3 ? cell.append(parseInt(arrDish[i])) : cell.append(arrDish[i]);
		//cell.append(arrDish[i]);
		row.append(cell);
	}
	var delDishBut = getInput('button', 'delDishBut', 'log-button', deleteButLabel);
	delDishBut.style.marginTop = '5px';
	delDishBut.addEventListener('click', () => {delDish(dish, dishes)}, false);
	row.append(delDishBut);
	return row;
}
/*
 * 
 */
function delDish(dish, dishes) {
	document.getElementById('idDish-'+dish.id).remove();
	dishes.delete(dish);
	sessionStorage.dishes = JSON.stringify(Array.from(dishes.entries()));
	if(dishes.size == 0){
		document.getElementById('sendOrderBut').remove();
	}
}
/*
 * the function gets a list of all dishes from the database
 */		
function getMenu(selectDish) {
	var httpRequest = new XMLHttpRequest();
	if(sessionStorage.getItem('language') == 'ru'){
		var controller = 'GetMenuControllerRu';
	}else{
		var controller = 'GetMenuController';
	}
	httpRequest.open("POST", controller, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send();
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			if(httpRequest.status == 200){
				dishes = httpRequest.response; 
				var option = document.createElement('option');
				option.value = 0;
				option.append(selectDishLabel);
				selectDish.append(option);
				for (var i = 0; i < dishes.length; i++) {
					var option = document.createElement('option');
					option.value = dishes[i].id;
					option.append(dishes[i].name + " - " + dishes[i].cost);
					selectDish.append(option);
				}
			}
		}
	};
}

/*
 * 
 */
function sendOrder() {
	var date = new Date();
	var user = JSON.parse(sessionStorage.user);
	var dishes = JSON.parse(sessionStorage.dishes);
	var order = {
			date: date,
			dishes: dishes,
			user: user,
			accepted: false,
			paid: false,
	};
	var jsonOrder = JSON.stringify(order);
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'AddOrderController', true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send(jsonOrder);
	httpRequest.responseType = 'text';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			if(httpRequest.status == 200){
				if(httpRequest.response === "true"){
					alert(orderAddedLabel);
					addOrderOut();
				}else{
					alert(orderNotAddedLabel);
				}
			}
		}
	};
}