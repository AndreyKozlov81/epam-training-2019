function checkUserLogIn() {
	var idUser = getCookie('idUser');
	if(idUser != undefined){
		jsonUser = JSON.stringify({
			id: idUser
		});
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", 'CheckLogInController', true);
		httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		httpRequest.send(jsonUser);
		httpRequest.responseType = 'json';
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState == XMLHttpRequest.DONE){
				document.getElementById('load').innerHTML = empty;
				if(httpRequest.status == 200){
					user = httpRequest.response; 
					if(user != null){
						buttonLog.style.display = 'none';
						buttonReg.style.display = 'none';
						buttonLogOut.style.display = 'inline-block';
						document.getElementById('info').innerHTML = "Welcome " + user.name;	
						document.getElementById('form-log').style.display = "none";
						document.getElementById('form-title').style.display = "none";
						logInput.value = empty;
						passInput.value = empty;
					}else{
						showMainDisplay();
						deleteCookie('idUser');
					}
				}
			}
		};
	}else{
		showMainDisplay();
	}
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
function deleteCookie(name) {
  setCookie (name, "", {
    'max-age': -1
  });
}