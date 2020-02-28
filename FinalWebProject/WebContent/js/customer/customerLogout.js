/*
 *checking for the presence of a user in the session,
 *if the user exists, then show information about it,
 *if the user does not exist, then reload to the main page 
 */
if(sessionStorage.user != null){
	var user = JSON.parse(sessionStorage.user);
	buttonLogOut.addEventListener('mousedown', logOut, false);
	buttonOrderOut.style.display = 'none';
	buttonOrderOut.addEventListener('mousedown', orderOut, false);
	infoDiv.innerText = user.login;
}else{
	location = "/FinalWebProject";
}
/*
 * checking for an order in a session
 * if the order exists, then show information about it
 */
if(sessionStorage.order != null){
	showOrderInfo(sessionStorage.order);
}
/*
 * if the addOrder key exists in the session, then we show the section for adding an order
 */
if(sessionStorage.getItem('addOrder') != null){
	addOrder();
	var sectionAddOrder = document.getElementById('sectionAddOrder');
	if(sessionStorage.dishes != null){
		var map = new Map(JSON.parse(sessionStorage.dishes));
		var dishes = map.keys();
		var numbers = map.values();
		for (var i = 0; i < map.size; i++) {
			var dish = dishes.next().value;
			var amount = numbers.next().value;
			var row = getDishRow(dish, amount, map);
			sectionAddOrder.append(row);
		}
		if(map.size > 0){
			var sendOrderBut = getInput('button', 'sendOrderBut', 'log-button', makeOrderButLabel);
			sendOrderBut.style.margin = '10 auto';
			sendOrderBut.addEventListener('mousedown', sendOrder, false);
			var mainDiv = document.getElementById('main');
			mainDiv.append(sendOrderBut);
		}
	}
}
/*
 * the function removes the user from the session and reloads to the main page 
 */
function logOut() {
	delete sessionStorage.user;
	location = "/FinalWebProject";
}
/*
 * the function deletes an order from the session, 
 * deletes the table with order information, 
 * and displays a table with information about all orders 
 */
function orderOut() {
	delete sessionStorage.order;
	delete sessionStorage.dishes;
	orderInfoTable.remove();
	buttonOrderOut.style.display = 'none';
	buttonLogOut.style.display = 'inline-block';
	addOrderBut.style.display = 'inline-block';
	formTitle.innerText = allOrdersLabel;
	showAllOrdersOfCust();
}
/*
 * the function removes the section for adding dishes to an order 
 * and displays a table with information about all customer orders
 */
function addOrderOut() {
	sessionStorage.removeItem('addOrder');
	delete sessionStorage.dishes;
	var sectionAddOrder = document.getElementById('sectionAddOrder');
	sectionAddOrder.remove();
	formTitle.innerText = "";
	addOrderBut.style.display = 'inline-block';
	buttonLogOut.style.display = 'inline-block';
	langBut.style.display = 'inline-block';
	addOrderOutBut.style.display = 'none';
	if(document.getElementById('sendOrderBut') != null){
		document.getElementById('sendOrderBut').remove();
	}
	showAllOrdersOfCust();
}