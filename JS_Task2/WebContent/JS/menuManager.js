/* 
 * Create a collection from the main menu items and add an event listener 
 * to each item in the collection
 */
var menu = document.querySelectorAll('#menu');
for (var i = 0; i < menu.length; i++) {
	menu[i].addEventListener("mouseenter", showMenu, false);
	menu[i].addEventListener('mouseleave', hideMenu, false);
}

/*
 * the function shows the main menu when you hover the mouse over the menu header
 */
function showMenu() {
	if(this.children.length > 1){
		this.children[1].style.display = "block";
		var items = this.children[1].querySelectorAll('.menu-item');
		for (var i = 0; i < items.length; i++) {
			items[i].addEventListener("mouseenter", showSubMenu, false);
			items[i].addEventListener("mouseleave", hideSubMenu, false);
		}
	}else{
		return false;
	}
}

/*
 * the function hides the main menu
 */
function hideMenu() {
	if(this.children.length > 1){
		this.children[1].style.display = "none";
	}else{
		return false;
	}
}

/*
 * the function shows the submenu when you hover the mouse over the main menu item
 */
function showSubMenu() {
	this.style.background = "orange";
	if(this.children.length > 0){
		this.children[0].style.display = "block";
		var items = this.children[0].querySelectorAll('.sub-menu-item');
		for (var i = 0; i < items.length; i++) {
			items[i].addEventListener("mouseenter", showSubMenu, false);
			items[i].addEventListener("mousedown", subMenuAction, false);
			items[i].addEventListener("mouseleave", hideSubMenu, false);
		}
	}else{
		return false;
	}
}

/*
 * the function hides the submenu
 */
function hideSubMenu() {
	this.style.background = "none";
	if(this.children.length > 0){
		this.children[0].style.display = "none";
	}else{
		return false;
	}
}

/*
 * the function sets actions when clicking on submenu items
 */
function subMenuAction() {
	if(this.parentElement.parentElement.id == "item1" || this.parentElement.parentElement.id == "item2"){
		alert("\"" + this.innerHTML + "\" menu item is selected");
	}else if(this.parentElement.parentElement.id == "item3"){
		switch (this.id) {
		case "sub1":
			document.getElementById('newframe').innerHTML = '<iframe src="testPageOne.html" width="100%" height="100%" aligh="center" frameborder="0"></iframe>';
			break;
		case "sub2":
			document.getElementById('newframe').innerHTML = '<iframe src="testPageTwo.html" width="100%" height="100%" aligh="center" frameborder="0"></iframe>';
			break;
		case "sub3":
			document.getElementById('newframe').innerHTML = '<iframe src="testPageThree.html" width="100%" height="100%" aligh="center" frameborder="0"></iframe>';
			break;
		}
	}else{
		return false;
	}
}

/*
 * displays the current date and time in the footer of the page
 */
var date = new Date();
var options = {
	weekday: 'long',
	day: '2-digit',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	hour12: false,
	minute: 'numeric'
};
document.getElementById('date').innerHTML = "Today: " + date.toLocaleString("en-US", options);

