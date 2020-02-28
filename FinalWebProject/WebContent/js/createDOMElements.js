function getInput(type, id, nameClass, value) {
	var button = document.createElement('input');
	button.type = type;
	button.id = id;
	button.className = nameClass;
	button.value = value;
	return button;
}

function getDiv(id, nameClass) {
	var div = document.createElement('div');
	div.id = id;
	div.className = nameClass;
	return div;
}
