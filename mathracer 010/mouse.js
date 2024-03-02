document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mx =  e.clientX +windowmousexoffset;//myplayer.mousexoffset;
	my =  e.clientY +windowmouseyoffset;//+myplayer.mouseyoffset;
	mdir = -1*Math.atan2(mx-canvas.width/6,my-canvas.height/2)+Math.PI/2;
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	mousestate = e.buttons;
	player1umo.x = worlds[level].players[0].xxx;
	player1umo.y = worlds[level].players[0].y*ystep;
	player1umo.vx = worlds[level].players[0].vx;
	player1umo.d =  mdir;
	player1umo.launchbomb(bullet1, 12, 100);
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

