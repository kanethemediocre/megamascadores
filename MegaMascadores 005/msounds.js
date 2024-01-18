//var blastersound1 = new Audio("./sounds/bubble4_short2.mp3");
//var blastersound1 = new Audio("./sounds/w11s1.mp3");
//var blastersound2 = new Audio("./sounds/close_door_12.mp3");


var allsounds = [  ];

var allmusic = [  ];
var musicvolume = 0;
var soundvolume = 1;
function setmusicvolume(newvolume){
	var i=0;
	while(i<allmusic.length){
		allmusic[i].volume = newvolume;
		i++;
		}
	}
setmusicvolume(musicvolume);
function setsoundvolume(newvolume){
	var i=0;
	while(i<allsounds.length){
		allsounds[i].volume = newvolume;
		i++;
		}
	}
setsoundvolume(soundvolume);
function pausemusic(){
	var i=0;
	while(i<allmusic.length){
		allmusic[i].pause();
		i++;
		}
	}
function musicshuffle(){
	var isplaying = false;
	var i=0;//First make sure music is not already playing
	while(i<allmusic.length){
		if (allmusic[i].paused == false){
			isplaying = true;
			}
		i++;
		}
	if (isplaying == false){
		var playnext = Math.floor(Math.random()*allmusic.length);
		allmusic[playnext].play();
		lastsong = playnext
		}
	}
function nextsong(){
	var wasplaying = false;
	var i=0;//First make sure music is not already playing
	while(i<allmusic.length){
		if (allmusic[i].paused == false){
			allmusic[i].paused == true;
			allmusic[i].currentTime = 0;
			i++;
			lastsong = i;
			if (lastsong>allmusic.length){lastsong = 0;}
			allmusic[lastsong].play();
			i=allmusic.length;
			wasplaying = true;
			}
		i++;
		}
	if (wasplaying == false){
		lastsong++;
		if (lastsong>allmusic.length){lastsong = 0;}
		allmusic[lastsong].play();
		}
	}