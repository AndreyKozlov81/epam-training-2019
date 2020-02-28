showAllOrders();

function showAllOrders() {
	if(document.getElementById('orderTable') != null){
		document.getElementById('orderTable').remove();
	}
	var ordersTable = getDiv('orderTable', 'orderTable');
	var row = getDiv('orderTable-row', 'orderTable-row');
	var mainDiv = document.getElementById('main');
	var titleArr = new Array('№', dateLabel, customerLabel, costLabel, acceptedLabel, paidLabel);
	
	for (var i = 0; i < 6; i++) {
		var cell = getDiv('orderTable-cell', 'orderTable-cell');
		i == 0 ? cell.style.width = '7%' : cell.style.width = '15%'; 
		cell.append(titleArr[i]);
		row.append(cell);
	}
	ordersTable.append(row);
	mainDiv.append(ordersTable);
	getAllOrders();
}
/*
 * the function gets a list of all orders from the database
 */		
function getAllOrders() {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'GetAllOrdersController', true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send();
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
 * the function fills the table with information about all orders
 */
function fillOrdersTable(orders) {
	for (var i = 0; i < orders.length; i++) {
		var row = getDiv('orderTable-row', 'orderTable-row');
		var id = orders[i].id;
		var date = parseDate(orders[i].date);
		var login = orders[i].user.login;
		var cost = orders[i].totalCost;
		var accepted = orders[i].accepted;
		var paid = orders[i].paid;
		accepted == true ? accepted = yesLabel : accepted = noLabel;
		paid == true ? paid = yesLabel : paid = noLabel;
		var order = new Array(id, date, login, cost, accepted, paid);
		for (var j = 0; j < 6; j++) {
			var cell = getDiv('orderTable-cell', 'orderTable-cell');
			j == 0 ? cell.style.width = '7%' : cell.style.width = '15%'; 
			cell.append(order[j]);
			row.append(cell);
			orderJson = JSON.stringify(orders[i]);
			row.id = i;
			row.setAttribute('onclick', "showOrderInfo('" + orderJson + "')");
			row.style.cursor = "pointer";
		}
		document.getElementById('orderTable').append(row);
	}
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