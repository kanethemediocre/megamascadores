//A lot of player keyboard controls are handled in system.playerkeys().
var keysdown = [["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"," ","w","a","s","d","q"],[false,false,false,false,false,false,false,false,false,false]]

window.addEventListener("keydown", function (event) {
	//the defaultprevented is not my code.  Someone thinks its a good idea.
	if (event.defaultPrevented) {
		return; // Do nothing if the event was already processed
	}
	
	
	var thekey = event.key;
	var i = 0;
	while(i<keysdown[0].length){
		if (keysdown[0][i]==thekey){
			//console.log("Key match found for "+keysdown[0][i]+" at "+i);
			if (keysdown[1][i]){console.log("error key is already pressed");}
			else {
				keysdown[1][i] = true;
				i = keysdown[0].length + 10;
				}
			}
		i++;
		}
	if (mode == 0){
		//console.log(event.key);
		if (event.key=="ArrowDown"){menustate[0]++;}
		else if (event.key=="ArrowUp"){menustate[0]--;}
		else if ((event.key=="Enter")||(event.key==" ")){
			//Menu does stuff here
			//console.log("tryin");
			if (menustate[0] == 0){
				//console.log("tryin");
				var thegrids = arcadegrids;
				if (gametype == 2){thegrids = geogrids}
				mode = gametype;
				level = 0;
				var i=0;
				while(i<thegrids.length){
					if (numplayers==2){	
						thegrids[i].players = [player1,player2]; 
						thegrids[i].respawnplayer(1);
						}
					else {thegrids[i].players = [player1]; }
					thegrids[i].respawnplayer(0);
					i++;
					}
				
				}
			else if (menustate[0] == 1){
				gametype = 1; //0 is reserved for the menu
				}	
			else if (menustate[0] == 2){
				gametype = 2;
				}
			else if (menustate[0] == 3){
				numplayers = 1;
				}
			else if (menustate[0] == 4){
				numplayers = 2;
				}		
			if (menustate[0] == 5){
				//sound
				}
			if (menustate[0] == 6){
				//sound
				}						
			}
		if (menustate[0]>=vkeys.length){
			menustate[0] = 0;
			}
		else if (menustate[0]<0){
			menustate[0] = vkeys.length - 1;
			}
		}
	else{	
	var currentlevel = worlds[level];
	if (mode==1){ var currentlevel = arcadegrids[level]; }
	if (mode==2){ currentlevel = geogrids[level]; }
	if (mode==3){ currentlevel = worlds[level]; }
	var p0 = currentlevel.players[0];//sketch that this applies to p0 in other worlds

	if (event.key=="ArrowDown"){
		if ((p0.movestate==0)&&(p0.munchstate==0)&&(p0.raketimer==0)&&(p0.nettimer==0)&&(p0.tool<3)){ p0.move(0,currentlevel); }
		}	
	else if (event.key=="ArrowRight"){
		if ((p0.movestate==0)&&(p0.munchstate==0)&&(p0.raketimer==0)&&(p0.nettimer==0)&&(p0.tool<3)){ p0.move(1,currentlevel); }
		}	  
	else if (event.key=="ArrowUp"){
		if ((p0.movestate==0)&&(p0.munchstate==0)&&(p0.raketimer==0)&&(p0.nettimer==0)&&(p0.tool<3)){ p0.move(2,currentlevel); }
		}
	else if (event.key=="ArrowLeft"){
		if ((p0.movestate==0)&&(p0.munchstate==0)&&(p0.raketimer==0)&&(p0.nettimer==0)&&(p0.tool<3)){ p0.move(3,currentlevel); }
		}
	else if (event.key=="Control"){
		if ((p0.movestate==0)&&(p0.munchstate==0)&&(p0.raketimer==0)&&(p0.nettimer==0)&&(p0.tool<3)){
			p0.raze(currentlevel.grid[p0.x][p0.y]); 
			allsounds[4].play();
			}
		}
	else if (event.key==" "){
		//compare grid answer to desired answer
		if ((p0.movestate==0)&&(p0.munchstate==0)){
			p0.munchstate = p0.munchspeed;
			}
		}
	else if (event.key=="Shift"){
		//compare grid answer to desired answer
		console.log("shift"+p0.tool);
		p0.tool++;
		if (p0.tool>3){p0.tool = 0;}
		var playerhastool = false;
		while(!playerhastool){
			if (p0.tool==0){playerhastool=true;}
			else if ((p0.tool==1)&&(p0.rake)){playerhastool=true;}
			else if ((p0.tool==2)&&(p0.net)){playerhastool=true;}
			else if ((p0.tool==3)&&(p0.rod)){playerhastool=true;}
			else {
				p0.tool++;
				if (p0.tool>3){p0.tool = 0;}
				}
			}
		}
	}
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

window.addEventListener("keyup", function (event) {
	var thekey = event.key;
	var i = 0;
	while(i<keysdown[0].length){
		if (keysdown[0][i]==thekey){
			//console.log("Key match found for "+keysdown[0][i]+" at "+i);
			if (keysdown[1][i]==false){console.log("error key is already unpressed");}
			else {
				keysdown[1][i] = false;
				i = keysdown[0].length + 10;
				}
			}
		i++;
		}
	})