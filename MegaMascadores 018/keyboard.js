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
		if (p0.movestate==0){ p0.move(0,currentlevel); }
		}	
	else if (event.key=="ArrowRight"){
		if (p0.movestate==0){ p0.move(1,currentlevel); }
		}	  
	else if (event.key=="ArrowUp"){
		if (p0.movestate==0){ p0.move(2,currentlevel); }
		}
	else if (event.key=="ArrowLeft"){
		if (p0.movestate==0){ p0.move(3,currentlevel); }
		}
	else if (event.key==" "){
		//compare grid answer to desired answer
		p0.munchstate = p0.munchspeed;
		//if (currentlevel.hf == currentlevel.grid[p0.x][p0.y].s){
		//	p0.score++;
		//	currentlevel.grid[p0.x][p0.y].s = "none";
		//	currentlevel.grid[p0.x][p0.y].q = "!!!";
		//	//Check if level is finished
		//	if (currentlevel.checktotal()==0){
		//		level++;
		//		//arcadegrids[level].players = [p0];
		//		}
			
		//	}
		//else{
		//	p0.score--;
		//	currentlevel.grid[p0.x][p0.y].s = "none";
		//	currentlevel.grid[p0.x][p0.y].q = "...";			
		//	}
		}		
	
	else if (event.key=="m"){
		mode = 1;
		console.log(mode);
		}
	else if (event.key=="g"){
		mode = 2;
		console.log(mode);
		}
	if (currentlevel.players.length>1){
		var p1 = currentlevel.players[1];
			
		if ((event.key=="s")||(event.key=="S")){
			p1.move(0,currentlevel);
			console.log("Itriedtogodown");
			}	
		else if ((event.key=="d")||(event.key=="D")){
			p1.move(1,currentlevel);
			}	  
		else if ((event.key=="w")||(event.key=="W")){
			p1.move(2,currentlevel);
			}
		else if ((event.key=="a")||(event.key=="A")){
			p1.move(3,currentlevel);
			}
		else if ((event.key=="q")||(event.key=="Q")){
			//compare grid answer to desired answer
			p1.munchstate = p1.munchspeed;
			if (currentlevel.hf == currentlevel.grid[p1.x][p1.y].s){
				p1.score++;
				currentlevel.grid[p1.x][p1.y].s = "none";
				currentlevel.grid[p1.x][p1.y].q = "!!!";
				//Check if level is finished
				if (currentlevel.checktotal()==0){
					level++;
					//arcadegrids[level].players = [p0];
					}
				
				}
			else{
				p1.score--;
				currentlevel.grid[p1.x][p1.y].s = "none";
				currentlevel.grid[p1.x][p1.y].q = "...";			
				}
			}		
		
		
		
		
		
		
		}
	else if (event.key=="q"){
		//compare grid answer to desired answer
		p0.munchstate = p0.munchspeed;
		if (currentlevel.hf == currentlevel.grid[p0.x][p0.y].s){
			p0.score++;
			currentlevel.grid[p0.x][p0.y].s = "none";
			currentlevel.grid[p0.x][p0.y].q = "!!!";
			//Check if level is finished
			if (currentlevel.checktotal()==0){
				level++;
				//arcadegrids[level].players = [p0];
				}
			
			}
		else{
			p0.score--;
			currentlevel.grid[p0.x][p0.y].s = "none";
			currentlevel.grid[p0.x][p0.y].q = "...";			
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