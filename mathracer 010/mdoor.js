class Mdoor{
	constructor(x,y,tomap,toi,sprite){
		this.x = x; //location on m x n grid
		this.y = y;
		this.tomap = tomap;
		this.toi = toi;
		this.sprite = sprite;
		this.active = true;
		this.visible = true;
		}
	draw(viewx, viewy, xstep, ystep){
		context.drawImage(this.sprite, this.x*xstep-viewx, this.y*ystep-viewy);
		}
	}	
	