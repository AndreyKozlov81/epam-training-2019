/*
 *checking for the presence of a user in the session,
 *if the user exists, then show information about it,
 *if the user does not exist, then reload to the main page 
 */
if(sessionStorage.user != null){
	var user = JSON.parse(sessionStorage.user);
	buttonLogOut.addEventListener('click', logOut, false);
	buttonOrderOut.style.display = 'none';
	buttonOrderOut.addEventListener('click', orderOut, false);
	buttonDishEditor.addEventListener('click', showDishEditorSection, false);
	buttonDishEditorOut.addEventListener('click', dishEditorSectionOut, false);
	buttonDishEditorOut.style.display = 'none';
	buttonAddDish.style.display = 'none';
	infoDiv.innerText = user.login;
	formTitle.innerText = allOrdersLabel;
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
if(sessionStorage.menu != null){
	showDishEditorSection();
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
	buttonDishEditor.style.display = 'inline-block';
	document.getElementById('form-title').innerHTML = allOrdersLabel;
	showAllOrders();
}
/*
 * 
 */
function dishEditorSectionOut() {
	buttonDishEditorOut.style.display = 'none';
	buttonAddDish.style.display = 'none';
	buttonDishEditor.style.display = 'inline-block';
	buttonLogOut.style.display = 'inline-block';
	document.getElementById('menuSection').remove();
	if(document.getElementById('addDishSection') != null){
		document.getElementById('addDishSection').remove();
	}
	document.getElementById('form-title').innerHTML = allOrdersLabel;
	showAllOrders();
	delete sessionStorage.menu;
}