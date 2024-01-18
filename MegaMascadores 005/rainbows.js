class Clusterbranch{
	constructor(starttime,startx,starty,startvx,startvy,startdir,startsize,endsize,startcolor,maxlength,curl,decay){
		this.t=starttime;
		this.s = startsize;
		this.esize = endsize;
		this.c = startcolor;
		this.ml = maxlength;
		this.x = startx;
		this.y = starty; 
		this.vx = startvx;
		this.vy = startvy;
		this.decay = decay;
		this.curl = curl;
		this.d = startdir;
		this.branch = [new Umo(startx,starty,startsize,startcolor)];
		this.branch[0].vx = this.vx;
		this.branch[0].vy = this.vy;
		var i=0;
		while (i<maxlength){
			i=i+1;
			this.s = this.s*this.decay;
			this.d = this.d + this.curl;
			this.x = this.x+this.s*Math.cos(this.d);
			this.y = this.y+this.s*Math.sin(this.d);
			if (this.c == "red"){this.c = "orange";}
			else if (this.c == "orange"){this.c = "yellow";}
			else if (this.c == "yellow"){this.c = "green";}
			else if (this.c == "green"){this.c = "blue";}
			else if (this.c == "blue"){this.c = "purple";}
			else if (this.c == "purple"){this.c = "red";}
			this.branch.push(new Umo(this.x,this.y,this.s,this.c));
			this.branch[this.branch.length-1].vx = this.vx;
			this.branch[this.branch.length-1].vy = this.vy;
			}
		}
	draw(viewx,viewy,thetime){
		var dt = thetime-this.t;
		if (dt<this.branch.length){var i=dt;}
		else{var i=this.branch.length;}
		while(i>0){
			i=i-1;
			this.branch[i].drawdot(viewx,viewy);
			}
		}
	update1(){ //Pure motion update.
		var i=this.branch.length;
		while (i>0){
			i=i-1;
			this.branch[i].update1();
			if (this.branch[i].c == "red"){this.branch[i].c = "purple";}
			else if (this.branch[i].c == "purple"){this.branch[i].c = "blue";}
			else if (this.branch[i].c == "blue"){this.branch[i].c = "green";}
			else if (this.branch[i].c == "green"){this.branch[i].c = "yellow";}
			else if (this.branch[i].c == "yellow"){this.branch[i].c = "orange";}
			else if (this.branch[i].c == "orange"){this.branch[i].c = "red";}
			}
		}
	}
let testbranch = new Clusterbranch(0,500,500,4,4,1,42,12,"red",12,0.1,0.95);
class Clusterbomb{
	constructor(starttime,startx,starty,startvx,startvy,startn,branchmod,startsize,decay,startcolor,maxlength,curl){
		this.t=starttime;
		this.s = startsize;
		this.c = startcolor;
		this.ml = maxlength;
		this.x = startx;
		this.y = starty; 
		this.vx = startvx;
		this.vy = startvy;
		this.decay =decay;
		this.curl = curl;
		var branchspacing = 2*Math.PI/startn;
		var stage1branches = [];
		var i=0;
		while (i<startn){
			stage1branches.push(new Clusterbranch(this.t,this.x,this.y,this.vx,this.vy,i*branchspacing,this.s,0,this.c,branchmod,this.curl*(Math.random()*2-1),this.decay));
			i=i+1;
			}	
		var i=0;
		var stage2branches = [];
		while (i<stage1branches.length){
			stage2branches.push(new Clusterbranch(stage1branches[i].t+branchmod,stage1branches[i].x,stage1branches[i].y,stage1branches[i].vx,stage1branches[i].vy,stage1branches[i].d,stage1branches[i].s,0,stage1branches[i].c,branchmod,this.curl*(Math.random()*2-1),this.decay));
			stage2branches.push(new Clusterbranch(stage1branches[i].t+branchmod,stage1branches[i].x,stage1branches[i].y,stage1branches[i].vx,stage1branches[i].vy,stage1branches[i].d,stage1branches[i].s,0,stage1branches[i].c,branchmod,stage1branches[i].curl,this.decay));
			i=i+1
			}
		var i=0;
		var stage3branches = [];
		while (i<stage2branches.length){
			stage3branches.push(new Clusterbranch(stage2branches[i].t+branchmod,stage2branches[i].x,stage2branches[i].y,stage2branches[i].vx,stage2branches[i].vy,stage2branches[i].d,stage2branches[i].s,0,stage2branches[i].c,branchmod,this.curl*(Math.random()*2-1),this.decay));
			stage3branches.push(new Clusterbranch(stage2branches[i].t+branchmod,stage2branches[i].x,stage2branches[i].y,stage2branches[i].vx,stage2branches[i].vy,stage2branches[i].d,stage2branches[i].s,0,stage2branches[i].c,branchmod,stage2branches[i].curl,this.decay));
			i=i+1
			}		
		this.s1b = stage1branches;
		this.s2b = stage2branches;
		this.s3b = stage3branches;
		}
	draw(viewx,viewy, thetime){
		var i=0;
		while (i<this.s3b.length){
			this.s3b[i].draw(viewx,viewy,thetime)
			i=i+1;
			}
		var i=0;
		while (i<this.s2b.length){
			this.s2b[i].draw(viewx,viewy,thetime)
			i=i+1;
			}
		var i=0;
		while (i<this.s1b.length){
			this.s1b[i].draw(viewx,viewy,thetime)
			i=i+1;
			}
		
		}
	update1(){ //Pure motion update.
		var i=this.s1b.length;
		while (i>0){
			i=i-1;
			this.s1b[i].update1();
			}
		var i=this.s2b.length;
		while (i>0){
			i=i-1;
			this.s2b[i].update1();
			}		
		var i=this.s3b.length;
		while (i>0){
			i=i-1;
			this.s3b[i].update1();
			}		
		}
	}	
