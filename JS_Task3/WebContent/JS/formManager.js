var user = null;
const empty = "";	
var buttonLog = document.getElementById('log-button');
var buttonReg = document.getElementById('reg-button');
var buttonLogOut = document.getElementById('logout-button');
buttonLog.addEventListener('mousedown', showFormLog, false);
buttonReg.addEventListener('mousedown', showFormReg, false);
buttonLogOut.addEventListener('mousedown', logOut, false);
checkUserLogIn();

/*
 * the function hides the registration form and shows the login form
 */
function showFormLog() {
	if(document.getElementById('form-reg') != null){
		var formReg = document.getElementById('form-reg');
		formReg.style.display = "none";
	}
	var formLog = document.getElementById('form-log');
	formLog.style.display = "block";
	document.getElementById('form-title').innerHTML = "LogIn";
	buttonLog.style.display = "none";
	buttonReg.style.display = "inline-block";
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
		var formLog = document.getElementById('form-log');
		formLog.style.display = "none";
	}
	var formReg = document.getElementById('form-reg');
	formReg.style.display = "block";
	document.getElementById('form-title').innerHTML = "Registration";
	buttonReg.style.display = "none";
	buttonLog.style.display = "inline-block";
	document.getElementById('info').innerHTML = empty;
	document.getElementById('load').innerHTML = empty;
	if(document.getElementById('login-log-error') != null){
		clearInput(logInput.id);
	}
	if(document.getElementById('password-log-error') != null){
		clearInput(passInput.id);
	}
}

/*
 * logout function
 */
function logOut() {
	showFormLog();
	buttonLog.style.display = "inline-block";
	buttonReg.style.display = "inline-block";
	buttonLogOut.style.display = "none";
	document.getElementById('form-title').style.display = "block";
	document.getElementById('form-title').innerHTML = "LogIn";
	document.getElementById('info').innerHTML = empty;
	deleteCookie('idUser');
	
}

/*
 * the function shows the main screen
 */
function showMainDisplay() {
	buttonLog.style.display = "inline-block";
	buttonReg.style.display = "inline-block";
	buttonLogOut.style.display = "none";
	document.getElementById('form-reg').style.display = "none";
	document.getElementById('form-log').style.display = "none";
	document.getElementById('form-title').innerHTML = empty;
	document.getElementById('info').innerHTML = empty;
	document.getElementById('load').innerHTML = empty;
}