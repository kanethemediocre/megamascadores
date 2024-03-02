class Mnpc{
	constructor(name,x,y,quests,sprite){
		this.name = name
		this.x = x;
		this.y = y;
		this.quests = quests;
		this.sprite = sprite;
		this.active = false;
		this.visible = true;
		this.completed = false;
		this.text = "Hola, me llamo "+this.name+".";//Recolectar  recoger
		}
	draw(viewx, viewy){
		context.drawImage(this.sprite, this.x-viewx, this.y-viewy);
		context.fillStyle = "white";
		context.fillText(this.name,this.x*xstep-viewx,this.y*ystep-viewy+ystep-20);
		}
	drawmessage(aplayer){
		if ((aplayer.x>=this.x-1)&&(aplayer.x<=this.x+1)&&(aplayer.y>=this.y-1)&&(aplayer.y<=this.y+1)){
			context.fillStyle = "black";
			context.fillRect(canvas.width/2-400,80,800,160);
			context.fillStyle = "yellow";
			context.font = "32px Ariel";
			context.fillText(this.text,canvas.width/2-400,120);
			context.fillStyle = "yellow";
			context.font = "24px Ariel";
			var i=0;
			while (i<this.quests.length){
				context.fillStyle = "yellow";
				if (this.quests[i].completed){context.fillStyle = "gray";}
				context.fillText(i+": "+this.quests[i].text,canvas.width/2-380,160+i*32);
				i++;
				}
			context.strokeStyle = "yellow"
			context.beginPath()
			context.rect(canvas.width/2-400,80,800,160)
			context.stroke();
			}
		}
	
	}