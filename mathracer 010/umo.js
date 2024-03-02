class Umo { //Universal Moving Object
	constructor(xxx, yyy, sss, ccc) {
		this.name = "CactusFantastico";
		this.type = "unspecified"; //I might use this to identify different
		this.x = xxx; //x
		this.y = yyy; //y
		this.c = ccc; //color
		//this.c2 = "red";
		var bcolor0 = this.c;
		var bcolor1 = "red";//default handles this.c == "purple";
		var bcolor2 = "orange";
		var bcolor3 = "yellow";
		var bcolor4 = "green";
		var bcolor5 = "blue";
		if (this.c=="red"){
			bcolor1 = "orange";
			bcolor2 = "yellow";
			bcolor3 = "green"; 
			bcolor4= "blue"; 
			bcolor5 = "purple";
			}
		if (this.c=="orange"){
			bcolor1 = "yellow";
			bcolor2 = "green";
			bcolor3= "blue";
			bcolor4 = "purple";
			bcolor5 = "red";
			}
		if (this.c=="yellow"){
			bcolor1 = "green";
			bcolor2= "blue";
			bcolor3 = "purple";
			bcolor4 = "red"; 
			bcolor5 = "orange";
			}
		if (this.c=="green"){
			bcolor1= "blue";
			bcolor2 = "purple"; 
			bcolor3 = "red"; 
			bcolor4 = "orange"; 
			bcolor5 = "yellow";
			}
		if (this.c=="blue"){
			bcolor1 = "purple"; 
			bcolor2 = "red";
			bcolor3 = "orange"; 
			bcolor4 = "yellow"; 
			bcolor5 = "green";
			}
		this.c2 = bcolor1;
		this.colors = [bcolor0,bcolor1,bcolor2,bcolor3,bcolor4,bcolor5];
		//this.c2 = 0; //Not a color, used to exclude 2-tone functions on single color umos.
		this.s = sss; //size
		this.d = 0; // direction
		this.vx = 0; //start with 0 velocity 
		this.vy = 0;
		this.vd = 0; //0 rotation 
		this.m = this.s*this.s*this.s; //So far only used by gravitate function.
		this.thrust = 0;
		this.thruststate = 0;
		this.deadtime = 0;   //0 is alive.  N is dead for N more frames.
		this.hp = 100 ; //This is used for destructible entities to track health
		this.maxhp = 100;
		this.timer = 0; //Used for bombs.  Could maybe be consolidated with deadtime.
		this.hurt = 16 ; //used for bombs and planets.  Determines damage.
		this.boombuff = 0.5 ; // used for bombs.  Multiplies blast radius
		this.shield = 50; //for ships, mostly
		this.maxshield = 50; 
		this.shieldregen = 1;
		this.polyradius = [1,1,1]; //Default values are the triangle originally
		this.polytheta = [0,0.8*Math.PI,1.2*Math.PI];	//used for ship drawing
		this.level = 1; //Describes difficulty of a given ship
		this.grange = 0; //For limiting gravity to only affect nearby ships, helps performance in some circumstances.
		this.parentid = 0;
		this.active = true; //Flag indicating if ship (or planet's ships) needs to be considered by the game engine 
		this.shopchart = [];//["Item Name","Item type",price,tier]
		this.user = -1; //For determining if a bomb should make a hit confirm sound on impact.
		this.ai = "none";
		this.aistate = "none";
		this.aitargets = [];
		this.damagestate = 0;
		this.shielddamagestate = 0;
		}
	update1(){ //Pure motion update.
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
		this.d = this.d + this.vd;
		}
	distance(relation){
		var dx = this.x - relation.x; 
		var dy = this.y - relation.y;
		return Math.sqrt(((dx)*(dx) + (dy)*(dy)));	
	}
	deltav(relation){ //returns magnitude only
		var dvx = this.vx - relation.vx; 
		var dvy = this.vy - relation.vy;
		return Math.sqrt(((dvx)*(dvx) + (dvy)*(dvy)));			
		}
	deltav2(relation){//returns magnitude, direction (polar vector)
		var dvx = this.vx - relation.vx; 
		var dvy = this.vy - relation.vy;
		var mag = Math.sqrt(((dvx)*(dvx) + (dvy)*(dvy)));	
		var dir =  -1*Math.atan2(dvx,dvy) - Math.PI/2;
		return [mag,dir];
		}
	pointingat(that){//objdir,dir,distance,size){ //are you pointing at a thing?
		//var objdir = this.directionof(that);
		//var dir = this.d;
		//var distance = this.distance(that);
		//var size = that.s;
		var as = Math.atan2(that.s,this.distance(that)); //how much angle does the thing occupy?
		var dd = this.d -  this.directionof(that); //How much off the actual direction are you pointing?
		while (dd > Math.PI){dd = dd - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (dd < -1*Math.PI){dd = dd + 2*Math.PI;}
		while (as > Math.PI){as = as - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (as < -1*Math.PI){as = as + 2*Math.PI;}
		if ((dd<as)&&(dd>-1*as)){//-1*anglesize < deltadir < anglesize
			return true;
			}else {return false;}
		}
	match(that){  //This basically synchronizes two moving bodies
		this.x = that.x; //same position
		this.y = that.y;
		this.vx = that.vx;//same velocity
		this.vy = that.vy;
		this.d = that.d; //same direction
	}
	damage(dmg){ //Automatically applies damage to shield and hitpoints as appropriate
		this.shielddamagestate = 3;
		if (this.shield > dmg){
			this.shield = this.shield - Math.floor(dmg);
		}else{
			this.hp = this.hp - Math.floor(dmg) + this.shield;
			this.shield = 0;
			this.damagestate = 3;//Displays as damaged for 3 frames after being hit
			}
		}
	damagewithsound(dmg){ //Automatically applies damage to shield and hitpoints as appropriate
		//This is maybe obselete with global damage state checks
		this.shielddamagestate = 3;
		var shielddamagesounds = [shieldhit0,shieldhit1,shieldhit2,shieldhit3];
		var shielddamagei = Math.floor(Math.random()*shielddamagesounds.length);
		shielddamagesounds[shielddamagei].play();
		if (this.shield > dmg){
			this.shield = this.shield - Math.floor(dmg);
		}else{
			this.hp = this.hp - Math.floor(dmg) + this.shield;
			this.shield = 0;
			this.damagestate = 3;//Displays as damaged for 3 frames after being hit
			var armordamagesounds = [armorhit0];
			var armordamagei = Math.floor(Math.random()*armordamagesounds.length);
			armordamagesounds[armordamagei].play();
			}
		}
	collide(that){ //circular collision function
		if (this.distance(that) < (this.s + that.s)) {return true; }else{return false;} 
		} //Doesn't bounce or damage, just returns 1 if a collision is occuring.
	directionof(destination){
		var dx = this.x - destination.x; 
		var dy = this.y - destination.y;
		var	dirof = 0;	
		dirof = -1*Math.atan2(dx,dy) - Math.PI/2;//Sort of trial and error for this
		return dirof;	
		}
	track(target,trackspeed) { //Basic tracking algorithm.  Can be used to track any object compatible 
		var td = this.directionof(target); //with directionof, which just needs a .x and .y to work with
		var dd = this.directionof(target)-this.d;
		while (dd > Math.PI){dd = dd - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (dd < -1*Math.PI){dd = dd + 2*Math.PI;} //which 
		if (dd > trackspeed*1.25){ this.vd =trackspeed; }
		else if (dd < trackspeed*-1.25){ this.vd = -1*trackspeed; }
		else {	this.vd = 0; }
		}
	fasttrack(target) { //Basic tracking algorithm.  Can be used to track any object compatible 
			this.d = this.directionof(target);
		}
	trackdv(target) { //Points in direction thrust is needed in order to match velocity.
		var td = this.deltav2(target)[1]; //with directionof, which just needs a .x and .y to work with
		var dd = this.deltav2(target)[1]-this.d;
		while (dd > Math.PI){dd = dd - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (dd < -1*Math.PI){dd = dd + 2*Math.PI;} //which 
		if (dd > .04){ this.vd =+.03; }
		else if (dd < -0.04){ this.vd = -.03; }
		else {	this.vd = 0; }
		}
	fasttrackdv(target) { //Points in direction thrust is needed in order to match velocity.
		this.d = this.deltav2(target)[1]; //with directionof, which just needs a .x and .y to work with
		}
	hold(target,period,gametime){
		var dv = this.deltav2(target); 
		this.d = dv[1];
		if ((gametime%period == 0)&&(Math.abs(dv[0])>1)){
			this.thrust = 2;
			}
		}
	seek3(target,closingvelocity,period,gametime,stopradius){//Points to target, accelerates towards target
		var dv = this.deltav2(target); //[mag,dir]
		var d = this.directionof(target);
		var distance = this.distance(target);
		//var cosdv = Math.cos(dv[1]-this.directionof(target))*dv[0];
		//var sindv = Math.sin(dv[1]-this.directionof(target))*dv[0];
		//if (Math.cos(dv[1])>0.5){}
		
		var sindv = -1*Math.sin(dv[1]-d)*dv[0];
		var cosdv = -1*Math.cos(dv[1]-d)*dv[0];// -1 shouldn't be here, but it is off by -1 otherwise.

		//var cv = closingvelocity;
		var cv = distance/1024;
		var approachdistance = 1.25*period*dv[0]*dv[0]/2+target.s+stopradius;//period*dv[0] is time to stop from speed dv[0].  dv[0]/2 is average velocity during stopping.   == 120cv
		
		//context.fillText(sindv, 500, 500);
		//context.fillText(cosdv,500,600);
		//context.fillText(cv,500,700);
		//context.fillText(approachdistance,500,800);
		
		if (this.distance(target)<approachdistance){
			this.hold(target,period,gametime);
		}else if (sindv>2){
			this.d = d-Math.PI/2;
			if (gametime%period == 0){this.thrust = 2;}
		}else if (sindv<-2){
			this.d = d+Math.PI/2;
			if (gametime%period == 0){this.thrust = 2;}
		}else if (cosdv<cv){
			this.d = d;
			if (gametime%period == 0){this.thrust = 2;}
			}
		}
	seek4(target,period,gametime,stopradius,stoporbit){//Points to target, accelerates towards target
		if (gametime%period == 0){
			var dv = this.deltav2(target); //[mag,dir]
			var d = this.directionof(target);
			var distance = this.distance(target);
			var sindv = -1*Math.sin(dv[1]-d)*dv[0];
			var cosdv = -1*Math.cos(dv[1]-d)*dv[0];// -1 shouldn't be here, but it is off by -1 otherwise.
			var cv = distance/1024;
			var approachdistance = 1.25*period*dv[0]*dv[0]/2+target.s+stopradius;//period*dv[0] is time to stop from speed dv[0].  dv[0]/2 is average velocity during stopping.   == 120cv
			
			context.fillText(sindv, 500, 500);
			context.fillText(cosdv,500,600);
			context.fillText(cv,500,700);
			context.fillText(approachdistance,500,800);
			
			 if (this.distance(target)<stopradius*1.5){
				if (sindv>2+stoporbit){this.d = d-Math.PI/2;}
				else if (sindv<-2+stoporbit){this.d = d+Math.PI/2;}
				else if (this.distance(target)<stopradius){this.d = d + Math.PI;}
				this.thrust = 2;
			}else if (this.distance(target)<approachdistance){
				this.hold(target,period,gametime);
			}else if (sindv>2){
				this.d = d-Math.PI/2;
				this.thrust = 2;
			}else if (sindv<-2){
				this.d = d+Math.PI/2;
				this.thrust = 2;
			}else if (cosdv<cv){
				this.d = d;
				this.thrust = 2;
				}
			}
		}
	gravitate(pulled){ //For planets.
		var dx = this.x - pulled.x; 
		var dy = this.y - pulled.y;
		var distance2 = dx*dx+dy*dy
		if ((this.grange==0)||(distance2<1000000)){//Effective distance of 2000
			var distance = Math.sqrt(distance2);
			var gconstant = 0.0003;
			var magnitude = (gconstant*this.m)/(distance2);
			var dcos = dx/distance;
			var dsin = dy/distance;
			pulled.vx = pulled.vx + magnitude*dcos;
			pulled.vy = pulled.vy + magnitude*dsin;
			}
		}
	gravitategroup(pulled){ //Input is a list of objects to pull.  
		var i = pulled.length;
		var dx, dy, distance, gconstant, magnitude, dcos, dsin;
		while (i>0){ //Cycles through list of objects to be pulled
			i=i-1;
			dx = this.x - pulled[i].x; 
			dy = this.y - pulled[i].y;
			distance = Math.sqrt(((dx)*(dx) + (dy)*(dy)));
			gconstant = 0.0003;
			magnitude = (gconstant*this.m)/(distance*distance);
			dcos = dx/distance;
			dsin = dy/distance;
			pulled[i].vx = pulled[i].vx + magnitude*dcos;
			pulled[i].vy = pulled[i].vy + magnitude*dsin;
			}
		}	
	push(mag,dir){//Poor word choice, but it's already widely used.
		this.vx = this.vx + mag*Math.cos(dir);
		this.vy = this.vy + mag*Math.sin(dir);
	}
	circlecollide(that){			//circular bouncing where 1 object is affected
		if (this.distance(that) < (this.s + that.s)) {
			var dir = this.directionof(that);
			var dvx = this.vx - that.vx;
			var dvy = this.vy - that.vy;
			var thedeltav = this.deltav2(that);
			var dvmag = thedeltav[0];
			var dvdir = thedeltav[1];
			var pushmag = Math.cos(dir - dvdir)*dvmag;
			that.push(-2*pushmag, (this.directionof(that)));
			that.damage(this.hurt); 
			}
		}
	circlecollidesafe(that){			//circular bouncing where 1 object is affected
		if (this.distance(that) < (this.s + that.s)) {
			var dir = this.directionof(that);
			var dvx = this.vx - that.vx;
			var dvy = this.vy - that.vy;
			var thedeltav = this.deltav2(that);
			var dvmag = thedeltav[0];
			var dvdir = thedeltav[1];
			var pushmag = Math.cos(dir - dvdir)*dvmag;
			that.push(-2*pushmag, (this.directionof(that)));
			//that.damage(this.hurt); 
			}
		}
	circlecollide3(that){//Circular bouncing where both objects are affected, very untested, old
		var dv = this.deltav2(that);
		var dir = this.directionof(that);//also transform angle
		var dvta = [dv[0],dv[1]-dir]; //maybe backwards?  Mag and direction
		var bvx = Math.cos(dvta[1])*dvta[0]; //relative 
		var bvy = Math.sin(dvta[1])*dvta[0];
		var bvx2 = -1*bvx; //holds if I did the trasform right
		var bvy2 = bvy;
		var bv2dir = Math.atan2(bvx2/bvy2);
		var bv2mag = Math.sqrt(bvx2*bvx2+bvy2*bvy2);
		var bvta2 = [bv2mag, bv2dir];//Also maybe backwards?
		var bv2 = [bv2mag, bv2dir-dir];//Also maybe backwards?
		var avx2 = 2*that.m*bvx/this.m;
		var avta2 = [avx2,0]; //Magnitude, direction again
		var av2 = [avx2,dir]; //also maybe backwards?
		}
	circlecollide2(that){//Circular bouncing where both objects are affected.  
		if (this.distance(that)<(this.s+that.s)){
			var cdir = this.directionof(that);//Not real elastic collisions, but these at least keep ships from overlapping long.  Mass is not considered.
			this.push(1,cdir+Math.PI);//In some circumstances this does act as a reasonable approximation of an elastic collision.
			that.push(1,cdir);//Objects are pushed away from each other along the contact axis by a constant amount, but it gets applied every frame the objects overlap.
			}
		}	
	circlecollide4(that){//Circular bouncing where both objects are affected according to their mass
		if (this.distance(that)<(this.s+that.s)){
			// Distance between balls
			var fDistance = Math.sqrt((this.x - that.x)*(this.x - that.x) + (this.y - that.y)*(this.y - that.y));

			// Normal
			var nx = (that.x - this.x) / fDistance;
			var ny = (that.y - this.y) / fDistance;

			// Tangent
			var tx = -ny;
			var ty = nx;

			// Dot Product Tangent
			var dpTan1 = this.vx * tx + this.vy * ty;
			var dpTan2 = that.vx * tx + that.vy * ty;

			// Dot Product Normal
			var dpNorm1 = this.vx * nx + this.vy * ny;
			var dpNorm2 = that.vx * nx + that.vy * ny;

			// Conservation of momentum in 1D
			var m1 = (dpNorm1 * (this.m - that.m) + 2.0 * that.m * dpNorm2) / (this.m + that.m);
			var m2 = (dpNorm2 * (that.m - this.m) + 2.0 * this.m * dpNorm1) / (this.m + that.m);
			// Update ball velocities
			this.vx = tx * dpTan1 + nx * m1;//This formula was adapted from https://github.com/OneLoneCoder/videos/blob/master/OneLoneCoder_Balls1.cpp
			this.vy = ty * dpTan1 + ny * m1;
			that.vx = tx * dpTan2 + nx * m2;
			that.vy = ty * dpTan2 + ny * m2;
			}
		}			
	bombcollide(that){ //explodes on contact, damages every frame in explosion
		if (this.distance(that) < (this.s + that.s)) {
			that.damage(this.hurt); //Automatically proportional based on time spent inside 
			if (this.timer>12){this.timer = 12;}//sets off explosion by setting timer to start of explosion
			if (this.user == 0){
				//ideally only play on first frame
				}
			return true;//Returns true if the collision occurred.
			}
		else {return false;}
		}
	squarebouncecollide(that){
		var dx = this.x-that.x;
		var dy = this.y-that.y;
		if ((( dx<(this.s+that.s) )&&( dx>-1*(this.s+that.s) ))&&(( dy<(this.s+that.s) )&&( dy>-1*(this.s+that.s) ))) {
			//Checks if in x range AND in y range.  
			var dvx = this.vx - that.vx;
			var dvy = this.vy - that.vy;
			if (dx*dx > dy*dy){ //closer in Y than X, bounce off vertical wall.  Squared to make postive for comparison
				that.vx = that.vx + 2*dvx;//Adds double the X-axis difference to cancel and reverse the X velocity difference.
				that.damage(dvx); //damage proportional to closing velocity
				}
			if (dy*dy > dx*dx){ //closer in X than Y, bounce off horizontal wall
				that.vy = that.vy + 2*dvy;
				that.damage(dvy);
				}
			}
		}
	drawship(viewx, viewy){ //Ships are drawn as polar polygons, a triangle is the default.  Viewx/viewy are camera center
		var x = this.x - viewx + canvas.width/2; //normally camera center being the player ship.
		var y = this.y - viewy + canvas.height/2;
		var color1 = this.c;
		var color2 = this.c2;
		var shieldgradient = context.createRadialGradient(this.x-viewx+canvas.width/2, this.y-viewy+canvas.height/2, this.s-12, this.x-viewx+canvas.width/2, this.y-viewy+canvas.height/2, this.s+16);
		shieldgradient.addColorStop(0, "white");
		//shieldgradient.addColorStop(0.2, "blue");
		shieldgradient.addColorStop(0.5, "blue");
		//shieldgradient.addColorStop(0.5, "purple");
		//shieldgradient.addColorStop(0.6, "blue");
		//shieldgradient.addColorStop(0.8, "blue");
		shieldgradient.addColorStop(1, "white");
		var shieldcolor = shieldgradient;
		if (this.damagestate>0){
			color1 = randcolor();
			color2 = randcolor();
			}
		if (this.shielddamagestate>0){shieldcolor = randcolor(); }
		drawpolarpoly(x,y,this.polytheta, this.polyradius, this.s, color1, this.d);//ship polyon
		drawpolarpoly(x,y,this.polytheta, this.polyradius, this.s-8, color2, this.d);//ship polyon
		var shieldthick = Math.floor(this.shield*8/this.maxshield); //shield
		if (shieldthick>0){ //Needs to not render at all sometimes because linewidth of 0 is ignored instead of invisible.
			context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
			context.arc(x, y, this.s+2, 0, 2 * Math.PI, false); //until linewidth of 1 is reached.
			context.lineWidth = shieldthick;
			context.strokeStyle = shieldcolor;
			context.stroke();	
		}//Now a health bar/////////////////////////////////////////
		var prop = this.hp / this.maxhp;
		var hpc = "green"; //health bar color depends on healthiness
		if (prop < 0.66){ hpc = "yellow"; }
		if (prop < 0.33){ hpc = "red"; }
		context.fillStyle = hpc; //health bar color depends on ship condition
		context.fillRect(x-this.s/2, y+this.s, Math.floor(this.s*prop), 4);
		}
	drawbeam(viewx,viewy,time,start,range){//none of this works, not even the console.log
		console.log("time = "+time);
		console.log("range = "+range);
		var n1 = Math.floor(time/4)%6;
		var n2 = Math.floor(time/4+1)%6;
		var n3 = Math.floor(time/4+2)%6;
		var beamcolor1 = rainbow(n1);
		var beamcolor2 = rainbow(n2);
		var beamcolor3 = rainbow(n3);
		var xog = this.x-viewx;//x origin
		var yog = this.y-viewy;//y origin
		var cosd = Math.cos(this.d);//cos of ship direction
		var sind = Math.sin(this.d);
		//var range = aplayer.blasters[aplayer.wep].timer+32;
		//context.beginPath();
		//context.lineWidth = 12; 
		//context.moveTo(xog+cosd*32, yog+sind*32);
		//context.lineTo(xog+cosd*range,yog+sind*range);
		//context.strokeStyle = beamcolor1;
		//context.stroke();	
		//context.beginPath();
		//context.lineWidth = 8; 
		//context.moveTo(xog+cosd*32, yog+sind*32);
		//context.lineTo(xog+cosd*range,yog+sind*range);
		//context.strokeStyle = beamcolor2;
		//context.stroke();
		context.beginPath();
		context.lineWidth = 4; 
		context.moveTo(xog+cosd*32, yog+sind*32);
		context.lineTo(xog+cosd*range,yog+sind*range);
		context.strokeStyle = beamcolor3;
		context.stroke();
		}
	drawplanet(viewx, viewy){ //input variables are player ship/camera position
		var x = this.x - viewx + canvas.width/2; //this function draws object as a circle,
		var y = this.y - viewy + canvas.height/2; //and labels it
		context.beginPath();
		context.strokeStyle = this.c; //sets planet color
		context.arc(x, y, this.s, 0, 2 * Math.PI, false); //draws the circle
		context.lineWidth = 16; //circle is thicc
		context.stroke();	//ok now actually draw it.
		if ((this.c2!==0)&&(this.s>16)){
			context.beginPath();
			context.strokeStyle = this.c2; //sets planet color
			context.arc(x, y, this.s-8, 0, 2 * Math.PI, false); //draws the 2nd outermost circle
			context.lineWidth = 8; //circle is thicc
			context.stroke();	//ok now actually draw it.
			context.beginPath();
			context.fillStyle = this.c; //sets planet color
			context.arc(x, y, this.s-12, 0, 2 * Math.PI, false); //draws the innermost circle
			context.lineWidth = 8; //circle is thicc
			context.fill();	//ok now actually FILL it.

			context.beginPath();
			context.fillStyle = this.c2; //sets color of secondary blobs
			var i=0;
			while(i<this.polytheta.length){
				context.beginPath();
				var blobsize = this.s*0.5*this.polyradius[i]
				var blobdistance = this.s - blobsize-4;
				var blobx = x+Math.cos(this.polytheta[i])*blobdistance;
				var bloby = y+Math.sin(this.polytheta[i])*blobdistance;
				context.arc(blobx, bloby, blobsize, 0, 2 * Math.PI, false); //draws the innermost circle
				context.lineWidth = 8; //circle is thicc
				context.fill();	//ok now actually FILL it.
				i=i+1;
				}
			}
		context.textAlign = "center";
		context.fillStyle = "white"; 
		context.font='20px Arial';
		context.fillText(this.name,x,y);	
		context.textAlign = "start";
	}
	drawbomb(viewx, viewy){ //Bombs are also drawn as circles, but not labelled.
		var x = this.x - viewx + canvas.width/2;
		var y = this.y - viewy + canvas.height/2;
		var bcolors = this.colors;
		if (this.s>0){
			var bci = 0;
			var bcolornow = this.c;
			context.beginPath();
			context.strokeStyle = bcolornow;
			context.arc(x, y, this.s, 0, 2 * Math.PI, false);
			context.lineWidth = 8;
			context.stroke();

			bci++;
			var bcolornow = this.c2;
			if (this.s>4){
				context.beginPath();
				context.strokeStyle = bcolornow;
				context.arc(x, y, this.s-4, 0, 2 * Math.PI, false);
				context.lineWidth = 4;	
				context.stroke();	
				}
			var rnow = this.s-8
			while ((rnow>6)&&(bci<99)){
				bci++;
				var bcolornow = bcolors[bci%6];
				var linewidthnow = 4;//Math.floor(5-bci/2);
				if (bci>6){
					bcolornow = this.c;
					//if (bci%2==0){bcolornow = this.c2;}
					linewidthnow = 1;
					rnow = rnow - 2;
					}
				context.beginPath();
				context.strokeStyle = bcolornow;
				context.arc(x, y, rnow, 0, 2 * Math.PI, false);
				context.lineWidth = linewidthnow;//4;	
				context.stroke();
				rnow = rnow - 4;//Math.floor(4+bci*bci/3);				
				}
			//context.beginPath();
			//context.strokeStyle = this.c2;
			//context.arc(x, y, this.s, 0, 2 * Math.PI, false);
			//context.lineWidth = 2;	
			//context.stroke();					
		}else{
			context.beginPath();
			context.strokeStyle = this.c;
			context.arc(x, y, this.s, 0, 2 * Math.PI, false);
			context.lineWidth = 4;
			context.stroke();
			}
			
	}
	drawdot(viewx, viewy){ //Draws as a solid circle
		var x = this.x - viewx + canvas.width/2;
		var y = this.y - viewy + canvas.height/2;
		context.beginPath();
		context.strokeStyle = this.c;
		context.arc(x, y, this.s, 0, 2 * Math.PI, false);
		context.fillStyle = this.c;
		context.fill();
		context.lineWidth = 2;
		context.stroke();		 
	}
	drawstation(viewx, viewy){ //input variables are player ship position
		var x = this.x - viewx + canvas.width/2;//stations are squares for now
		var y = this.y - viewy + canvas.height/2;
		drawpolarpoly(x,y,this.polytheta, this.polyradius, this.s, this.c, this.d);//ship polyon
		drawpolarpoly(x,y,this.polytheta, this.polyradius, this.s-16, this.c2, this.d);//ship polyon but smaller, makes first one the outline
		drawpolarpoly(x,y,this.emblem[0],this.emblem[1],this.s/2,this.c,this.d); //this.emblem is a randomized logo
		context.textAlign = "center";
		context.fillStyle = "white";
		context.font='20px Arial';
		context.fillText(this.name,x,y);	
		context.textAlign = "start";
	}
	dock(dship){
		var offsetd = 0;
		var offsetr = 128;
		dship.match(this);
		dship.x = this.x+offsetr*Math.cos(this.d+offsetd);
		dship.y = this.y+offsetr*Math.sin(this.d+offsetd);
		dship.d = this.d;
		}
	undock(dship){
		var offsetd = 0;
		var offsetr = 200;
		dship.match(this);
		dship.x = this.x+offsetr*Math.cos(this.d+offsetd);
		dship.y = this.y+offsetr*Math.sin(this.d+offsetd);
		dship.d = this.d;
		dship.push(2,this.d);
		}
	drawreticle(viewx, viewy, rcolor){ //input variables are player ship / camera position
		var x = this.x - viewx + canvas.width/2; //draws reticle around object
		var y = this.y - viewy + canvas.height/2; //circular reticle.
		context.strokeStyle = rcolor;
		//if (this.ai.playerhostile == true){ context.strokeStyle = "red"; }
		//if (this.ai.team == "trader"){ context.strokeStyle = "blue"; }
		var dx = this.s+12;
		var dy = this.s+12;
		var tick = 12;
		context.beginPath();
		context.moveTo(x+dx-tick,y+dy);
		context.lineTo(x+dx,y+dy);
		context.lineTo(x+dx,y+dy-tick);
		
		context.moveTo(x+dx,y-dy+tick);
		context.lineTo(x+dx,y-dy);
		context.lineTo(x+dx-tick,y-dy);
		
		context.moveTo(x-dx+tick,y+dy);
		context.lineTo(x-dx,y+dy);
		context.lineTo(x-dx,y+dy-tick);
		
		context.moveTo(x-dx+tick,y-dy);
		context.lineTo(x-dx,y-dy);
		context.lineTo(x-dx,y-dy+tick);		
		context.lineWidth = 2;
		context.stroke();	
		}
	drawcompass(targetship, compassx, compassy, compasssize){  //Draws a triangle pointing in direction of targetship
		var de = targetship.directionof(this); //targetship doesn't actually have to be a ship
		var tipx = Math.cos(de)*compasssize + compassx; //triangle points
		var tipy = Math.sin(de)*compasssize + compassy; //sort of from polar coordinates
		var taillx = Math.cos(de + 0.9*Math.PI)*compasssize + compassx;
		var tailly = Math.sin(de + 0.9*Math.PI)*compasssize + compassy;
		var tailrx = Math.cos(de + 1.1*Math.PI)*compasssize + compassx;
		var tailry = Math.sin(de + 1.1*Math.PI)*compasssize + compassy;
		context.fillStyle = this.c; //Now actual drawing of the things
		context.beginPath(); 
		context.moveTo(tipx, tipy); //Could be consolidated for less lines with above.
		context.lineTo(taillx, tailly);
		context.lineTo(tailrx, tailry);
		context.lineTo(tipx, tipy);
		context.fill();
		context.font='12px Arial';
		context.fillStyle = "white";
		//context.fillText(this.name,compassx-8,compassy - 48);
		context.textAlign = "center";
		context.fillText(this.name,compassx,compassy - compasssize);
		context.fillStyle = "white";
		context.textAlign = "start";
		//context.fillText(this.hp,compassx-8,compassy - 32);
		context.fillStyle = "white";
		context.fillText(Math.floor(this.distance(targetship)),compassx-16,compassy + compasssize);
		}// end compass stuff
		
	drawcompass2(targetship, compassx, compassy, compasssize){  //Draws a triangle pointing in direction of targetship
		var de = this.directionof(targetship); //targetship doesn't actually have to be a ship
		var tl = [0,0.05,0.4,-0.4,-0.05];
		var rl = [1,0.85,0.8,0.8,0.85];
		drawpolarpoly(compassx,compassy,tl, rl, compasssize, "yellow", de);//function drawpolarpoly(px,py,thetalist, radiuslist, size, color, dir){
		drawpolarpoly(compassx,compassy,targetship.polytheta, targetship.polyradius, compasssize*0.5, targetship.c, targetship.d);//function drawpolarpoly(px,py,thetalist, radiuslist, size, color, dir){
		drawpolarpoly(compassx,compassy,targetship.polytheta, targetship.polyradius, compasssize*0.5-8, targetship.c2, targetship.d);//function drawpolarpoly(px,py,thetalist, radiuslist, size, color, dir){
		context.font='12px Arial';
		context.fillStyle = "white";
		//context.fillText(this.name,compassx-8,compassy - 48);
		context.fillText(targetship.name,compassx-8,compassy - compasssize);
		context.fillStyle = "white";
		//context.fillText(this.hp,compassx-8,compassy - 32);
		context.fillStyle = "white";
		context.fillText(Math.floor(this.distance(targetship)),compassx-16,compassy + compasssize);
		}// end compass stuff
	updateship(theplanets){//Unfortunately I need access to the list of planets to handle ship respawning.
		//this.deadtime = this.deadtime - 1;
		//if ((this.deadtime < 0) && (this.hp == -1000)){
		//	this.respawn(theplanets[this.parentid]); //maybe change how I handle this
		//	if (this.name == "Cactus Fantastico"){//default/player umo name
		//		respawn1.play();
		//		}
		//	}
		if (this.thrust > 0){ //skips these calculations if no thrust
			this.vx = this.vx + this.thrust*Math.cos(this.d);
			this.vy = this.vy + this.thrust*Math.sin(this.d);
			if (this.ai == "player"){//quick hack to prevent other ships movements affecting player thruster energy and stuff.
				this.thruststate = 4+systems[ps].players[0].upgrades[6].tier;
				//console.log(systems[ps].players[0].upgrades[6].tier);
				systems[ps].players[myi].thruster = systems[ps].players[myi].thruster - 24;//Weird global scope used here.  Maybe handle this on the control side.
				enginesound1.play();
				}
			}
		if (this.thruststate>0){  //Most of this is drawing, not updating.
			this.thruststate--;
			if (this.thruststate >= 6){	this.thruststate = 6; }
			var maxthruststate = 3+systems[ps].players[0].upgrades[6].tier
			if (maxthruststate >= 6){ maxthruststate = 6; }
			var td = 48+(maxthruststate-this.thruststate)*16;
			var tr = 24+maxthruststate-(maxthruststate-this.thruststate)*2;
			var x = Math.cos(this.d+Math.PI)*td + canvas.width/2;
			var y = Math.sin(this.d+Math.PI)*td + canvas.height/2;
			var flamecolor = "red";
				if (this.thruststate >= 6){
					this.thruststate = 6;
					flamecolor="purple";
					}
				if (this.thruststate == 5){flamecolor="blue";}
				if (this.thruststate == 4){flamecolor="green";}
				if (this.thruststate == 3){flamecolor="yellow";}
				if (this.thruststate == 2){flamecolor="orange";}
				context.beginPath();
				context.strokeStyle = flamecolor;
				context.arc(x, y, tr, 0, 2 * Math.PI, false);
				context.fillStyle = flamecolor;
				context.fill();
				context.lineWidth = 2;
				context.stroke();	
				//enginesound1.play();
			}
		if (this.damagestate>0){this.damagestate = this.damagestate-1;}
		if (this.shielddamagestate>0){this.shielddamagestate = this.shielddamagestate-1;}
		this.thrust = 0; //keeps thrusters momentary
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
		this.d = this.d + this.vd;
		//if ((this.hp <= 0) && (this.hp !==-1000)){ this.killship(1800); }
		if (this.thruster > 100){ this.thruster = 100; }
		this.energy = this.energy + 1;
		if (this.energy > 100){	this.energy = 100; }				
		this.shield = this.shield + this.shieldregen;
		if (this.shield > this.maxshield){ this.shield = this.maxshield; }			
		}
	updatepivot(){//Not used yet.
		if (this.damagestate>0){this.damagestate = this.damagestate-1;}
		if (this.shielddamagestate>0){this.shielddamagestate = this.shielddamagestate-1;}
		this.thrust = 0; //keeps thrusters momentary
		if ((this.hp <= 0) && (this.hp !==-1000)){ this.killship(1800); }
		this.deadtime = this.deadtime - 1;
		//this.energy = this.energy + 1;
		//if (this.energy > 100){	this.energy = 100; }				
		this.shield = this.shield + this.shieldregen;
		if (this.shield > this.maxshield){ this.shield = this.maxshield; }			
		//if ((this.deadtime < 0) && (this.hp == -1000)){
		//	this.respawn(theplanets[this.parentid]); //maybe change how I handle this
		//	}
		}
	updatebomb(){ //Handles timer and explosions
		this.timer= this.timer -1;
		if (this.timer == 0){this.killbomb();}
		if (this.timer == 1){this.s = 100*this.boombuff;}
		if (this.timer == 2){this.s = 112*this.boombuff;}
		if (this.timer == 3){this.s = 122*this.boombuff;}
		if (this.timer == 4){this.s = 128*this.boombuff;}
		if (this.timer == 5){this.s = 128*this.boombuff;}
		if (this.timer == 6){this.s = 122*this.boombuff;}
		if (this.timer == 7){this.s = 112*this.boombuff;}
		if (this.timer == 8){this.s = 100*this.boombuff;}
		if (this.timer == 9){this.s = 84*this.boombuff;}
		if (this.timer == 10){this.s = 64*this.boombuff;}
		if (this.timer == 11){this.s = 40*this.boombuff;}
		
		if (this.timer>11){
			this.s = 8; //Mostly redundant
			if (this.hp < 0){this.timer = 12;}
			}
		}
	killship(deathtime){ //Ship is dead, and respawns after deathtime frames.
		this.x = 10000000+ Math.random()*1000000; //Dead ships are banished 
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.vd = 0;
		this.d = 0;
		this.deadtime = deathtime+Math.floor(Math.random()*600); //deadtime counts down to trigger respawn
		this.hp = -1000;
		}
	killbomb(){ 
		this.x = 1000000 + Math.random()*100000; //Dead ships are banished 
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.vd = 0;
		this.d = 0;
		this.s = 8;
		}
	setorbit(parentplanet, distance, direction, cw){ //cw = -1 or 1
		this.match(parentplanet); //set velocity and position equal
		this.x = this.x + (distance)*Math.cos(direction); //set relative
		this.y = this.y + (distance)*Math.sin(direction); //start location;
		var gravy = parentplanet.m*.0003 / (distance*distance);  //gMm/r^2, where m is 1;
		var orbitspeed = Math.sqrt(gravy*distance);  //a = v^2/r, a* r = v^2, v = sqrt(a*r)
		this.vx = this.vx + orbitspeed*Math.cos(direction + cw*Math.PI/2);
		this.vy = this.vy + orbitspeed*Math.sin(direction + cw*Math.PI/2);
		}
	respawn(parentplanet){
		var rdir = Math.random()*Math.PI*2; //random direction from planet
		var rdist = parentplanet.s+this.s+12+Math.random()*2*parentplanet.s; //random ish distance
		var rcw = Math.floor(Math.random()*2)*2 - 1; //random orbit direction (-1 or 1);
		this.setorbit(parentplanet, rdist, rdir, rcw);
		this.hp = this.maxhp;
		}
	launchbomb(thebomb, mag, time){ //This allows significant weapon customization in the function call. 
		thebomb.match(this);	// Mag is how hard the bomb is pushed, time is how long before the bomb detonates on it's own.
		thebomb.x = thebomb.x + (this.s+24)*Math.cos(this.d);
		thebomb.y = thebomb.y + (this.s+24)*Math.sin(this.d); 
		thebomb.timer = time;
		thebomb.hp = 1;
		thebomb.push(mag,this.d);
		}
	ispointingat(thetarget){
		var dx = thetarget.s;
		var dy = this.distance(thetarget);
		var dtheta = Math.atan(dx/dy);
		var dd = this.d-this.directionof(thetarget);
		if (dd> Math.PI){dd=dd-2*Math.PI;}
		var answer = false;
		if (dtheta*dtheta > dd*dd){
			answer = true;
			}
		return answer; //wrong for testing
		}
	drawbeam(viewx, viewy, beamlength, beamwidth, beamcolor){  //Draws the lazor
		var x = this.x - viewx + canvas.width/2; //normally camera center being the player ship.
		var y = this.y - viewy + canvas.height/2;
		var beamstartx = x + (this.s+4)*Math.cos(this.d);
		var beamstarty = y + (this.s+4)*Math.sin(this.d); 
		var beamstopx = x + (this.s+4+beamlength)*Math.cos(this.d);
		var beamstopy = y + (this.s+4+beamlength)*Math.sin(this.d); 
		context.strokeStyle = beamcolor; //Now actual drawing of the things
		context.lineWidth = beamwidth;
		context.beginPath(); 
		context.moveTo(beamstartx, beamstarty); 
		context.lineTo(beamstopx, beamstopy);
		context.stroke();
	}
	beamcollide(beamlength, target){ //Returns 1 if the beam of length beamlength is touching target Umo.
	var collide = 0;
	var clearance = this.s+target.s+beamlength;
	if (this.distance(target) < clearance*clearance){
		var deltad = this.d - this.directionof(target);
		if (deltad > Math.PI){deltad = deltad - 2*Math.PI;}
		if (deltad < -1*Math.PI){deltad = deltad + 2*Math.PI;}
		if ((deltad< Math.PI/2)&&(deltad>-1*Math.PI/2)){
			var m = Math.tan(this.d);
			var x1 = this.x;
			var y1 = this.y;
			var x2 = target.x;
			var y2 = target.y; 
			var dy =  m*(x2-x1)+y1-y2 
			var dist = Math.abs(dy/m);
			if (dist<target.s){
				collide = 1;
				}
			}
		}
	return collide;
	}
	makeemblem(numsides,minimumradius){
		this.emblem = randpolarpoly(numsides,minimumradius);			//function randpolarpoly(sides, minradius){//Polygons will be symmetrical, vertices evenly spaced
	}
}//end Umo class.//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
