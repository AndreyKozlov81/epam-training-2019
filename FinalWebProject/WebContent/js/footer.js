var footer = getDiv('footer', 'footer');
var line = getDiv('line', 'line');
var main = document.querySelector('.main');
main.after(line);
line.after(footer);