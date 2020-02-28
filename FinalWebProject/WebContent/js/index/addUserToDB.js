/*
 * the function adds the user to the database
 */
function addUserToDB(login, email, password) {
	document.getElementById('load').innerHTML = "Loading data...";
	jsonUser = JSON.stringify({
		login: login,
		email: email,
		password: password
	});
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'RegController', true);
	httpRequest.setRequestHeader('Content-Type', 'text/html; charset=UTF-8');
	httpRequest.send(jsonUser);
	httpRequest.responseType = 'text';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			document.getElementById('load').innerHTML = empty;
			if(httpRequest.status == 200){
				var userResponse = httpRequest.response; 
				if(userResponse == "true"){
					document.getElementById('form-reg').style.display = "none";
					document.getElementById('form-log').style.display = "block";
					buttonLog.style.display = "none";
					buttonReg.style.display = "inline-block";
					document.getElementById('form-title').innerHTML = "LogIn";
					reglogInput.value = empty;
					regMailInput.value = empty;
					regPassInput.value = empty;
					regConfPassInput.value = empty;
					document.getElementById('info').innerHTML = "User successfully registered";
				}else{
					document.getElementById('load').innerHTML = "User with this name or email exists";
				}
			}
		}
	};
}