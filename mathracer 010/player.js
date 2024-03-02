class Player{
	constructor(pname){
		this.x = 0; //location on m x n grid
		this.y = 0;
		this.xx = 0;//Exact location?
		this.yy = 0;//Maybe obselete
		this.vx = 0;//maybe not used?
		this.vy = 6;
		this.yyy = 0;//exact position for real in y.
		this.xxx = 0;
		//this.hf = 0;
		this.homex = 0;
		this.homey = 0;
		this.name = pname;
		this.c = "blue";
		this.hp = 5;
		this.score = 0;
		this.movedir = -1; //0 = up, 1 = left, 2 = down, 3 = right, -1 = not moving
		this.movestate = 0; //0-1 fraction of move completed
		this.movespeed = 0.08;
		//this.munchstate = 0; //0-1 fraction of munch completed
		//this.munchspeed = 0.08;
		//this.stomachactive = false;
		//this.stomachsize = 0;
		//this.stomach = [];//A list of answers, normally integers
		//this.seeds = [];
		//this.keys = [];
		this.activetask = "";//for display only, not a gameplay property
		this.targetanswer = 0;
		this.targetnumber = 99;//Not number as in answer, but number as in number of collected answers needed.
		this.targetcollected = 0;
		this.targettype = "exact";//Some 
		//this.rake = false;//false;
		//this.rakedir = -1;
		//this.raketimer = 0;
		//this.raketimermax = 128;
		//this.net = false;//false;
		//this.netdir = -1;
		//this.nettimer = 0;
		//this.nettimermax = 128;
		//this.rod = false;
		//this.rodtimer = 0;
		//this.rodtimermax = 128;
		//this.rodtargetx = 0;
		//this.rodtargety = 0;
		//this.catchq = "";
		//this.catchs = 0;
		//this.quests = [];//as ordered pairs, [mapnumber,npcnumber,questnumber]
		this.sprite = car1;
		//this.bottomsprite = playerbot1;
		this.score = 0;
		this.tool = 0; //0 for none, 1 for rake, 2 for net, 3 for rod
		this.item = -1; //index of selected items
		}
	draw(xx,yy, xs, ys){//actual screen coordinates and size
		context.drawImage(this.sprite, xx, yy);
		context.fillText(this.targetanswer,xx,yy); 

		}
	drawquests(xx,yy){
		if (this.quests.length>0){
			var myquest = this.quests[this.length-1];
			myquest.draw(xx,yy);
			console.log("Itriedtodrawquests2");
			}
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
				var theterrain = world.grid[newx][newy];

				if (!world.grid[newx][newy].blocking){//if not blocked
					this.movestate = 0+this.movespeed;
					}
				else{
					//if (this.rake){
					//	this.rakedir = this.movedir;
					//	this.raketimer = this.raketimermax;
					//	}
					this.movedir = -1;
					this.movestate = 0;
					}
				}
			else {//if not in bounds
				console.log("oofdontmove");
				this.movedir=-1; 
				this.movestate = 0;
				}
			}
		}
	munch(targettile){//Concludes munch
		var points = 0;
		var solution = targettile.eq.s;
		if ((this.stomachactive)&&(this.stomach.length<this.stomachsize)){
			this.stomach.push(solution);
			}
		else{
			var target = this.targetanswer;
			if (solution==this.targetanswer){
				this.targetcollected++;
				points = 1;
				}
			else{
				points = -1;
				}
			}
		targettile.eq.reset();
		return points;
		}	
	raze(targettile){//destroy instead of harvest
		targettile.eq.reset();
		}	
	}
