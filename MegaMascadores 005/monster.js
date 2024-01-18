class Monster{
	constructor(pname){
		this.x = 0; //location on m x n grid
		this.y = 0;
		this.xx = 0;//Onscreen location
		this.yy = 0;
		this.name = pname;
		this.c = "red";
		this.hp = 5;
		this.munch = 0; //0 to 1, probability of munching valid tile on arrival
		this.munchtype = 0;//0 for munches nothing, 1 for munches incorrect, 2 for munches correct, 3 for muches both
		this.contact = 0; //0 for nothing happens, 1 for death, 2 for score drain
		this.moveai = 0; //0 for random, 1 for chase player,
		this.movechance = 0.008;
		this.movedir = -1; //0 = up, 1 = left, 2 = down, 3 = right, -1 = not moving
		this.movestate = 0; //0-1 fraction of move completed
		this.movespeed = 0.01;
		}
	draw(xx,yy, xs, ys){//actual screen coordinates and size
		//console.log("triedtodraw");
		context.strokeStyle = this.c;
		context.lineWidth = 2;
		context.beginPath();
		context.rect(xx,yy,xs,ys);
		context.stroke();
		}
	move(dir){//Initiates movement sequence
		if (this.movedir<0){//Only move if player is not already in motion
			this.movestate = 0+this.movespeed;
			this.movedir = dir;
			}
		}

	}
