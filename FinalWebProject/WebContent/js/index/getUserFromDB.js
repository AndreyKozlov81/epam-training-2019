/*
 * the function gets the user from the database by username and password
 */
function getUserFromDB(login, password) {
	document.getElementById('load').innerHTML = "Loading data...";
	jsonUser = JSON.stringify({
		login: login,
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
					switch(user.role){
					case "admin":
						sessionStorage.user = JSON.stringify(user);
						location = '/FinalWebProject/admin.html';
						break;
					case "customer":
						sessionStorage.user = JSON.stringify(user);
						location = '/FinalWebProject/customer.html';
						break;
					}
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