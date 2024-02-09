function allvkeys(xmax,ymax){   //constructor(key,label,x,y){
	var svk=new Virtualkey("s","Empezar",canvas.width/2-64,150);//constructor(key,label,x,y){
	var avk=new Virtualkey("+","Matemáticas",canvas.width/2-64,250);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","Geografía",canvas.width/2-64,350);//constructor(key,label,x,y){
	var pvk1=new Virtualkey("1","Un jugador",canvas.width/2-64,450);//constructor(key,label,x,y){
	var pvk2=new Virtualkey("2","Dos jugadores",canvas.width/2-64,550);//constructor(key,label,x,y){
	return [svk,avk,gvk,pvk1,pvk2];
}
