class Mtile{
	constructor(terrain,sprite,x,y){
		this.terrain = terrain;//determines fertility, blocking, etc.
		this.sprite = sprite;//image backdrop
		this.usedecal = false;
		this.decal = 0; //assign sprite when used
		this.x = x;//Assigned at creation.
		this.y = y;
		this.c = "white";
		this.eq = new Meq([0,0],["+"]);//blank and empty questions
		this.eq.growth = [0,0,0];
		//this.players = [];
		//this.monsters = [];
		this.gridfont = '40px Courier New';
		this.labelfont = '40px Courier New';
		this.blocking = false;
		this.occupied = false;
		this.fertile = true;
		this.autosprout = false;
		this.sproutnums = [1,2,3,4,5];
		this.sproutoperators = ["+","-"];
		this.spread = 30;
		this.mutate = 30;
		}
	sprout(){
		var i=0;
		while(i<this.eq.nums.length){
			var randnum = Math.floor(Math.random()*this.sproutnums.length);
			this.eq.nums[i] = this.sproutnums[randnum];
			i++;
			}
		var i=0;
		while(i<this.eq.operators.length){
			var randnum = Math.floor(Math.random()*this.sproutoperators.length);
			this.eq.operators[i] = this.sproutoperators[randnum];
			i++;
			}
		var i = 0;
		while(i<this.eq.growth.length){
			this.eq.growth[i] = 0.1;
			i++;
			}
		this.eq.set();	
		console.log(this.eq.nums);
		console.log(this.eq.operators);
		
		}
	draw(viewx,viewy,xstep,ystep){
		context.drawImage(this.sprite, xstep*this.x-viewx, ystep*this.y-viewy);//Background/terrain sprite
		if (this.usedecal){
			context.drawImage(this.decal, xstep*this.x-viewx, ystep*this.y-viewy);//Background/terrain sprite
			}
		context.fillStyle = "grey";
		context.font=this.gridfont;
		var eqtext = "";//+this.eq.nums[0];
		//var eqcomplete = true
		var i=0;
		while(i<this.eq.growth.length){
			if (this.eq.growth[i]==0){
				eqtext = eqtext + " ";
				}
			else {
				if (i%2==0){ eqtext = eqtext + this.eq.nums[i/2]; }
				else { eqtext = eqtext+this.eq.operators[(i-1)/2]; }
				}
		//	if (this.eq.growth[i]<1){ eqcomplete = false; }
			i++;
			}
		//this.eq.complete = eqcomplete;//Move this process to update?
		if (this.eq.complete){
			context.fillStyle = "white";	
			}
		//console.log(eqtext);
		if (this.autosprout){
			//console.log(eqtext);
			//console.log(this.eq.growth);
			}
		context.fillText(eqtext,xstep*this.x+xstep/4-viewx,ystep*this.y+ystep/2-viewy);
		}
	}