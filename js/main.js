
var menuItems = document.querySelectorAll(".menu-caption");

for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("focus", function( event ) {
    get_nextsibling(event.target).classList.add("focused");
  }, true);
  menuItems[i].addEventListener("blur", function( event ) {
    get_nextsibling(event.target).classList.remove("focused");	
  }, true);
} 
	

var subMenuItem = document.querySelectorAll(".action-list a");

for (var i = 0; i < subMenuItem.length; i++) { 
  subMenuItem[i].addEventListener("focus", function( event ) {
    event.target.parentNode.parentNode.classList.add("focused");
    console.log(get_previoussibling(event.target.parentNode.parentNode));//.classList.add("focused");
    get_previoussibling(event.target.parentNode.parentNode).classList.add("focused");
  }, true);
    

  subMenuItem[i].addEventListener("blur", function( event ) {
    event.target.parentNode.parentNode.classList.remove("focused");
    get_previoussibling(event.target.parentNode.parentNode).classList.remove("focused");
  }, true);
}
   
function get_nextsibling(n) {
  x=n.nextSibling;
  while (x.nodeType!=1) {
    x=x.nextSibling;
  }
  return x;
}
function get_previoussibling(n) {
  x=n.previousSibling;
  while (x.nodeType!=1) {
    x=x.previousSibling;
  }
  return x;
}