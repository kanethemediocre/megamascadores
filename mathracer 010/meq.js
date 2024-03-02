class Meq{
	constructor(nums,operators){
		this.trivia = false;//trivia overrides equation system.
		this.nums = nums;
		this.operators = operators;
		this.growth = [0];//growth of 1 indicates fully grown, 0 ungrown.  Array of size nums.length+operators.length==nums.length-1
		this.q = nums[0];
		this.s = 0;
		var i=1;
		while (i<nums.length){//Assume properly formed everything
			this.growth.push(0,0);
			this.q = this.q +" "+operators[i-1]+" "+nums[i];
			if (this.operators[i-1]=="+"){ this.s = this.s + nums[i]; }//adding
			else if (this.operators[i-1]=="-"){ this.s = this.s - nums[i]; }//subtracting
			i++;
			}
		this.complete = false;
		this.xx = 0;
		this.yy = 0; //actual screen coordinates
		this.v0 = 0;//These are variables that may describe the question
		this.v1 = 0;
		this.v2 = 0;
		this.v3 = 0;
		}
	set(){
		this.q = this.nums[0];
		this.s = this.nums[0];
		//this.growth = [0];
		var i=1;
		while (i<this.nums.length){//Assume properly formed everything
			//this.growth.push(0,0);
			this.q = this.q +" "+this.operators[i-1]+" "+this.nums[i];
			if (this.operators[i-1]=="+"){ this.s = this.s + this.nums[i]; }//adding
			else if (this.operators[i-1]=="-"){ this.s = this.s - this.nums[i]; }//subtracting
			else if (this.operators[i-1]=="*"){ this.s = this.s + this.nums[i-1]*(this.nums[i]-1); }//multiplying 
			i++;
			}
		//console.log("!!!!!!!!!!!!!!!!!!!");
		//console.log(this.q);
		}
	reset(){
		var i=0;
		while(i<this.nums.length){
			this.nums[i]=0;
			i++;
			}
		var i=0;
		while(i<this.operators.length){
			this.operators[i] = "+";
			i++;
			}
		var i=0;
		while(i<this.growth.length){
			this.growth[i] = 0;
			i++;
			}
		this.complete = false;
		}
	draw(){
		//console.log("triedtodraw");
		context.strokeStyle = this.c;
		context.lineWidth = 2;
		context.fillStyle = this.c;
		context.font='32px Courier New';
		context.fillText(this.q,this.xx,this.yy);
		//context.beginPath();
		}
	finish(){
		this.set();
		this.complete = true;
		if (this.s<0){this.reset();}
		}
	
	}