var user = null;
const empty = '';
var checkNameMessage = empty;
var checkPassMessage = empty;
var checkMailMessage = empty;
var checkConfPassMessage = empty;
var count = 0;
delete sessionStorage.user;
delete sessionStorage.order;
delete sessionStorage.dishes;

var mainDiv = document.querySelector('.main');	
var langBut = getInput('button','lang','log-button','');
if(sessionStorage.getItem('language') == 'ru'){
	langBut.value = 'En';
}else{
	langBut.value = 'Ru';
}
langBut.addEventListener('click', selectLang, false);
mainDiv.append(langBut);
var buttonLog = getInput('button','log-button','log-button', login);
buttonLog.addEventListener('click', showFormLog, false);
mainDiv.append(buttonLog);
var buttonReg = getInput('button','reg-button','log-button', registration);
buttonReg.addEventListener('click', showFormReg, false);
mainDiv.append(buttonReg);
var infoDiv = getDiv('info');
infoDiv.append(welcomeToMyRestaurant);
mainDiv.append(infoDiv);
var dateDiv = getDiv('date');
mainDiv.append(dateDiv);
/*
 * function selection of the interface language
 */
function selectLang() {
	if(sessionStorage.getItem('language') == 'ru'){
		sessionStorage.setItem('language', 'en');
	}else{
		sessionStorage.setItem('language', 'ru');
	}
	location = "/FinalWebProject";
}
/*
 * the function hides the registration form and shows the login form
 */
function showFormLog() {
	if(document.getElementById('form-reg') != null){
		document.getElementById('form-reg').remove();
	}
	if(document.getElementById('form-title') != null){
		document.getElementById('form-title').remove();
		var formTitle = getDiv('form-title');
		formTitle.append(login);
		mainDiv.append(formTitle);
	}else{
		var formTitle = getDiv('form-title');
		formTitle.append(login);
		mainDiv.append(formTitle);
	}
	var arrTitles = new Array(enterName, enterPass);	
	var arrIdTitles = new Array("login-title", "password-title");
	var arrIdInputs = new Array("login-log", "password-log");
	var arrTypeInputs = new Array("text", "password");
	var formLog = document.createElement('form');
	formLog.id = "form-log";
	formLog.className = "form";
	for (var i = 0; i < arrTitles.length; i++) {
		var titleDiv = getDiv(arrIdTitles[i], 'title');
		titleDiv.append(arrTitles[i]);
		var input = getInput(arrTypeInputs[i], arrIdInputs[i], 'input', '');
		formLog.append(titleDiv);
		formLog.append(input);
	}
	var butLog = getInput('button', 'login', 'button', login);
	butLog.addEventListener('mousedown', clickLogin, false);
	formLog.append(butLog);
	mainDiv.append(formLog);
	buttonLog.style.display = "none";
	buttonReg.style.display = "inline-block";
	var loadDiv = getDiv('load');
	loadDiv.innerText = empty;
	mainDiv.append(loadDiv);
	infoDiv.innerText = empty;
	if(document.getElementById('login-reg-error') != null){
		clearInput(reglogInput.id);
	}
	if(document.getElementById('email-error') != null){
		clearInput(regMailInput.id);
	}
	if(document.getElementById('password-reg-error') != null){
		clearInput(regPassInput.id);
	}
	if(document.getElementById('confPassword-error') != null){
		clearInput(regConfPassInput.id);
	}
}
/*
 * the function hides the login form and shows the new user registration form
 */
