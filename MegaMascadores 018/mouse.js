document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mx =  e.clientX +windowmousexoffset;//myplayer.mousexoffset;
	my =  e.clientY +windowmouseyoffset;//+myplayer.mouseyoffset;
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	mousestate = e.buttons;
	}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {

    mousestate = e.buttons;
}
document.addEventListener("wheel", mouseWheelHandler, {passive: false});
function mouseWheelHandler(e) {
    e.preventDefault();
    e.stopPropagation();
	return false;
}

