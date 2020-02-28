/*
 * the function shows the menu editing section
 */
function showDishEditorSection() {
	if(document.getElementById('orderTable') != null){
		document.getElementById('orderTable').remove();
	}
	if(document.getElementById('menuSection') != null){
		document.getElementById('menuSection').remove();
	}
	document.getElementById('form-title').innerHTML = allDishesLabel;
	buttonDishEditorOut.style.display = 'inline-block';
	buttonAddDish.style.display = 'inline-block';
	buttonAddDish.addEventListener('click', showAddDishSection, false);
	buttonDishEditor.style.display = 'none';
	buttonLogOut.style.display = 'none';
	
	var menuSection = getDiv('menuSection', 'menuSection');
	var mainDiv = document.getElementById('main');
	mainDiv.append(menuSection);
	fillMenuSection();
}
/*
 * the function fills menu section with rows containing
 * information about dishes
 */
function fillMenuSection() {
	var menuSection = document.getElementById('menuSection');
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
				sessionStorage.menu = JSON.stringify(dishes);
				var arrTitles = new Array('№', nameDishLabel, priceLabel);
				var row = getRowDishHeader(arrTitles);
				menuSection.append(row);
				for (var i = 0; i < dishes.length; i++) {
					var row = getRowDishInfo(dishes[i]);
					menuSection.append(row);
				}
			}
		}
	};
}
/*
 * the function gets a dish object as a parameter
 * creates a row from the object's fields and returns this row
 */
function getRowDishInfo(dish) {
	var arrDish = new Array(dish.id, dish.name, dish.cost);
	var row = getDiv('idDish-'+dish.id, 'orderTable-row');
	for (var i = 0; i < arrDish.length; i++) {
		switch (i) {
			case 0:	var cell = getDiv('id', 'orderTable-cell'); break;
			case 1:	var cell = getDiv('name', 'orderTable-cell'); break;
			case 2:	var cell = getDiv('cost', 'orderTable-cell'); break;
		}
		i == 0 ? cell.style.width = '9%' : cell.style.width = '25%'; 
		cell.append(arrDish[i]);
		row.append(cell);
	}
	var editBut = getInput('button', 'editBut', 'log-button', editButLabel);
	editBut.style.marginTop = '5px';
	editBut.addEventListener('click', () => {editDish(dish)}, false);
	row.append(editBut);
	
	var deleteDishBut = getInput('button', 'deleteDishBut', 'log-button', deleteButLabel);
	deleteDishBut.style.marginTop = '5px';
	deleteDishBut.addEventListener('click', () => {deleteDish(dish)}, false);
	row.append(deleteDishBut);
	
	var saveBut = getInput('button', 'saveBut', 'log-button', saveButLabel);
	saveBut.style.marginTop = '5px';
	saveBut.style.display = 'none';
	row.append(saveBut);
	
	var cancelBut = getInput('button', 'cancelEditBut', 'log-button', cancelLabel);
	cancelBut.style.marginTop = '5px';
	cancelBut.style.display = 'none';
	row.append(cancelBut);
		
	return row;
}
/*
 * the function gets an array of header names as a parameter
 * creates a row from them and returns this row
 */
function getRowDishHeader(arrTitles) {
	var row = getDiv('headerDish', 'orderTable-row');
	for (var i = 0; i < arrTitles.length; i++) {
		var cell = getDiv('', 'orderTable-cell');
		i == 0 ? cell.style.width = '9%' : cell.style.width = '25%'; 
		cell.append(arrTitles[i]);
		row.append(cell);
	}
	return row;
}
/*
 * function edit the selected dish
 */
function editDish(dish) {
	if(document.getElementById('nameDishInput') == null && document.getElementById('costDishInput') == null){
		var row = document.getElementById('idDish-'+dish.id);
		for (var i = 1; i < row.childNodes.length-4; i++) {
			var input = getInput('text', row.childNodes[i].id+'DishInput', 'input', row.childNodes[i].innerText);
			input.style.width = '90%';
			input.style.height = '70%';
			row.childNodes[i].innerText = '';
			row.childNodes[i].appendChild(input);
		}
		row.childNodes[3].style.display = 'none';
		row.childNodes[4].style.display = 'none';
		row.childNodes[5].style.display = 'inline-block';
		var id = 'idDish-'+dish.id;
		var name = document.getElementById('nameDishInput').value;
		var cost = document.getElementById('costDishInput').value;
		row.childNodes[5].setAttribute('onclick', 'saveDish("'+id+'","'+ name+ '",'+ cost +')');
		row.childNodes[6].style.display = 'inline-block';
		row.childNodes[6].setAttribute('onclick', 'cancelEditDish("'+name+'",' + cost+',"'+id+'")');
	}
	
}
/*
 * this function removes the selected dish from the menu
 */
function deleteDish(dish) {
	if(confirm(confirmDelDish)){
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", 'DeleteDishController', true);
		httpRequest.setRequestHeader('Content-Type', 'application/text; charset=UTF-8');
		httpRequest.send(dish.id);
		httpRequest.responseType = 'json';
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState == XMLHttpRequest.DONE){
				if(httpRequest.status == 200){
					if(httpRequest.response == true){
						alert('Dish ' + dish.name + ' deleted');
						var row = document.getElementById('idDish-'+dish.id);
						row.remove();
					}else{
						alert(dishExistsOrders);
					}
				}
			}
		};
		
	}
}
/*
 * the function shows a section with a form for adding a new dish to the menu
 */