function showFormReg() {
	if(document.getElementById('form-log') != null){
		document.getElementById('form-log').remove();
	}
	if(document.getElementById('form-title') != null){
		document.getElementById('form-title').remove();
		var formTitle = getDiv('form-title');
		formTitle.append(registration);
		mainDiv.append(formTitle);
	}else{
		var formTitle = getDiv('form-title');
		formTitle.append(registration);
		mainDiv.append(formTitle);
	}
	var arrTitles = new Array(enterName, enterEmail, enterPass, confPass);	
	var arrIdTitles = new Array("login-title", "email-title", "password-title", "confPassword-title");
	var arrIdInputs = new Array("login-reg", "email", "password-reg", "confPassword");
	var arrTypeInputs = new Array("text", "email", "password", "password");
	var formReg = document.createElement('form');
	formReg.id = "form-reg";
	formReg.className = "form";
	for (var i = 0; i < arrTitles.length; i++) {
		var titleDiv = getDiv(arrIdTitles[i], 'title');
		titleDiv.append(arrTitles[i]);
		var input = getInput(arrTypeInputs[i], arrIdInputs[i], 'input', '');
		formReg.append(titleDiv);
		formReg.append(input);
	}
	var butReg = getInput('button', 'reg', 'button', registration);
	butReg.addEventListener('mousedown', clickRegister, false);
	formReg.append(butReg);
	mainDiv.append(formReg);
	
	
	//var formReg = document.getElementById('form-reg');
	//formReg.style.display = "block";
	//document.getElementById('form-title').innerHTML = registration;
	buttonReg.style.display = "none";
	buttonLog.style.display = "inline-block";
	var loadDiv = getDiv('load');
	loadDiv.innerText = empty;
	mainDiv.append(loadDiv);
	infoDiv.innerText = empty;
	if(document.getElementById('login-log-error') != null){
		clearInput(logInput.id);
	}
	if(document.getElementById('password-log-error') != null){
		clearInput(passInput.id);
	}
}
/*
 * function when you click the login button
 */
function clickLogin() {
	var logInput = document.getElementById('login-log');
	var passInput = document.getElementById('password-log');
	var name = logInput.value;
	var password = passInput.value;
	name = name.replace(/\s/g, empty);
	password = password.replace(/\s/g, empty);
	//validation of input data
	checkLogData(name, password);
	if(count == 0){
		if(document.getElementById('login-log-error') != null){
			clearInput(logInput.id);
		}
		if(document.getElementById('password-log-error') != null){
			clearInput(passInput.id);
		}
		//sending data to the server and receiving a response
		getUserFromDB(name, password);
	}else{
		/*
		 * checking for errors and displaying an error message or 
		 * clearing the input form when data is entered correctly
		 */
		if(checkNameMessage.length != 0 && document.getElementById('login-log-error') == null){
			//output a message about incorrect data entered
			addErrorMessage(logInput, checkNameMessage);
			checkNameMessage = empty;
		}else{
			if(checkNameMessage.length == 0 && document.getElementById('login-log-error') != null){
				//clearing the input form when incorrect data is entered
				clearInput(logInput.id);
			}
		}
		if(checkPassMessage.length != 0 && document.getElementById('password-log-error') == null){
			addErrorMessage(passInput, checkPassMessage);
			checkPassMessage = empty;
		}else{
			if(checkPassMessage.length == 0 && document.getElementById('password-log-error') != null){
				clearInput(passInput.id);
			}
		}
	}
}

/*
 * function when you click the registration button
 */
