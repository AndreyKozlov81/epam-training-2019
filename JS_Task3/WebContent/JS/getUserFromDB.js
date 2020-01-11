function getUserFromDB(name, password) {
	document.getElementById('load').innerHTML = "Loading data...";
	jsonUser = JSON.stringify({
		name: name,
		password: password
	});
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", 'LogInController', true);
	httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	httpRequest.send(jsonUser);
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState == XMLHttpRequest.DONE){
			document.getElementById('load').innerHTML = empty;
			if(httpRequest.status == 200){
				user = httpRequest.response; 
				if(user != null){
					document.getElementById('form-log').style.display = "none";
					document.getElementById('form-title').style.display = "none";
					buttonLog.style.display = 'none';
					buttonReg.style.display = 'none';
					buttonLogOut.style.display = 'inline-block';
					logInput.value = empty;
					passInput.value = empty;
					document.getElementById('info').innerHTML = "Welcome " + user.name;	
				}else{
					document.getElementById('info').innerHTML = empty;	
					document.getElementById('load').innerHTML = "User with this name and password not found";
					logInput.value = empty;
					passInput.value = empty;
				}
			}
		}
	};
}