showAllOrdersOfCust();
addOrderBut.addEventListener('mousedown', addOrder, 'false');
/*
 * the function shows information about all customer orders
 */
function showAllOrdersOfCust() {
	if(document.getElementById('orderTable') != null){
		document.getElementById('orderTable').remove();
	}
	var ordersTable = document.createElement('div');
	ordersTable.className = 'orderTable';
	ordersTable.id = 'orderTable';
	var titleArr = new Array('№', dateLabel, costLabel, acceptedLabel, paidLabel);
	ordersTable.append(getRow(titleArr));
	var mainDiv = document.getElementById('main');
	mainDiv.append(ordersTable);
	//var formTitle = document.getElementById('form-title');
	formTitle.innerHTML = allOrdersLabel;
	getAllOrders();
}
/*
 * the function gets a list of all orders from the database
 */		
function getAllOrders() {
	var user = JSON.parse(sessionStorage.user);
	var idUser = user.id;
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'GetOrdersUserController', true);
	httpRequest.setRequestHeader('Content-Type', 'application/text; charset=UTF-8');
	httpRequest.send(idUser);
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			if(httpRequest.status == 200){
				orders = httpRequest.response; 
				fillOrdersTable(orders);
			}
		}
	};
}
/*
 * the function gets a list of customer orders as a parameter and fills in the order table
 */
function fillOrdersTable(orders) {
	for (var i = 0; i < orders.length; i++) {
		var id = orders[i].id;
		var date = parseDate(orders[i].date);
		var cost = orders[i].totalCost;
		var accepted = orders[i].accepted;
		var paid = orders[i].paid;
		accepted == true ? accepted = yesLabel : accepted = noLabel;
		paid == true ? paid = yesLabel : paid = noLabel;
		var order = new Array(id, date, cost, accepted, paid);
		var row = getRow(order);
		orderJson = JSON.stringify(orders[i]);
		row.id = i;
		row.setAttribute('onclick', "showOrderInfo('" + orderJson + "')");
		row.style.cursor = "pointer";
		document.getElementById('orderTable').append(row);
	}
}
/*
 * the function gets an array of values as a parameter,
 * generates a row with these values,
 * returns this row
 */
function getRow(arrayInfo) {
	var row = document.createElement('div');
	row.className = 'orderTable-row';
	for (var i = 0; i < arrayInfo.length; i++) {
		var cell = document.createElement('div');
		cell.className = 'orderTable-cell';
		i == 0 ? cell.style.width = '9%' : cell.style.width = '19%'; 
		cell.append(arrayInfo[i]);
		row.append(cell);
	}
	return row;
}

/*
 * the function converts the date to the desired format
 */				
function parseDate(date) {
	var regex = /\s|,\s/;
	var dateArr = date.split(regex);
	var mon = dateArr[0].slice(0, 3);
	switch (mon) {
	case "янв": var month = "01"; break
	case "фев": var month = "02"; break
	case "мар": var month = "03"; break
	case "апр": var month = "04"; break
	case "мая": var month = "05"; break
	case "июн": var month = "06"; break
	case "июл": var month = "07"; break
	case "авг": var month = "08"; break
	case "сен": var month = "09"; break
	case "окт": var month = "10"; break
	case "ноя": var month = "11"; break
	case "дек": var month = "12"; break
	}
	dateArr[1] < 10 ? day = "0" + dateArr[1] : day = dateArr[1];
	var year = dateArr[2];
	return year + "-" + month + "-" + day;
}