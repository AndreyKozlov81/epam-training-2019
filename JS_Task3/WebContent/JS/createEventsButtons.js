var checkNameMessage = empty;
var checkPassMessage = empty;
var checkMailMessage = empty;
var checkConfPassMessage = empty;
var count = 0;
var logInput = document.getElementById('login-log');
var passInput = document.getElementById('password-log');
var reglogInput = document.getElementById('login-reg');
var regMailInput = document.getElementById('email');
var regPassInput = document.getElementById('password-reg');
var regConfPassInput = document.getElementById('confPassword');
document.getElementById('login').addEventListener('mousedown', clickLogin, false); 
document.getElementById('reg').addEventListener('mousedown', clickRegister, false);

/*
 * function when you click the login button
 */
function clickLogin() {
	var name = document.getElementById('login-log').value;
	var password = document.getElementById('password-log').value;
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
	var name = document.getElementById('login-reg').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password-reg').value;
	var confPass = document.getElementById('confPassword').value;
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
		checkNameMessage = "invalid name";
		count++;
	}else{
		checkNameMessage = empty;
	}
	if(!passRegEx.test(password)){
		checkPassMessage = "invalid password";
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
		checkNameMessage = "invalid name";
		count++;
	}else{
		checkNameMessage = empty;
	}
	if(!emailRegEx.test(email)){
		checkMailMessage = "invalid email";
		count++;
	}else{
		checkMailMessage = empty;
	}
	if(!passRegEx.test(password)){
		checkPassMessage = "invalid password";
		count++;
	}else{
		checkPassMessage = empty;
	}
	if((!confPassRegEx.test(confPass)) || (confPass != password)){
		checkConfPassMessage = "invalid confirm password";
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
	document.getElementById(nameIdInput).style.border = "1px solid #22AC8A";
	document.getElementById(nameIdInput).style.color = "#22AC8A";
}