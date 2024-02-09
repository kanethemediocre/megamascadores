document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mx =  e.clientX +windowmousexoffset;//myplayer.mousexoffset;
	my =  e.clientY +windowmouseyoffset;//+myplayer.mouseyoffset;
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	mousestate = e.buttons;
	if ((worlds[level].players[0].rod)&&(worlds[level].players[0].rodtimer==0)){
		var truex = worlds[level].players[0].x+Math.floor( (mx-canvas.width/2)/xstep +0.5);
		var truey = worlds[level].players[0].y+Math.floor( (my-canvas.height/2)/ystep +0.5);
		console.log("True xy: "+truex + ","+truey);
		if ((truex>=0)&&(truey>=0)&&(truex<worlds[level].m)&&(truey<worlds[level].n)){
			//worlds[level].grid[truex][truey].eq.reset();
			worlds[level].players[0].rodtimer = 128;
			worlds[level].players[0].rodtargetx = truex;
			worlds[level].players[0].rodtargety = truey;
			console.log(worlds[level].grid[truex][truey].eq.complete);
			if (worlds[level].grid[truex][truey].eq.complete){
				console.log("triedtocatch");
				worlds[level].players[0].catchq = worlds[level].grid[truex][truey].eq.q;
				worlds[level].players[0].catchs = worlds[level].grid[truex][truey].eq.s;
				}
			worlds[level].grid[truex][truey].eq.reset();
			console.log("Resetsomething");
			}
		}
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

