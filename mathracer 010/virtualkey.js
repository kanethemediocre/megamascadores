class Virtualkey{
	constructor(key,label,x,y){
		this.x = x;
		this.y = y;
		this.key = key;
		this.label = label;
		this.c = "white";
		this.display = true;
		this.active = true;
		}
	draw(){
		if (this.display){
			context.strokeStyle = this.c;
			context.lineWidth = 2;
			context.beginPath();
			context.rect(this.x,this.y,14+10*this.label.length,24);
			context.stroke();
			context.fillStyle = this.c;
			context.font='16px Courier New';
			context.fillText(this.label,this.x+7,this.y+16);
			}
		}
	inside(xx,yy){
		if ((this.active)&&(xx>this.x)&&(xx<this.x+14+10*this.label.length)&&(yy>this.y)&&(yy<this.y+24)){//Size code <<here<< needs to match size code in ^^draw function^^
			return true;
			}
		else{
			return false;
			}
		}
	
	}