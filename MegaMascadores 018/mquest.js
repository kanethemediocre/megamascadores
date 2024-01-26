class Mquest{
	constructor(answer,quantity,origin,originmap,type){
		this.answer = answer;
		this.quantity = quantity;
		this.gotten = 0;
		this.originnpc = origin;
		this.originmap = originmap;
		this.type = type;//"=" for only exact matches to this.answer, "*" is all multiples of this.answer
		this.reward = "somekindofupgradegoeshere";//something goes here
		this.taken = false;
		this.active = false;
		this.visible = true;
		this.completed = false;
		this.text = "Encuentra "+answer+"s para mi, y mejoraré tu "+this.reward+".  Necesito "+quantity+"."//Recolectar  recoger
		}
	check(theanswer){
		var pass = false;
		if ((this.type=="=")&&(this.answer == theanswer )){pass=true;}
		else if ( (this.type=="*")&&(theanswer%this.answer == 0) ){pass=true;}
		}
	turnin(){
		
		}
	reset(){
		this.taken = false;
		this.active = false;
		this.visible = true;
		this.completed = false;
		}
	draw(xx,yy){
		//console.log("triedtodraw");
		//context.strokeStyle = this.c;
		//context.lineWidth = 2;
		context.fillStyle = "white";
		context.font='16px Courier New';
		context.fillText("Tengo hambre de "+this.answer+", y tiene "+this.gotten+" de "+this.quantity+".",xx,yy);
		//console.log("Itriedtodrawquests1");
		//context.beginPath();
		}
	
	}