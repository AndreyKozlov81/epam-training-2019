var res = 0;
var valueFirst = 0;
var valueSecond = 0;
var flag = true;
const empty = "empty";
const plus = "plus";
const minus = "minus";
const multiply = "multiply";
const divide = "divide";
const equals = "equals";
var button = empty;
var buttonBefore = empty;

function numberButton(val) {
	
	if(!flag){
		input.innerHTML = "";
		input.append(val);
		valueSecond = input.innerHTML;
		flag = true;
	}else{
		if(input.innerHTML == "0"){
			input.innerHTML = "";
		}
		input.append(val);
		valueFirst = input.innerHTML;
		valueSecond = input.innerHTML;
	}
}

function clearButton() {
	res = 0;
	flag = true;
	button = empty;
	input.innerHTML = "";
}

function operationButton(nameOperation) {
	if(flag || button != nameOperation){
		if(!flag && button != nameOperation){
			cancelButton(button);
		}
		selectButton(button);
		flag = false;
		button = nameOperation;
		buttonBefore = nameOperation;
	}
}
		
function equalsButton() {
	if(flag && button != equals){
		selectButton(button)
		button = equals;
	}else{
		if(flag && button == equals){
			selectButton(buttonBefore);
		}
	}
}
		
function selectButton(button) {
	switch (button) {
	case empty:
		res = Number.parseInt(valueFirst);
		input.innerHTML = res;
		break;
	case plus:
		res += Number.parseInt(valueSecond);
		input.innerHTML = res;
		break;
	case minus:
		res -= Number.parseInt(valueSecond);
		input.innerHTML = res;
		break;
	case multiply:
		res *= Number.parseInt(valueSecond);
		input.innerHTML = res;
		break;
	case divide:
		if(valueSecond != 0){
			res /= Number.parseInt(valueSecond);
			input.innerHTML = res;
		}else{
			input.innerHTML = "Error";
		}
		break;
	case equals:
		res = Number.parseInt(input.innerHTML);
		break;
	}
}

function cancelButton(button) {
	switch (button) {
	case plus:
		res -= Number.parseInt(valueSecond);
		break;
	case minus:
		res += Number.parseInt(valueSecond);
		break;
	case multiply:
		res /= Number.parseInt(valueSecond);
		break;
	case divide:
		res *= Number.parseInt(valueSecond);
		break;
	}
}