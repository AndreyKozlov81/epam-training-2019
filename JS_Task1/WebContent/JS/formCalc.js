function createCalc() {
	var calc = document.createElement('div');
	var br = document.createElement('br');
	var plus = getButton('operationButton', 'plus');
	var minus = getButton('operationButton', 'minus');
	var multiply = getButton('operationButton', 'multiply');
	var divide = getButton('operationButton', 'divide');
	var c = getButton('clearButton',"");
	var equals = getButton('equalsButton',"");
	calc.setAttribute('class', 'mainDiv');
	calc.append(getInput());
	plus.value = '+';
	minus.value = '-';
	multiply.value = '*';
	divide.value = '/';
	c.value = 'C';
	equals.value = '=';
	
	for (var i = 1; i < 11; i++) {
		if(i == 10){
			calc.append(getButton('numberButton', 0));
		}else{
			calc.append(getButton('numberButton', i));
		}
		switch (i) {
		case 3:
			calc.append(br);
			br.insertAdjacentElement('beforebegin', plus);
			break;
		case 6:
			calc.append(br);
			br.insertAdjacentElement('beforebegin', minus);
			break;
		case 9:
			calc.append(br);
			br.insertAdjacentElement('beforebegin', multiply);
			break;
		}
	}
	calc.append(c);
	calc.append(equals);
	calc.append(divide);
	document.body.append(calc);
}

function getButton(func, value) {
	var button = document.createElement('input');
	button.type = 'button';
	button.setAttribute('class', 'number');
	button.setAttribute('onclick', func + '(' + value + ')');
	button.value = value;
	return button;
}

function getInput() {
	var input = document.createElement('div');
	input.setAttribute('class', 'input');
	input.setAttribute('id', 'input');
	return input;
}