var mainDiv = document.getElementById('main');
var langBut = getInput('button','lang','log-button','');
if(sessionStorage.getItem('language') == 'ru'){
	langBut.value = 'En';
}else{
	langBut.value = 'Ru';
}
langBut.addEventListener('click', selectLang, false);
mainDiv.append(langBut);
var buttonLogOut = getInput('button', 'logout-button', 'log-button', logout);
mainDiv.append(buttonLogOut);
var buttonOrderOut = getInput('button', 'orderout-button', 'log-button', back);
buttonOrderOut.style.display = 'none';
mainDiv.append(buttonOrderOut);
var buttonDishEditor = getInput('button', 'dishEditor-button', 'log-button', menuEditor);
mainDiv.append(buttonDishEditor);
var buttonDishEditorOut = getInput('button', 'dishEditorOut-button', 'log-button', back);
buttonDishEditorOut.style.display = 'none';
mainDiv.append(buttonDishEditorOut);
var buttonAddDish = getInput('button', 'addNewDish-button', 'log-button', addDish);
buttonAddDish.style.display = 'none';
mainDiv.append(buttonAddDish);
var infoDiv = getDiv('info');
mainDiv.append(infoDiv);
var dateDiv = getDiv('date');
mainDiv.append(dateDiv);
var formTitle = getDiv('form-title');
mainDiv.append(formTitle);

function selectLang() {
	if(sessionStorage.getItem('language') == 'ru'){
		sessionStorage.setItem('language', 'en');
	}else{
		sessionStorage.setItem('language', 'ru');
	}
	location = "/FinalWebProject/admin.html";
}