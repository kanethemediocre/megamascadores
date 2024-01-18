class Player{
	constructor(pname){
		this.x = 0; //location on m x n grid
		this.y = 0;
		this.xx = 0;//Onscreen location
		this.yy = 0;
		this.homex = 0;
		this.homey = 0;
		this.name = pname;
		this.c = "blue";
		this.hp = 5;
		this.score = 0;
		this.movedir = -1; //0 = up, 1 = left, 2 = down, 3 = right, -1 = not moving
		this.movestate = 0; //0-1 fraction of move completed
		this.movespeed = 0.0625;
		this.munchstate = 0; //0-1 fraction of munch completed
		this.munchspeed = 0.125;
		this.stomachsize = 0;
		this.stomach = [];//A list of answers, normally integers
		this.activetask = "";//for display only, not a gameplay property
		this.targetanswer = 0;
		this.quests = [];
		this.topsprite = "adefaultsprite";
		this.bottomsprite = "adefaultsprite";
		}
	draw(xx,yy, xs, ys){//actual screen coordinates and size
		//console.log("triedtodraw");
		var munchoff = this.munchstate*32
		context.drawImage(playertop1, xx, yy+munchoff);
		context.drawImage(playerbot1, xx, yy+80-munchoff);
		
		context.strokeStyle = this.c;
		context.lineWidth = 2;
		context.beginPath();
		context.rect(xx,yy+ys*0.5*this.munchstate,xs,ys*(1-this.munchstate));
		context.stroke();
		//console.log(this.munchstate);
		}
	move(dir,world){//Initiates movement sequence
		this.movedir = dir;
		if (this.movedir>=0){//Only move if player is not already in motion
			var xoff = 0;
			var yoff = 0;
			if (this.movedir == 0){ var yoff = 1; }
			else if (this.movedir==1){ var xoff = 1; }
			else if (this.movedir==2){ var yoff = -1; }
			else if (this.movedir==3){ var xoff = -1; }
			var newx = this.x+xoff;
			var newy = this.y+yoff;
			
			if ((newx>=0)&&(newy>=0)&&(newx<world.m)&&(newy<world.n)){//if in-bounds
				//if (!world.grid.tg[newx][newy].blocking){} 
				var theterrain = world.grid[newx][newy];
				console.log("movenotblocked");
				
				
				if (!world.grid[newx][newy].blocking){
					this.movestate = 0+this.movespeed;
					}
				else{
					console.log("terrainblocked");
					this.movedir = -1;
					this.movestate = 0;
					}
				//this.movedir = dir;
				}
			else {
				console.log("oofdontmove");
				this.movedir=-1; 
				this.movestate = 0;
				}
			}
		}

	}