function showAddDishSection() {
	if(document.getElementById('addDishSection') == null){
		buttonAddDish.style.display = 'none';
		var addDishSection = getDiv('addDishSection', 'addDishSection');
		var addDishHeader = getDiv('addDishHeader', 'addDishHeader');
		var nameDiv = getDiv('','nameDishHeader');
		nameDiv.append(enterNameDishLabel);
		var costDiv = getDiv('','nameDishHeader');
		costDiv.append(enterPriceDishLabel);
		costDiv.style.marginLeft = '60px';
		addDishHeader.append(nameDiv);
		addDishHeader.append(costDiv);
		addDishSection.append(addDishHeader);
		var formAddDish = document.createElement('form');
		formAddDish.id = 'formAddDish';
		formAddDish.style.width = '90%';
		formAddDish.style.margin = "0 auto";
		var nameDishInput = getInput('text', 'nameDishInput', 'input', '');
		nameDishInput.style.width = '120px';
		nameDishInput.style.height = '27px';
		nameDishInput.style.marginLeft = '20px';
		formAddDish.append(nameDishInput);
		var costDishInput = getInput('text', 'costDishInput', 'input', '');
		costDishInput.style.width = '30px';
		costDishInput.style.height = '27px';
		costDishInput.style.marginLeft = '50px';
		formAddDish.append(costDishInput);
		var addDishBut = getInput('button', 'addDishBut', 'log-button', addDishButLabel);
		addDishBut.addEventListener('click', () => {addDishToMenu(nameDishInput.value, costDishInput.value)}, false);
		addDishBut.style.marginLeft = '50px';
		formAddDish.append(addDishBut);
		var cancelBut = getInput('button', 'cancelBut', 'log-button', cancelLabel);
		cancelBut.addEventListener('click', cancelAddDish, false);
		formAddDish.append(cancelBut);
		addDishSection.append(formAddDish);
		menuSection.before(addDishSection);
	}
}
/*
 * the function adds a dish to the database
 */
function addDishToMenu(name, cost) {
	var addDishSection = document.getElementById('addDishSection');
	if(name == 0 || cost <= 0 || parseInt(cost, 10) * 0 != 0){
		alert(incorrectDataLabel);
	}else{
		cost = cost.replace(',','.');
		var dish = {
			name: name,
			cost: cost
		}
		var jsonDish = JSON.stringify(dish);
		var httpRequest = new XMLHttpRequest();
		if(sessionStorage.getItem('language') == 'ru'){
			var controller = 'AddDishControllerRu';
		}else{
			var controller = 'AddDishController';
		}
		httpRequest.open("POST", controller, true);
		httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		httpRequest.send(jsonDish);
		httpRequest.send(jsonDish);
		httpRequest.responseType = 'text';
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState == XMLHttpRequest.DONE){
				if(httpRequest.status == 200){
					if(httpRequest.response == "true"){
						if(addDishSection != null){
							addDishSection.remove();
						}
						if(document.getElementById('menuSection') != null){
							document.getElementById('menuSection').remove();
						}
						var menuSection = getDiv('menuSection', 'menuSection');
						var mainDiv = document.getElementById('main');
						mainDiv.append(menuSection);
						fillMenuSection();
						buttonAddDish.style.display = 'inline-block';
						alert(dishAddSucLabel);
					}else{
						alert(dishNotAddLabel);
					}
				}
			}
		};
	}
}
/*
 * 
 */
function cancelAddDish() {
	document.getElementById('addDishSection').remove();
	buttonAddDish.style.display = 'inline-block';
}
/*
 * 
 */
function saveDish(idRow, oldName, oldCost) {
	var row = document.getElementById(idRow);
	var id = row.childNodes[0].innerText;
	var name = row.childNodes[1].firstChild.value;
	var cost = row.childNodes[2].firstChild.value;
	if(name == 0 || cost <= 0 || parseInt(cost, 10) * 0 != 0){
		alert(incorrectDataLabel);
	}else{
		if(confirm(confirmChangeDish)){
			cost = cost.replace(',','.');
			var dish = {
					id: id,
					name: name,
					cost: cost
				}
			var jsonDish = JSON.stringify(dish);
			var httpRequest = new XMLHttpRequest();
			if(sessionStorage.getItem('language') == 'ru'){
				var controller = 'UpdateDishControllerRu';
			}else{
				var controller = 'UpdateDishController';
			}
			httpRequest.open("POST", controller, true);
			httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			httpRequest.send(jsonDish);
			httpRequest.responseType = 'text';
			httpRequest.onreadystatechange = function(){
				if (httpRequest.readyState == XMLHttpRequest.DONE){
					if(httpRequest.status == 200){
						if(httpRequest.response == "true"){
							if(document.getElementById('menuSection') != null){
								document.getElementById('menuSection').remove();
							}
							var menuSection = getDiv('menuSection', 'menuSection');
							var mainDiv = document.getElementById('main');
							mainDiv.append(menuSection);
							fillMenuSection();
						}else{
							alert(dishExistsOrders);
							cancelEditDish(oldName, oldCost, idRow);
						}
					}
				}
			};
		}
	}
}
/*
 * 
 */
function cancelEditDish(name, cost, id) {
	var row = document.getElementById(id);
	row.childNodes[1].innerText = name;
	row.childNodes[2].innerText = cost;
	row.childNodes[5].style.display = 'none';
	row.childNodes[6].style.display = 'none';
	row.childNodes[3].style.display = 'inline-block';
	row.childNodes[4].style.display = 'inline-block';
}

