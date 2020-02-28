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
var addOrderBut = getInput('button', 'addOrder-button', 'log-button', addOrderButLabel);
mainDiv.append(addOrderBut);
var addOrderOutBut = getInput('button', 'addOrderOut-button', 'log-button', back);
addOrderOutBut.style.display = 'none';
mainDiv.append(addOrderOutBut);
var buttonOrderOut = getInput('button', 'orderout-button', 'log-button', back);
buttonOrderOut.style.display = 'none';
mainDiv.append(buttonOrderOut);
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
	location = "/FinalWebProject/customer.html";
}