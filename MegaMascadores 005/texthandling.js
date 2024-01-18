		function fillwrappedtextold(text,textlength,textheight,x,y){ //textlength in characters, textheight in pixels 
			var line = 0;
			var alreadydisplayedchars = 0;
			var thechar = "";
			var thelength = 0;
			var i = textlength-1;
			while (i>0){
				thechar = text[i]
				if (thechar == " "){
					thelength = i;
					line = line + 1;
					i = -2;
					}
				i=i-1;
				}
			context.fillText(text.slice(0,thelength),x,(y + line*textheight));	
			line = line + 1;
			context.fillText(text.slice(thelength+1, thelength+textlength),x,(y + line*textheight));
			}
		
		function fillwrappedtext(text,textlength,textheight,x,y){ //textlength in characters, textheight in pixels 
			var line = 0;
			var alreadydisplayedchars = 0;
			var thechar = "";
			var thelength = 0;
			var i = textlength-1;
			while (alreadydisplayedchars+textlength<text.length){
				var thelength = 0;
				var i = alreadydisplayedchars+textlength-1;
				while (i>0){
					thechar = text[i]
					if (thechar == " "){
						thelength = i;
						i = -2;
						}
					i=i-1;
					}
				context.fillText(text.slice(alreadydisplayedchars,thelength),x,(y + line*textheight));	
				line = line + 1;
				alreadydisplayedchars = thelength+1;
				}
			context.fillText(text.slice(alreadydisplayedchars, alreadydisplayedchars+textlength),x,(y + line*textheight));
			}
		
		function showchart(chartdataxy, xspace, yspace, x,y){ //displays chart with specified cell dimensions and position
			 var i = 0 //assumes each column is same length, otherwise error
			 var j = 0;
			 while (i<chartdataxy.length){
				var cellposx = x+i*xspace;
				j = 0;
				while (j<chartdataxy[0].length){
					var cellposy = y+j*yspace;
					context.fillText(chartdataxy[i][j],cellposx,cellposy);
					j=j+1;
					}
				i=i+1;
				}
			 }
		function showchartabbrev(chartdataxy, xspace, yspace, x,y,maxlength){ //displays chart with specified cell dimensions and position
			 var i = 0 //assumes each column is same length, otherwise error
			 var j = 0;
			 while (i<chartdataxy.length){
				var cellposx = x+i*xspace;
				j = 0;
				while (j<chartdataxy[0].length){
					var cellposy = y+j*yspace;
					context.fillText(chartdataxy[i][j].slice(0,maxlength),cellposx,cellposy);
					j=j+1;
					}
				i=i+1;
				}
			 }
		function showmessage(message){ //Displays a message, breaking it up into multiple lines as needed.  No word continuity or overflow handling yet.
			var maxlength = (canvas.width-820)/11; //estimating font width to 10 px, allotting 150 px margins
			var maxlines = canvas.height/(24*6); //estimating font height to 24 px, allotting 1/6 of screen, only used for overflow handling (eventually)
			var starty = Math.floor(canvas.height*5/6 - 24); //allotting bottom 1/6 of screen + 24 px fudge factor
			var startx = 408;
			var lines = 1 + Math.floor(message.length/maxlength);
			context.font='16px Courier New';
			context.fillStyle = "white";  
			var line = 0;
			while (line<(lines)){//while there are still lines of text to draw...
				context.fillText(message.slice(line*maxlength, (line+1)*(maxlength)),startx,(starty + line*24));
				line = line + 1;
				}//slice(startofline,endofline,startx,startyofline)
			}
		function targetchart(targets,xspace,yspace,x,y){
			context.font='12px Courier New';
			var sorttargets = [];//No sorting yet
			var i = 0 //assumes each column is same length, otherwise error
			while(i<targets.length){
				var cellposx = x;
				var cellposy = y+i*yspace;
				context.fillStyle = targets[i][0].c
				context.fillText(targets[i][0].name,cellposx,cellposy);
				var cellposx = x+xspace;
				context.fillText(targets[i][1],cellposx,cellposy);
				i=i+1;
				}
			context.fillStyle = "white";  
			}
		function randvowel(){
			var vowels = "aeyuio";
			var vindex = Math.floor(Math.random()*vowels.length);
			return vowels[vindex];
			}
		function randconsonant(){
			var consonants = "zxcvbnmsdfghjklqwrtyp";
			var cindex = Math.floor(Math.random()*consonants.length);
			return consonants[cindex];
			}
		function randname(namelength){//Creates a random name of length namelength, with no more than 2 vowels or consonants in a row
			var lastchartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
			var lastchartype2 = Math.floor(Math.random()*2); //2nd to last....
			var thischartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
			var thename = ""; //Start with an empty name
			if (lastchartype2 == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
			if (lastchartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
			var i = namelength;
			while (i>2){
				i=i-1;
				if (lastchartype == lastchartype2){ //if last two characters are same type,
					if (lastchartype == 0){thischartype = 1;}else{thischartype = 0;} //make other type
					}else {thischartype = Math.floor(Math.random()*2);}//otherwise pick randomly
				if (thischartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
				lastchartype2 = lastchartype; //Keep track of last two characters
				lastchartype = thischartype; //so we can not have 3 vowels or 3 consonants sequentially
				}
			return thename;
			}
		var testname = randname(8);		
		class Radio {
		constructor(intromessage){
			this.msgstart = 0; //Time that current message began
			this.sender = ""; //Who sent the message
			this.senderx = 420;//Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);//not used?
			this.sendery = Math.floor(canvas.height*5/6 - 50);
			this.msgnow = intromessage; //Text of message
			this.msgtime = Math.floor(this.msgnow.length*1.5) + 120; //message duration
			this.log = [];
			}
		newmsg(sndr, msg, thetime){//used to put a new message into the object
			this.msgstart = thetime;
			this.sender = sndr;
			this.senderx = Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);
			this.msgnow = msg;
			this.msgtime = Math.floor(this.msgnow.length*1.5) + 240;
			this.log.push(this.msgnow);
			}
		display(thetime){
			if (thetime<(this.msgstart+this.msgtime)){			
				context.font='16px Courier New';
				context.fillStyle = "red";  
				context.fillText(this.sender+":",this.senderx,this.sendery);
				//function fillwrappedtext(text,textlength,textheight,x,y){
				var starty = Math.floor(canvas.height*5/6 - 24); //allotting bottom 1/6 of screen + 24 px fudge factor
				var startx = 412;
				context.fillStyle = "white";
				fillwrappedtext(this.msgnow.slice(0, (thetime-this.msgstart)*1 ),100,20,startx,starty,);
				}
			}
		showlog(index,xpos,ypos){
			context.font = "24px Verdana";
			context.fillText("Journal",xpos,ypos-24);
			context.font = "16px Verdana";
			context.fillText("("+this.log.length+" entries)",xpos+128,ypos-24);
			//fillwrappedtext(this.log[index],76,20,xpos,ypos+300);
			if (this.log.length>0){
			fillwrappedtext(this.log[index],76,20,xpos,ypos+300);
			var logchart = [ this.log  ];
				var chartstart = 0;
				var chartend = this.log.length-1;
				if (this.log.length>8){
					chartstart = index - 4;
					chartend = index + 4;
					if (chartend < 8){chartend = 8;}
					if (chartstart<0){chartstart=0;}
					if (chartend>this.log.length-1){chartend=this.log.length-1;}
					}
				var logchart = [ this.log.slice(chartstart,chartend+1) ];
				//if (index>4){showchartabbrev(logchart, 64, 16, xpos,ypos, 80);}
				//else {showchartabbrev(logchart, 64, 16, xpos,ypos+, 80);}
				context.font = "12px Verdana";
				showchartabbrev(logchart, 64, 16, xpos+16,ypos, 80);
				//fillwrappedtext(this.log[index],100,16,xpos,ypos+300);
				if ((this.log.length<8)||(index < 4)){
					context.beginPath();
					context.rect(xpos,ypos-12+index*16,600,18);
					context.stroke();
					//context.fillText('X',xpos,ypos+index*16);
				}else{
					context.beginPath();
					context.rect(xpos,ypos+4*16-12,600,18);
					context.stroke();
					//context.fillText('X',xpos,ypos+4*16);
					}
				}
			context.beginPath();
			context.rect(xpos-4,ypos-48,640,500);
			context.rect(xpos-4,ypos-16,640,300);
			context.stroke();
			
			
			}
		}////end class radio