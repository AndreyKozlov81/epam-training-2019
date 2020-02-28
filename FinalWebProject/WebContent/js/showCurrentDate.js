/*
 * displays the current date and time in the footer of the page
 */
var date = new Date();
var year = date.getYear() + 1900;
var month = date.getMonth() + 1;
if(month < 10){
	month = "0" + month;
}
var day = date.getDate();
if(day < 10){
	day = "0" + day;
}
document.getElementById('date').innerHTML = today+": " + year + "-" + month + "-" + day;