// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.widthMax = 464;
canvas.height = 480;
canvas.heightMax = 432;
document.body.appendChild(canvas);

//Array de piedras

var piedrasx = new Array(200);
var piedrasy = new Array(200);


//Array monstruos

var monstruosx = new Array(20);
var monstruosy = new Array(20);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

//stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

//monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var stone = {};
var monster = {
	speed: 50
};
var princessesCaught = 0;
var level = 0;
var putNewMonster = 0;
var partida = 0;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Pone a la princesa donde no hay piedras
	var putprinces = function(){
		princess.x = 48 + (Math.random() * ((canvas.widthMax-16) - 48 + 1));
		princess.y = 48 + (Math.random() * ((canvas.heightMax-16) - 48 + 1));
		for(var ii =0; ii<=princessesCaught; ii++){
			if((princess.x <= piedrasx[ii]+32) &&(princess.x >=piedrasx[ii]-32) &&(princess.y <=piedrasy[ii]+32)&&(princess.y >=piedrasy[ii]-32)){
				putprinces();
			}
		}
	}
//Pone una piedra donde no hay ninguna
	var putstone = function(){
		stone.x = 48 + (Math.random() * ((canvas.widthMax-16) - 48 + 1));
		stone.y = 48 + (Math.random() * ((canvas.heightMax-16) - 48 + 1));
		
		for(var ii =0; ii<=princessesCaught; ii++){
			if(((stone.x <= piedrasx[ii]+36) &&(stone.x >=piedrasx[ii]-36) &&(stone.y <=piedrasy[ii]+36)&&(stone.y >=piedrasy[ii]-36)) || ((stone.x <= (canvas.width / 2)+36) &&(stone.y >= (240)-36) && (stone.x >= (256)-36) &&(stone.y <= (240)+36)  )){
				putstone();
			}
		}
	}

//pone monstruo

var putmonster = function(){
	monster.x = 48 + (Math.random() * ((canvas.widthMax-16) - 48 + 1));
	monster.y = 48 + (Math.random() * ((canvas.heightMax-16) - 48 + 1));

}
// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	putprinces();

	//Stone
	putstone();
	//Monster
	putmonster();
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		
		for(var ii =0; ii<=princessesCaught+1; ii++){
			if (hero.x >= canvas.widthMax-16 || ((hero.x >=piedrasx[ii]-16)&&(hero.x <=piedrasx[ii]+16)&&(hero.y >=piedrasy[ii]-16)&&(hero.y <=piedrasy[ii]+16)))
			{
				hero.y += hero.speed * modifier;
			}	
		}
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		for(var ii =0; ii<=princessesCaught+1; ii++){
			if (hero.x >= canvas.widthMax-16 || ((hero.x >=piedrasx[ii]-16)&&(hero.x <=piedrasx[ii]+16)&&(hero.y >=piedrasy[ii]-16)&&(hero.y <=piedrasy[ii]+16)))
			{
				hero.y -= hero.speed * modifier;
			}	
		}
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		for(var ii =0; ii<=princessesCaught+1; ii++){
			if (hero.x >= canvas.widthMax-16 || ((hero.x >=piedrasx[ii]-16)&&(hero.x <=piedrasx[ii]+16)&&(hero.y >=piedrasy[ii]-16)&&(hero.y <=piedrasy[ii]+16)))
			{
				hero.x += hero.speed * modifier;
			}	
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		for(var ii =0; ii<=princessesCaught+1; ii++){
			if (hero.x >= canvas.widthMax-16 || ((hero.x >=piedrasx[ii]-16)&&(hero.x <=piedrasx[ii]+16)&&(hero.y >=piedrasy[ii]-16)&&(hero.y <=piedrasy[ii]+16)))
			{
				hero.x -= hero.speed * modifier;
			}	
		}
	}
	for(var m = 0; m<=level+1; m++){
		if(hero.x <= (monstruosx[m] + 16)
		&& monstruosx[m] <= (hero.x + 16)
		&& hero.y <= (monstruosy[m] + 16)
		&& monstruosy[m] <= (hero.y + 32)){
			reset();
		}
	}
//para que no se salga el heroe
		if (hero.x >= canvas.widthMax-16 )
		{
			hero.x -= hero.speed * modifier;
		}
	
		if (hero.x <= 32)
		{
			hero.x += hero.speed * modifier;
		}
		if (hero.y >= canvas.heightMax-16)
		{
			hero.y -= hero.speed * modifier;
		}
		if (hero.y <= 32)
		{
			hero.y += hero.speed * modifier;
		}
	


	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		
		++princessesCaught;
		++partida;
		if(partida >= 5){
			++level;
			putNewMonster = 1;
			partida = 0;
		}
		reset();
	}else{
		var direccion = Math.round(Math.random() *3);
		if (direccion == 0){
			var num = Math.round(Math.random() *level);
			monstruosx[num] += monster.speed * modifier;
			monstruosy[num] += monster.speed * modifier;
		
		}else{
			var num = Math.round(Math.random() *level);
			monstruosx[num] -= monster.speed * modifier;
			monstruosy[num] -= monster.speed * modifier;
		}
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady) {
		for (i=0;i<=princessesCaught;i++) { 
			ctx.drawImage(stoneImage, piedrasx[i], piedrasy[i]);
		}
		ctx.drawImage(stoneImage, stone.x, stone.y);
		piedrasx[princessesCaught+1] = stone.x;
		piedrasy[princessesCaught+1] = stone.y;
	}
	if (monsterReady) {
		for (i=0;i<=level+1;i++) { 
			ctx.drawImage(monsterImage, monstruosx[i], monstruosy[i]);
		}
		if(putNewMonster == 1){
			ctx.drawImage(monsterImage, monster.x, monster.y);
			monstruosx[level+1] = monster.x;
			monstruosy[level+1] = monster.y;		
			putNewMonster = 0;
		}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("level "+ level +" Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
