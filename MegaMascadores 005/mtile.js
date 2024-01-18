class Mtile{
	constructor(terrain,sprite){
		this.terrain = terrain;//determines fertility, blocking, etc.
		this.sprite = sprite;//image backdrop
		this.c = "white";

	//constructor(nums,operators){
		this.eq = new Meq([0,0],["+"]);//blank and empty questions
		this.eq.growth = [0,0,0];
		this.active = true;
		this.players = [];
		this.monsters = [];
		this.hf = -1;
		this.hfmultiple = -1;
		this.colors = ["pink","grey"];
		this.gridfont = '24px Courier New';
		this.labelfont = '24px Courier New';
		this.labeloffsetx = 0;
		this.labeloffsety = 0;
		this.blocking = false;
		this.spread = 10;
		this.mutate = 10;
		}
	draw(){
		var bordersize = 64
		var xstep = (canvas.width-bordersize*2) / this.m;
		var ystep = (canvas.height-bordersize*2) / this.n;
		//console.log(xstep+" "+ystep);
		//console.log("triedtodraw");
		context.strokeStyle = this.colors[0];
		context.lineWidth = 2;
		context.beginPath();
		context.rect(bordersize,bordersize,canvas.width-bordersize*2,canvas.height-bordersize*2);
		context.stroke();
		context.fillStyle = "white"
		//context.strokeStyle = this.colors[0];
		context.font=this.labelfont;
		context.fillText(this.label,this.x+7,this.y+16);
		//context.beginPath();
		context.fillStyle = this.c;
		context.strokeStyle = this.colors[0];
		var i=0;
		while(i<this.m){//Vertical Lines For Grid
			//console.log("triedtodrawh");
			context.beginPath();
			context.moveTo(bordersize+xstep*i,bordersize);
			context.lineTo(bordersize+xstep*i,canvas.height-bordersize);
			context.stroke();
			i++;
			}
		//context.stroke();
		var i=0;//Horizontal Lines For Grid
		while(i<this.n){
			//context.beginPath();
			context.moveTo(bordersize,bordersize+ystep*i);
			context.lineTo(canvas.width-bordersize,bordersize+ystep*i);
			i++;
			}
		context.stroke();	
		var i=0;//Now I need to draw m x n grid equations
		while(i<this.m){//each column
			var j=0;
			while(j<this.n){ //each row
				context.fillStyle = "white";
				context.font=this.gridfont;
				context.fillText(this.grid[i][j].q,bordersize+xstep*i+xstep/4,bordersize+ystep*j+ystep/2);
				if (this.colors.length>1){
					context.strokeStyle = this.colors[1];
					context.beginPath();
					context.rect(bordersize+xstep*i+4,bordersize+ystep*j+4,xstep-8,ystep-8);
					context.stroke();
					}
				j++;
				}
			i++;
			}
		var i=0;//Now I need to draw the players
		while(i<this.players.length){
			//console.log("triedtodrawp");
			var px = bordersize + xstep*(this.players[i].x+0.125);
			var py = bordersize + ystep*(this.players[i].y+0.125);
			if (this.players[i].movestate>0){
				//console.log("moving");
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
			var xsize = xstep*0.75
			var ysize = ystep*0.75;
			this.players[i].draw(px,py,xsize,ysize);
			i++;
			}
		var i=0;//Now I need to draw the players
		while(i<this.monsters.length){
			//console.log("triedtodrawp");
			var px = bordersize + xstep*(this.monsters[i].x+0.125);
			var py = bordersize + ystep*(this.monsters[i].y+0.125);
			if (this.monsters[i].movestate>0){
				//console.log("moving");
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
			var xsize = xstep*0.75
			var ysize = ystep*0.75;
			this.monsters[i].draw(px,py,xsize,ysize);
			i++;
			}
		}
	update(){
		this.ai();
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
				if (this.players[i].x > this.m-1){this.players[i].x = this.m-1; }	
				if (this.players[i].x < 0 ){this.players[i].x = 0; }	
				if (this.players[i].y > this.n-1){this.players[i].y = this.n-1; }
				if (this.players[i].y < 0){this.players[i].y = 0; }	

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
			if (this.players[i].munchstate > 0){//If monster is moving, move the monster further
				this.players[i].munchstate = this.players[i].munchstate + this.players[i].munchspeed;
				}
			if (this.players[i].munchstate > 1){//If monster is moving, move the monster further
				this.players[i].munchstate = 0;
				}
			i++;
			}
		var i=0;
		while(i<this.monsters.length){//Handle monster movement
			if (this.monsters[i].movestate > 0){//If monster is moving, move the monster further
				this.monsters[i].movestate = this.monsters[i].movestate + this.monsters[i].movespeed;
				}
			if (this.monsters[i].movestate>1){//Player has arrived at new grid square
				this.monsters[i].movestate=0;//reset to nonmoving state
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
				if (this.monsters[i].x > this.m-1){this.monsters[i].x = this.m-1 }	
				if (this.monsters[i].x < 0 ){this.monsters[i].x = 0; }	
				if (this.monsters[i].y > this.n-1){this.monsters[i].y = this.n-1 }
				if (this.monsters[i].y < 0){this.monsters[i].y = 0; }	
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
					this.monsters[i].x = this.m-1;
					this.monsters[i].y = this.n-1;
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
						console.log("Itriedtomovemonster");
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
		this.players[i].x=this.players[i].homex;
		this.players[i].y=this.players[i].homey;
		}
	generateadditiongrid(min1,max1,min2,max2){
		this.gridfont = "36px Courier New";
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var addend1 = Math.floor(Math.random()*(max1-min1)) + min1;
				var addend2 = Math.floor(Math.random()*(max2-min2)) + min2;
				var answer = addend1 + addend2;
				var question = addend1 + " + " + addend2;// + "= ?";
				var ameq = new Meq(question,answer);
				ameq.v0 = addend1;
				ameq.v1 = addend2;
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	generatesubtractiongrid(min1,max1,min2,max2){
		this.gridfont = "36px Courier New";
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var addend1 = Math.floor(Math.random()*(max1-min1)) + min1;
				var addend2 = Math.floor(Math.random()*(max2-min2)) + min2;
				var answer = addend1 - addend2;
				if (answer<0){
					var addendtemp = addend1;
					addend1 = addend2;
					addend2 = addendtemp;
					answer = answer * -1;
					}
				var question = addend1 + " - " + addend2;// + "= ?";
				var ameq = new Meq(question,answer);
				ameq.v0 = addend1;
				ameq.v1 = addend2;
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	generatemixedgrid(grid0,grid1){
		this.gridfont = "36px Courier New";
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				if (Math.random()>0.5){	acolumn.push(grid0.grid[i][j]); }
				else {	acolumn.push(grid1.grid[i][j]); }
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	generatelongaddsubgrid(min1,max1,min2,max2){
		var maxlen = max2;
		var minlen = min2;
		if (minlen<2){ minlen = 2; }
		this.gridfont = "36px Courier New";
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var numaddends = minlen + Math.floor((maxlen-minlen+1)*Math.random());
				var addends = [];
				var operators = [];
				var k = 0;
				while(k<numaddends){
					var theaddend = min1 +Math.floor((max1-min1+1)*Math.random());
					addends.push(theaddend);
					if (k>0){
						if (Math.random()>0.5){	operators.push("+"); }
						else { operators.push("-"); }
						}
					k++;
					}
					
				var answer = addends[0];
				var question = addends[0];
				var k=0;
				while(k<operators.length){
					if (operators[k] == "+"){
						answer = answer + addends[k+1]						
						}
					else if (operators[k] == "-"){
						answer = answer - addends[k+1];
						}
					question = question + operators[k]+addends[k+1];// addends[k+1] + operators[k];
					k++;
					}
				var ameq = new Meq(question,answer);
				ameq.v0 = addends;
				ameq.v1 = operators;
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	generateamultiplegrid(min1,max1,min2,max2){
		//var max1 = 10;
		//var min1 = 0;
		//var max2 = 10;
		//var min2 = 0;
		this.hfmultiple = Math.floor(Math.random()*(max1-min1)) + min1;
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var answer = Math.floor(Math.random()*(max2-min2)) + min2;
				var question = addend2+"";
				var ameq = new Meq(question,answer);
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	generatetriviagrid(qcatname,acatname,qa){//QA contains 2 lists, [0] is questions and [1] is answers
		var allpossible = []
		var i=0;
		while(i<qa[1].length){
			var currentanswer = qa[1][i];
			var j=0;
			while(j<allpossible.length){ 
				if (currentanswer == allpossible[j]){
					currentanswer = "answerused";
					j=allpossible.length+10;
					}
				j++;
				}
			if (j == allpossible.length){allpossible.push(currentanswer);}
			i++;
			}
		//console.log("i="+i);
		this.hf = allpossible[Math.floor(Math.random()*allpossible.length)];//a random member of answers
		this.grid = [];
		var arow = []; //a row
		var i=0;
		while(i<this.m){
			var acolumn = [];
			var j=0;
			while(j<this.n){
				var qai = Math.floor(Math.random()*qa[0].length);//random index for question and answer
				var answer = qa[1][qai];
				var question = qa[0][qai];
				var ameq = new Meq(question,answer);
				acolumn.push(ameq);
				j++;
				}
			this.grid.push(acolumn);
			i++;
			}
		}
	
	}