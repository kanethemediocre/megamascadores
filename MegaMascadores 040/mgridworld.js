class Mgridworld{
	constructor(label,m,n,spawns){//spawns an array of pairs. [[x1,y1],[x2,y2]]];
		this.m = m;
		this.n = n;
		this.label = label;
		this.spawns = spawns;
		this.c = "white";
		this.grid = [];
		this.tg = [];//terrain grid;
		this.mg = [];//g is for grid, this will be filled later with m x n munchables.
		this.active = true;
		this.players = [];
		this.monsters = [];
		this.npcs = [];
		this.doors = [];
		this.hf = -1;
		this.hfmultiple = -1;
		this.colors = ["pink","grey"];
		this.gridfont = '32px Courier New';
		this.labelfont = '32px Courier New';
		this.labeloffsetx = 0;
		this.labeloffsety = 0;
		this.uniquequests = false;
		}
	replacetile(atile,x,y){
		var thetile = new Mtile(atile.terrain,atile.sprite,x,y);
		thetile.blocking = atile.blocking;
		thetile.usedecal = atile.usedecal;
		thetile.decal = atile.decal;
		thetile.fertile = atile.fertile;
		thetile.autosprout = atile.autosprout;
		thetile.sproutnums = atile.sproutnums;
		thetile.sproutoperators = atile.sproutoperators;
		this.grid[x][y] = thetile;//X and Y ought to be checked in bounds
		}
	fillgrid(atile){
		var i = 0;
		while(i<this.m){
			this.grid.push([]);
			var j=0;
			while(j<this.n){
				var thetile = new Mtile(atile.terrain,atile.sprite,i,j);
				thetile.blocking = atile.blocking;
				this.grid[i][j] = thetile;//X and Y ought to be checked in bounds
				this.grid[i].push(thetile);
				j++;
				}
			i++;
			}
		}
	randomreplacetile(atile,num){
		var i=0;
		while (i<num){
			var randomx = Math.floor(this.m*Math.random());
			var randomy = Math.floor(this.n*Math.random());
			this.replacetile(atile,randomx,randomy);
			i++;
			}
		}
	vreplacetile(atile,x,y,h){
		var i=0;
		while(i<h){
			this.replacetile(atile,x,y+i);
			i++;
			}
		}
	hreplacetile(atile,x,y,w){
		var i=0;
		while(i<w){
			this.replacetile(atile,x+i,y);
			i++;
			}
		}
	placechar(cvalue,cposition,x,y){
		if (cposition%2==0){
			this.grid[x][y].eq.nums[cposition/2]=cvalue;
			}
		else if (cposition%2==1){
			this.grid[x][y].eq.operators[(cposition-1)/2]=cvalue;
			}
		else{ console.log("bad cposition value"); }	
		this.grid[x][y].eq.growth[cposition] = 1;
		}
	randomplacechars(cvalue,cposition,num){
		if (cposition%2==0){
			var i=0;
			while(i<num){
				var randomx = Math.floor(this.m*Math.random());
				var randomy = Math.floor(this.n*Math.random());
				this.grid[randomx][randomy].eq.nums[cposition/2]=cvalue;
				this.grid[randomx][randomy].eq.growth[cposition] = 1;
				console.log(this.grid[randomx][randomy].eq);
				i++;
				}
			}
		else if (cposition%2==1){
			var i=0;
			while(i<num){
				var randomx = Math.floor(this.m*Math.random());
				var randomy = Math.floor(this.n*Math.random());
				this.grid[randomx][randomy].eq.operators[(cposition-1)/2]=cvalue;
				this.grid[randomx][randomy].eq.growth[cposition] = 1;
				i++;
				}
			}
		else{ console.log("bad cposition value"); }	
		//this.grid[x][y].eq.growth[cposition] = 1;
		}
	spread(){
		var i=1;
		while(i<this.m-1){
			var j=1;
			while(j<this.n-1){
				var k=0;
				var thetile = this.grid[i][j];
				if (thetile.autosprout){
					if ((thetile.eq.nums[0]==0)||(thetile.eq.nums[1]==0)){//check for 0 contents.  Maybe do grouth instead?
						thetile.sprout();
						console.log("triedtoautosprout");
						}
					}
				while((k<thetile.eq.growth.length)&&(thetile.fertile)){
					if (thetile.eq.growth[k]>0){
						thetile.eq.growth[k] = thetile.eq.growth[k]+0.1;
						}
					if ((thetile.eq.growth[k]>0.5)&&(thetile.spread*Math.random()<1)){
						var dir = Math.floor(Math.random()*4);
						var xoff = 0;
						var yoff = 0;
						if  (dir==0){xoff = 1;}
						else if  (dir==1){yoff = 1;}
						else if  (dir==2){xoff = -1;}
						else if  (dir==3){yoff = -1;}
						var newx = thetile.x+xoff;
						var newy = thetile.y+yoff;
						var thenewtile = this.grid[newx][newy];
						if ((thetile.eq.growth.length==thenewtile.eq.growth.length)&&(thenewtile.eq.growth[k]==0)&&(thenewtile.fertile)){
							if (k%2==0){
								this.grid[newx][newy].eq.nums[k/2]=thetile.eq.nums[k/2];
								this.grid[newx][newy].eq.growth[k]=0.01;
								}
							else if (k%2==1){
								this.grid[newx][newy].eq.operators[(k-1)/2]=thetile.eq.operators[(k-1)/2];
								this.grid[newx][newy].eq.growth[k]=0.01;
								}
							}
						}
					k++;
					}
				var k=0;
				var complete = true;
				while(k<this.grid[i][j].eq.growth.length){
					if (this.grid[i][j].eq.growth[k]<1) {complete = false; }
					k++
					}
				if (complete){
					this.grid[i][j].eq.finish();
					}
				j++;
				}
			i++;
			}
		}
	drawfollow(xstep,ystep,followtype){
		var viewx = 0;
		var viewy = 0;
		if (followtype=="snap"){
			viewx = this.players[0].x*xstep+Math.floor(xstep/2);
			viewy = this.players[0].y*ystep+Math.floor(ystep/2);
			}
		else if (followtype=="locked"){
			var xoff = 0;
			var yoff = 0;
			if (this.players[0].movedir>=0){
				if (this.players[0].movedir==0){
					var yoff = 1*this.players[0].movestate;
					}
				else if (this.players[0].movedir==1){
					var xoff = 1*this.players[0].movestate;
					}
				else if (this.players[0].movedir==2){
					var yoff = -1*this.players[0].movestate;
					}
				else if (this.players[0].movedir==3){
					var xoff = -1*this.players[0].movestate;
					}
				viewx = (this.players[0].x+xoff)*xstep+Math.floor(xstep/2);
				viewy = (this.players[0].y+yoff)*ystep+Math.floor(ystep/2);
				}
			else{
				viewx = this.players[0].x*xstep+Math.floor(xstep/2);
				viewy = this.players[0].y*ystep+Math.floor(ystep/2);
				}
			}
		else if (followtype == "fixed"){
			var viewx = 0;//redundant for now but can be programmed to look somewhere based on something maybe later.
			var viewy = 0;
			}
		viewx = viewx - canvas.width/2;
		viewy = viewy - canvas.height/2;
		this.draw(viewx,viewy,xstep,ystep);
		}
	draw(viewx,viewy,xstep,ystep){
		context.fillStyle = "white"
		context.font=this.labelfont;
		context.fillText(this.label,this.x-viewx+7,this.y-viewy+16);
		context.fillStyle = this.c;
		context.strokeStyle = this.colors[0];
		//view follows players[0] until otherwise, so buffer tiles based on players[0] view
		var myx = this.players[0].x;
		var myy = this.players[0].y;
		var myxrange = Math.floor((canvas.width/2)/xstep) +3;//Could do at initialization and save as parameter
		var myyrange = Math.floor((canvas.height/2)/ystep) + 3;
		var myminx = myx - myxrange;
		var myminy = myy - myyrange;//2 buffer
		var mymaxx = myx + myxrange;
		var mymaxy = myy + myyrange;
		if (myminx<0){myminx=0;}
		if (myminy<0){myminy=0;}
		if (mymaxx>this.m-1){mymaxx=this.m-1;}
		if (mymaxy>this.n-1){mymaxy=this.n-1;}
		var i=myminx;//Now I need to draw m x n grid equations
		while(i<mymaxx){//each column
			var j=myminy;
			while(j<mymaxy){ //each row
				this.grid[i][j].draw(viewx,viewy,xstep,ystep);
				j++;
				}
			i++;
			}
		var i=0;//Now I need to draw the players
		while(i<this.players.length){
			var px = xstep*(this.players[i].x+0.05)-viewx;
			var py = ystep*(this.players[i].y+0.05)-viewy;
			if (this.players[i].movestate>0){
				if (this.players[i].movedir==0){
					py = py + this.players[i].movestate*ystep;
					}
				else if (this.players[i].movedir==1){
					px = px + this.players[i].movestate*xstep;
					}
				else if (this.players[i].movedir==2){
					py = py - this.players[i].movestate*ystep;
					}
				else if (this.players[i].movedir==3){
					px = px - this.players[i].movestate*xstep;
					}
				}
			var xsize = xstep*0.9
			var ysize = ystep*0.9;
			this.players[i].draw(px,py,xsize,ysize);
			if (this.players[i].rodtimer>0){
				var rodcolor = "red";
				var rodarrival = 0.2;
				var rodstartx = px + xstep/2 
				var rodstarty = py + ystep/2
				var roddx = (this.players[i].x-this.players[i].rodtargetx)*xstep;
				var roddy = (this.players[i].y-this.players[i].rodtargety)*ystep;
				var extension = 1;
				var caught = false;
				if (this.players[i].rodtimer<this.players[i].rodtimermax*(1-rodarrival)){
					extension = this.players[i].rodtimer / (this.players[i].rodtimermax*(1-rodarrival));
					caught = true;
					}
				else {
					extension = ( this.players[i].rodtimermax*rodarrival-(this.players[i].rodtimer-this.players[i].rodtimermax*(1-rodarrival)) ) / (this.players[i].rodtimermax*rodarrival);
					}
				var rodendx = rodstartx - roddx*extension;
				var rodendy = rodstarty - roddy*extension;
				context.strokeStyle = rodcolor;
				context.beginPath();
				context.moveTo(rodstartx,rodstarty);
				context.lineTo(rodendx,rodendy);
				context.stroke();
				if (caught){
					context.fillStyle = "white";
					context.font = "32px Ariel"
					context.fillText(this.players[i].catchq,rodendx,rodendy);
					}
				//if (rodtimer>96){}
				}
			i++;
			}
		var i=0;
		while(i<this.doors.length){
			this.doors[i].draw(viewx,viewy,xstep,ystep);
			i++;
			}
		var i=0;//Now I need to draw the monsters
		while(i<this.monsters.length){
			var bordersize = 0;//to nullify
			var px = bordersize + xstep*(this.monsters[i].x+0.125)-viewx;
			var py = bordersize + ystep*(this.monsters[i].y+0.125)-viewy;
			if (this.monsters[i].movestate>0){
				if (this.monsters[i].movedir==0){
					py = py + this.monsters[i].movestate*ystep;
					}
				else if (this.monsters[i].movedir==1){
					px = px + this.monsters[i].movestate*xstep;
					}
				else if (this.monsters[i].movedir==2){
					py = py - this.monsters[i].movestate*ystep;
					}
				else if (this.monsters[i].movedir==3){
					px = px - this.monsters[i].movestate*xstep;
					}
				}
			var xsize = xstep*0.75;
			var ysize = ystep*0.75;
			this.monsters[i].draw(px,py,xsize,ysize);
			i++;
			}
		var i=0;
		while(i<this.npcs.length){
			this.npcs[i].draw(viewx,viewy,xstep,ystep)
			this.npcs[i].drawmessage(this.players[0]);
			i++;
			}
		context.fillStyle = "black";//Background is black
		context.fillRect(0, 0, canvas.width, 64); //top bar	
		context.fillStyle = "white"
		context.font=this.labelfont;
		context.fillText(this.label,0,32);
		context.fillText("Puntos: "+this.players[0].score,canvas.width-256,32);

		}
	update(){
		this.ai();
		//this.spread();//handling in main loop instead.
		var i=0;
		while(i<this.players.length){//Handle player movement
			if (this.players[i].movestate > 0){//If player is moving, move the player further
				this.players[i].movestate = this.players[i].movestate + this.players[i].movespeed;
				}
			if (this.players[i].movestate>1){//Player has arrived at new grid square
				var oldx = this.players[i].x;
				var oldy = this.players[i].y;
				this.players[i].movestate=0;//reset to nonmoving state
				if (this.players[i].movedir==0){
					this.players[i].y = this.players[i].y+1;
					}
				if (this.players[i].movedir==1){
					this.players[i].x = this.players[i].x+1;
					}				
				if (this.players[i].movedir==2){
					this.players[i].y = this.players[i].y-1;
					}
				if (this.players[i].movedir==3){
					this.players[i].x = this.players[i].x-1;
					}	
				var j = 0;
				while(j<this.players.length){
					if ((i!=j)&&(this.players[i].x==this.players[j].x)&&(this.players[i].y==this.players[j].y)){
						this.players[i].x = oldx;
						this.players[i].y = oldy;
						j = this.players.length+10;
						console.log("collision");
						}
					j++;	
					}
				
				this.players[i].movedir = -1;//reset dir
				}
			if (this.players[i].munchstate > 0){//If player is chewing
				this.players[i].munchstate = this.players[i].munchstate + this.players[i].munchspeed;
				}
			if (this.players[i].rodtimer>0){ this.players[i].rodtimer--; }
			if (this.players[i].raketimer>0){ this.players[i].raketimer--; }
			if (this.players[i].nettimer>0){ this.players[i].nettimer--; }

			
			
			
			
			i++;
			}
		var i=0;
		while(i<this.monsters.length){//Handle monster movement
			if (this.monsters[i].movestate > 0){//If monster is moving, move the monster further
				this.monsters[i].movestate = this.monsters[i].movestate + this.monsters[i].movespeed;
				}
			if (this.monsters[i].movestate>1){//Player has arrived at new grid square
				this.monsters[i].movestate=0;//reset to nonmoving state
				var oldx = this.monsters[i].x;
				var oldy = this.monsters[i].y;
				if (this.monsters[i].movedir==0){
					this.monsters[i].y = this.monsters[i].y+1;
					}
				if (this.monsters[i].movedir==1){
					this.monsters[i].x = this.monsters[i].x+1;
					}				
				if (this.monsters[i].movedir==2){
					this.monsters[i].y = this.monsters[i].y-1;
					}
				if (this.monsters[i].movedir==3){
					this.monsters[i].x = this.monsters[i].x-1;
					}	
				if (this.monsters[i].x > this.m-1){this.monsters[i].x = this.m-1; }	
				if (this.monsters[i].x < 0 ){this.monsters[i].x = 0; }	
				if (this.monsters[i].y > this.n-1){this.monsters[i].y = this.n-1; }
				if (this.monsters[i].y < 0){this.monsters[i].y = 0; }	
				if ((this.grid[this.monsters[i].x][this.monsters[i].y].blocking)&&(!this.monsters[i].ghost)){
					this.monsters[i].x = oldx;
					this.monsters[i].y = oldy;
					}
				this.monsters[i].movedir = -1;//reset dir
				}
			if (this.monsters[i].munchstate > 0){//If monster is moving, move the monster further
				this.monsters[i].munchstate = this.monsters[i].munchstate + this.monsters[i].munchspeed;
				}
			if (this.monsters[i].munchstate > 1){//If monster is moving, move the monster further
				this.monsters[i].munchstate = 0;
				}
			var j=0;
			while(j<this.players.length){
				if ((this.players[j].x==this.monsters[i].x)&&(this.players[j].y==this.monsters[i].y)){
					//collision between monster and player
					this.players[j].score = this.players[j].score - 3;
					this.respawnplayer(j);//players[i].x=this.players[i].homex;
					//this.monsters[i].x = this.m-1;
					//this.monsters[i].y = this.n-1;
					}
				j++;
				}
			i++;
			}
		}
	ai(){
		var i=0;
		while(i<this.monsters.length){
			//decide to move or not
			if (this.monsters[i].movedir<0){
				if (this.monsters[i].moveai==0){
					if (Math.random()<this.monsters[i].movechance){
						//console.log("Itriedtomovemonster");
						this.monsters[i].move(Math.floor(Math.random()*4));
						}
					}
				}
			i++;
			}
		}
	checktotal(){
		var total = 0;
		var i=0;
		while(i<this.grid.length){
			var j=0;
			while(j<this.grid[i].length){
				if (this.grid[i][j].s == this.hf){
					total++;
					}
				j++
				}
			i++;
			}
		return total;
		}
	respawnplayer(i){
		this.players[i].x=this.spawns[Math.floor(Math.random()*this.spawns.length)][0];
		this.players[i].y=this.spawns[Math.floor(Math.random()*this.spawns.length)][1];
		}
	randommonsters(topsprites,bottomsprites,color,num){
		var i=0;
		while(i<num){
			var amonster = new Monster("rando");
			var spriteselect = Math.floor(Math.random()*topsprites.length);
			amonster.topsprite = topsprites[spriteselect];
			amonster.bottomsprite = bottomsprites[spriteselect];
			amonster.x = Math.floor(Math.random()*(this.m-2))+1;
			amonster.y = Math.floor(Math.random()*(this.n-2))+1;
			this.monsters.push(amonster);
			i++;
			}
		}
	evictmonsters(fromx1,fromy1,fromx2,fromy2,tox1,toy1,tox2,toy2){
		//removes monsters from region defined by corners of rectangle to region defined by corners of another rectangle
		var i=0;
		while(i<this.monsters.length){
			var mon = this.monsters[i]; //shorthand for readability 
			if ((mon.x>=fromx1)&&(mon.x<=fromx2)&&(mon.y>=fromy1)&&(mon.y<=fromy2)){
				var newx = Math.floor(Math.random()*(tox2-tox1))+tox1;
				var newy = Math.floor(Math.random()*(toy2-toy1))+toy1;
				this.monsters[i].x = newx;
				this.monsters[i].y = newy;
				}
			i++;
			}
		}
	}