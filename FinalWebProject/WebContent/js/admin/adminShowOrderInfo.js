/*
 * the function shows information about the selected order
 */
function showOrderInfo(orderJson) {
	/*
	 * show information about the order
	 */
	sessionStorage.order = orderJson;
	var order = JSON.parse(orderJson);
	var ordersTable = document.getElementById('orderTable');
	ordersTable.style.display = 'none';
	buttonLogOut.style.display = 'none';
	buttonOrderOut.style.display = 'inline-block';
	buttonDishEditor.style.display = 'none';
	document.getElementById('form-title').innerHTML = orderLabel+" №" + order.id;
	var orderInfoTable = getDiv('orderInfoTable', 'orderInfoTable');
	var titles = new Array(dateLabel+':', customerLabel+':', acceptedLabel+':', paidLabel+':');
	var date = parseDate(order.date);
	var login = order.user.login;
	var accepted = order.accepted;
	accepted == true ? accepted = yesLabel : accepted = noLabel;
	var paid = order.paid;
	paid == true ? paid = yesLabel : paid = noLabel;
	var fields = new Array(date, login, accepted, paid);
	/*
	 * fill in the fields with order information
	 */
	for (var i = 0; i < fields.length; i++) {
		var row = getDiv('orderInfo-row', 'orderInfo-row');
		var key = getDiv('orderInfo-cell', 'orderInfo-cell');
		key.style.width = "27%";
		var value = getDiv('orderInfo-cell'+i, 'orderInfo-cell');
		value.style.width = "67%";
		key.append(titles[i]);
		value.append(fields[i]);
		row.append(key);
		row.append(value);
		if(i == 2 && paid == noLabel){
			value.style.width = "40%";
			var acceptBut = getInput('button', 'accept-button' , 'accept-button');
			fields[i] == yesLabel ? acceptBut.value = cancelLabel : acceptBut.value = acceptLabel;
			acceptBut.setAttribute('onclick', "acceptOrder('" + orderJson + "')");
			row.append(acceptBut);
		}
		orderInfoTable.append(row);
	}
	/*
	 * request information from the server about dishes from the selected order
	 */
	var httpRequest = new XMLHttpRequest();
	order.date = parseDate(order.date);
	orderJson = JSON.stringify(order);
	if(sessionStorage.getItem('language') == 'ru'){
		var controller = 'GetOrderDishesControllerRu';
	}else{
		var controller = 'GetOrderDishesController';
	}
	httpRequest.open("POST", controller, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send(orderJson);
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			if(httpRequest.status == 200){
				/*
				 *display information about the dishes of the order 
				 */
				var dishes = httpRequest.response; 
				if(dishes != null){
					sessionStorage.dishes = JSON.stringify(dishes);
					var rowDishesTitle = getDiv('orderInfoDishesTitle', 'orderInfoDishesTitle');
					rowDishesTitle.append(dishesLabel+":");
					var cellwidthesArr = new Array('7%', '30%', '16%', '16%', '16%');
					var namesHeader = new Array('№', nameDishLabel, priceLabel, numberLabel, costLabel);
					orderInfoTable.append(rowDishesTitle);
					fillDishInfo (namesHeader, orderInfoTable, cellwidthesArr);
					var index = 0;
					var map = new Map(Object.entries(dishes));
					map.forEach((number, dish) => {
						var regex = /\s-\s/;
						dishArr = dish.split(regex);
						var name = dishArr[0];
						var price = dishArr[1];
						var cost = price * number;
						var arr = new Array(index+1, name, price, number, cost);
						fillDishInfo (arr, orderInfoTable, cellwidthesArr);
						index++;
					});
					var totalCostArr = new Array(totalCostLabel+':', order.totalCost);
					cellwidthesArr = new Array('78%', '16%');
					fillDishInfo (totalCostArr, orderInfoTable, cellwidthesArr);
					var deleteOrderBut = getInput('button', 'deleteOrderBut', 'log-button', deleteOrderButLabel);
					deleteOrderBut.addEventListener('mousedown', deleteOrder, false);
					orderInfoTable.append(deleteOrderBut);
					var input = getInput ('hidden', 'idOrder', '', order.id);
					orderInfoTable.append(input);
					var mainDiv = document.getElementById('main');
					mainDiv.append(orderInfoTable);
				}
			}
		}
	};
}
/*
 * the function fills the rows with information about the dish and adds them to the table
 */
function fillDishInfo (array, table, widthes){
	var row = getDiv('orderInfo-row', 'orderInfo-row');
	for (var i = 0; i < array.length; i++) {
		var cell = getDiv('dishInfo-cell', 'dishInfo-cell');
		switch (i) {
		case 0: cell.style.width = widthes[i]; break
		case 1: cell.style.width = widthes[i]; break
		case 2: cell.style.width = widthes[i]; break	
		case 3: cell.style.width = widthes[i]; break	
		case 4: cell.style.width = widthes[i]; break	
		}
		cell.append(array[i]);
		row.append(cell);
	}
	table.append(row);
}
/*
 * 
 */
function acceptOrder(orderJson){
	var order = JSON.parse(orderJson);
	order.date = parseDate(order.date);
	var acceptedCell = document.getElementById('orderInfo-cell2').innerHTML;
	acceptedCell == yesLabel ? accepted = false : accepted = true;
	order.accepted = accepted;
	var json = JSON.stringify(order);
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'UpdateOrderController', true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send(json);
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			if(httpRequest.status == 200){
				var newOrder = httpRequest.response;
				order = JSON.parse(orderJson);
				order.accepted = newOrder.accepted;
				orderJson = JSON.stringify(order);
				sessionStorage.order = orderJson;
				document.getElementById('orderInfo-cell2').innerHTML = newOrder.accepted == true ? accepted = yesLabel : accepted = noLabel;
				if(newOrder.accepted == true){
					document.getElementById('accept-button').value = cancelLabel;
				}else{
					document.getElementById('accept-button').value = acceptLabel;
				}
				
				
			}
		}
	};
}
/*
 * 
*/


function deleteOrder() {
	if(confirm(confirmDelOrder)){
		var idOrder = document.getElementById('idOrder').value;
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", 'DeleteOrderController', true);
		httpRequest.setRequestHeader('Content-Type', 'application/text; charset=UTF-8');
		httpRequest.send(idOrder);
		httpRequest.responseType = 'text';
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState == XMLHttpRequest.DONE){
				if(httpRequest.status == 200){
					orderOut();
				}
			}
		};
	}
}