function clickRegister() {
	var reglogInput = document.getElementById('login-reg');
	var regMailInput = document.getElementById('email');
	var regPassInput = document.getElementById('password-reg');
	var regConfPassInput = document.getElementById('confPassword');
	var name = reglogInput.value;
	var email = regMailInput.value;
	var password = regPassInput.value;
	var confPass = regConfPassInput.value;
	name = name.replace(/\s/g, empty);
	email = email.replace(/\s/g, empty);
	password = password.replace(/\s/g, empty);
	confPass = confPass.replace(/\s/g, empty);
	//validation of input data
	checkRegData(name, email, password, confPass);
	if(count == 0){
		if(document.getElementById('login-reg-error') != null){
			clearInput(reglogInput.id);
		}
		if(document.getElementById('email-error') != null){
			clearInput(regMailInput.id);
		}
		if(document.getElementById('password-reg-error') != null){
			clearInput(regPassInput.id);
		}
		if(document.getElementById('confPassword-error') != null){
			clearInput(regConfPassInput.id);
		}
		//sending data to the server and receiving a response
		addUserToDB(name, email, password);
	}else{
		/*
		 * checking for errors and displaying an error message or 
		 * clearing the input form when data is entered correctly
		 */
		if(checkNameMessage.length != 0 && document.getElementById('login-reg-error') == null){
			//output a message about incorrect data entered
			addErrorMessage(reglogInput, checkNameMessage);
			checkNameMessage = empty;
		}else{
			if(checkNameMessage.length == 0 && document.getElementById('login-reg-error') != null){
				//clearing the input form when incorrect data is entered
				clearInput(reglogInput.id);
			}
		}
		if(checkMailMessage.length != 0 && document.getElementById('email-error') == null){
			addErrorMessage(regMailInput, checkMailMessage);
			checkMailMessage = empty;
		}else{
			if(checkMailMessage.length == 0 && document.getElementById('email-error') != null){
				clearInput(regMailInput.id);
			}
		}
		if(checkPassMessage.length != 0 && document.getElementById('password-reg-error') == null){
			addErrorMessage(regPassInput, checkPassMessage);
			checkPassMessage = empty;
		}else{
			if(checkPassMessage.length == 0 && document.getElementById('password-reg-error') != null){
				clearInput(regPassInput.id);
			}
		}
		if(checkConfPassMessage.length != 0 && document.getElementById('confPassword-error') == null){
			addErrorMessage(regConfPassInput, checkConfPassMessage);
			checkConfPassMessage = empty;
		}else{
			if(checkConfPassMessage.length == 0 && document.getElementById('confPassword-error') != null){
				clearInput(regConfPassInput.id);
			}
		}
	}
}
/*
 * the function checks the entered data in the login form for validity
 */
function checkLogData(name, password) {
	count = 0;
	var nameRegEx = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/;
	var passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	if(!nameRegEx.test(name)){
		checkNameMessage = invalidName;
		count++;
	}else{
		checkNameMessage = empty;
	}
	if(!passRegEx.test(password)){
		checkPassMessage = invalidPass;
		count++;
	}else{
		checkPassMessage = empty;
	}
}

/*
 * the function of checking the entered data in the registration form for validity
 */
function checkRegData(name, email, password, confPass) {
	count = 0;
	var nameRegEx = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/;
	var emailRegEx = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
	var passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	var confPassRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	if(!nameRegEx.test(name)){
		checkNameMessage = invalidName;
		count++;
	}else{
		checkNameMessage = empty;
	}
	if(!emailRegEx.test(email)){
		checkMailMessage = invalidEmail;
		count++;
	}else{
		checkMailMessage = empty;
	}
	if(!passRegEx.test(password)){
		checkPassMessage = invalidPass;
		count++;
	}else{
		checkPassMessage = empty;
	}
	if((!confPassRegEx.test(confPass)) || (confPass != password)){
		checkConfPassMessage = invalidConfPass;
		count++;
	}else{
		checkConfPassMessage = empty;
	}
}

/*
 * the function for displaying a message when invalid data is entered
 */
function addErrorMessage(element, message) {
	var errorMessage = document.createElement('div');
	errorMessage.setAttribute('class', 'error-message');
	errorMessage.setAttribute('id', element.id + '-error');
	errorMessage.append(message);
	element.insertAdjacentElement('afterend', errorMessage);
	element.style.border = "1px solid red";
	element.style.color = "red";
}
/*
 * the function deletes the error message and returns the input fields to their original state
 */		
function clearInput(nameIdInput) {
	document.getElementById(nameIdInput + '-error').remove();
	document.getElementById(nameIdInput).style.border = "1px solid #C55406";
	document.getElementById(nameIdInput).style.color = "#C55406";
}