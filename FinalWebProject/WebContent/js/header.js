var header = getDiv('header', 'header');
header.append(nameHeader);
var line = getDiv('line', 'line');
var main = document.querySelector('.main');
main.before(line);
line.before(header);