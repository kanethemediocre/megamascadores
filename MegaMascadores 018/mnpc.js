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
		this.text = "Hola";//Recolectar  recoger
		}
	draw(viewx, viewy, xstep, ystep){
		context.drawImage(this.sprite, this.x*xstep-viewx, this.y*ystep-viewy);
		}
	
	}