var testcluster = new Clusterbomb(0,100,100,2,2,5,8,48,0.95,"red",233,0.3);
//let testcluster = new Clusterbomb(0,ships[0].x+100,ships[0].y,ships[0].vx,ships[0].vy,5,8,48,0.95,"red",233,0.3);
class Abranch{//doesnt work 
	constructor(starttime,startx,starty,startvx,startvy,startdir,startsize,startcolor,maxlength,curl,decay,sway){
		this.t=starttime;
		this.s = startsize;
		this.c = startcolor;
		this.ml = maxlength;
		this.x = startx;
		this.y = starty; 
		this.vx = startvx;
		this.vy = startvy;
		this.decay = decay;
		this.curl = curl;
		this.d = startdir;
		this.branch = [new Umo(startx,starty,startsize,startcolor)];
		this.branch[0].vx = this.vx;
		this.branch[0].vy = this.vy;
		}
	draw(viewx,viewy,thetime){
		var startx = this.x;
		var starty = this.y; 
		var startcolor = this.c;
		var startsize = this.s;
		var i=0;
		var timeseed = Math.floor(time/2);
		while (i<this.ml){
			i=i+1;
			this.s = this.s*this.decay;
			this.d = this.d + this.curl;
			this.x = this.x+this.s*Math.cos(this.d);
			this.y = this.y+this.s*Math.sin(this.d);
			if ((timeseed+i)%6 == 0){this.c = "orange";}
			else if ((timeseed+i)%6 == 1){this.c = "yellow";}
			else if ((timeseed+i)%6 == 2){this.c = "green";}
			else if ((timeseed+i)%6 == 3){this.c = "blue";}
			else if ((timeseed+i)%6 == 4){this.c = "purple";}
			else if ((timeseed+i)%6 == 5){this.c = "red";} else {this.c=="white";}
			}
	
		//var dt = thetime-this.t;
		//if (dt<this.branch.length){var i=dt;}
		//else{var i=this.branch.length;}
		var i=this.branch.length;
		while(i>0){
			i=i-1;
			this.branch[i].drawdot(viewx,viewy);
			}
		this.branch = [new Umo(startx,starty,startsize,startcolor)];//resets after being drawn
		this.branch[0].vx = this.vx;
		this.branch[0].vy = this.vy;
		}
	
	}
//let testAbranch1 = new Abranch(time,ships[0].x,ships[0].y,ships[0].vx,ships[0].vy,0,64,"red",16,0.3,0.9,0.2);