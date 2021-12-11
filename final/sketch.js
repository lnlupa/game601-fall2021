let monoSynth;
let oscillator;
let freq;
let amp;

let clouds = [];
let numCloud = 30;

let ants = [];
let numAnts = 100;

let time = 0;
let dur = 1/8;

let scene;

let sceneStage = 0;

function setup() {
	userStartAudio();
	colorMode(HSB);
	rectMode(CENTER);
	createCanvas(windowWidth, windowHeight);
	background(0,0,0);
	
	scene = new Scene();
	
	scene.initializeSceneArrays();
	
	for(i = 0; i < numCloud; i++){
		clouds[i] = new Cloud(scene.bigPlanet.rad);
	}
	
	for(i = 0; i < numAnts; i++){
			ants[i] = new Ant();
	}
	
	monoSynth = new p5.MonoSynth();
	oscillator = new p5.Oscillator('sine');
}

function keyPressed(){
	if(keyCode === 32){
		scene.rotateScene();
	}
}

function draw() {

	if (scene.oscOn === true) {
		oscillator.freq(freq, 0.1);
		oscillator.amp(amp, 0.1);
	}
	if(scene.oscOn === false){
		oscillator.stop();
	}
	
	scene.drawScene();
	sceneStage = scene.returnStage();
	
	if(sceneStage === 1){
		if(mouseX > width * 0.1 && mouseX < width * 0.9){
			monoSynth.play(scene.note, scene.vel, scene.time, scene.dur);
		}
	}
	if(sceneStage === 2){
		freq = constrain(map(mouseX, 0, width, 100, 500) , cos(300), 550);
		amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
		if(mouseIsPressed){
			if(scene.oscOn === true){
				oscillator.start();
			}
		}
	}
	if(sceneStage === 3){
		monoSynth.play(scene.note, scene.vel, scene.time, scene.dur);
		for(i = 0; i < clouds.length; i++){
			clouds[i].updateCloud();
		}
		scene.bigPlanet.drawSunLines();
	}
	if(sceneStage === 4){
		monoSynth.play(scene.note, scene.vel, scene.time, scene.dur);
		monoSynth.play(scene.note2, scene.vel, scene.time + random(2,3), scene.dur);
	}
	if(sceneStage === 5){
		ants[0].drawHill();
		for(i = 0; i < ants.length; i++){
			ants[i].drawAnt();
			if(ants[i].pos.x === ants[i].hVector.x && ants[i].pos.y === ants[i].hVector.y){
				monoSynth.play(random(['Bb4', 'D3']), random(0.1, 1), time + random(1,4), dur);
			}
		}
	}
	if(sceneStage === 6){
		freq = constrain(map(mouseX, 0, width, 100, 500), 100, 250);
  	amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
		if(scene.oscOn === true){
			oscillator.start();
		}
	}
	
	if(sceneStage === 0){
		scene.resetScene();
		for(i = 0; i < clouds.length; i++){
			clouds[i].resetCloud();
		}
		for(i = 0; i < ants.length; i++){
			ants[i].resetAnt();
		}
	}
}

class Scene{
	constructor(){
		this.stage = 0;
		
		this.oscOn = false;
		
		this.note = 'G4';
		this.note2 = 'C3';
		this.time = 0;
		this.dur = 0;
		this.vel = 0;
		
		this.stars = [];
		this.numStars = 400;
		this.bgStars = [];
		this.numBGStars = 200;
		
		this.planets = [];
		this.numPlanets = 50;

		this.sun = undefined;
		
		this.bpHue = 255;
		
		this.bigPlanet = undefined;
		
		this.meeples = [];
		this.numMeeps = 700;
		
		this.atoms = [];
		this.numAtoms = 100;
		this.lineX = random(10, width - 10);
		this.lineY = random(10, height - 10);
	}
	
	initializeSceneArrays(){
		
		for(let i = 0; i < this.numStars; i++){
			this.stars[i] = new Star();
		}
		for(let i = 0; i < this.numBGStars; i++){
			this.bgStars[i] = new Star();
		}
		
		for(let i = 0; i < this.numPlanets; i++){
			this.planets[i] = new Planet();
		}
	
		this.sun = new Sun();
		
		this.bigPlanet = new BigPlanet();
		
		for(let i = 0; i < this.numMeeps; i++){
			this.meeples[i] = new Meeple();
		}
		
		for(let i = 0; i < this.numAtoms; i++){
			this.atoms[i] = new Atom();
		}
	}
	
	drawScene(){
		
		if(this.stage === 0){
			background(0,0,0);
			this.oscOn = false;
		}
		
		if(this.stage === 1){
			background(0,0,0);
			for(let i = 0; i < this.stars.length; i++){
				this.stars[i].drawStar();
				let starDist = dist(mouseX, mouseY, this.stars[i].x, this.stars[i].y);
				if(starDist < 50){
					this.stars[i].changeColor();
				}
				this.note = random(['Fb4', 'G4']);
  			this.vel = mouseY * 0.001;
  			this.time = 0;
  			this.dur = 1/6;
			}
		}
		
		if(this.stage === 2){
			background(0,0,0);
			this.oscOn = true;
			for(let i = 0; i < this.bgStars.length; i++){
				this.bgStars[i].drawBackgroundStar();
			}
			this.sun.updateSun();
			for(let i = 0; i < this.planets.length; i++){
				this.planets[i].drawPlanet();
				this.planets[i].movePlanet();
				let planetDist = dist(mouseX, mouseY, this.planets[i].x, this.planets[i].y);
				if(mouseIsPressed){
					if(planetDist < 200){
						this.bpHue = this.planets[i].returnPHue();
					}
				}
			}
		}
		
		if(this.stage === 3){
			background(0,0,0);
			this.oscOn = false;
			for(let i = 0; i < this.bgStars.length; i++){
				this.bgStars[i].drawBackgroundStar();
			}
			this.bigPlanet.drawBigPlanet(this.bpHue);
			
			this.note = random(['Fb4', 'C3']);
  		this.vel = random(0.1, 1);
  		this.time = 0;
  		this.dur = 1;
		}
		
		if(this.stage === 4){
			background(this.bpHue,100,100);
			this.oscOn = false;
			for(let i = 0; i < this.meeples.length; i++){
				this.meeples[i].updateMeeple();
			}
			
			this.vel = random(0.1, 1);
			this.time = 0;
			this.dur = 1/8;
			this.note = 'Ab4';
			this.note2 = 'C3';
		}
		
		if(this.stage === 5){
			background(this.bpHue,100,100);
			this.oscOn = false;
		}
		
		if(this.stage === 6){
			background(0,0,0);
			this.oscOn = true;
			for(let i = 0; i < this.atoms.length; i++){
				this.atoms[i].drawAtom(this.lineX, this.lineY);
				this.lineX = this.atoms[i].returnLineX();
				this.lineY = this.atoms[i].returnLineY();
			}
		}
	}
	
	rotateScene(){
		if(this.stage < 7){
			this.stage += 1;
		}
		if(this.stage >= 7){
			this.stage = 0;
		}
	}
	
	resetScene(){
		for(let i = 0; i < this.stars.length; i++){
			this.stars[i].resetStars();
		}
		for(let i = 0; i < this.bgStars.length; i++){
			this.bgStars[i].resetStars();
		}
		
		for(let i = 0; i < this.planets.length; i++){
			this.planets[i].resetPlanets();
		}
		
		this.bigPlanet.resetBigPlanet();
		
		for(let i = 0; i < this.meeples.length; i++){
			this.meeples[i].resetMeeple();
		}
		
		for(let i = 0; i <this.atoms.length; i++){
			this.atoms[i].resetAtom();
		}
		
	}
	
	returnStage(){
		return this.stage;
	}
}

class Star{
	constructor(){
		this.x = random(10, width - 10);
		this.y = random(10, height - 10);
	}
	
	drawStar(){
		noStroke();
		fill(0, 0, 100);
		rect(this.x, this.y, random(3,5), random(3,5));
	}
	
	drawBackgroundStar(){
		noStroke();
		fill(0, 0, 100);
		rect(this.x, this.y, random(1,2), random(1,2));
	}
	
	changeColor(){
		noStroke();
		fill(207, 100, 100);
		rect(this.x, this.y, random(5, 10), random(5, 10));
	}
	
	resetStars(){
		this.x = random(10, width - 10);
		this.y = random(10, height - 10);
	}
}

class Planet{
	constructor(){
		this.theta = 0;
		this.amplitude = 5;
		this.x = random(width/2 - random(200, 500), width/2 + random(200, 500));
		this.y = random(height/2 - random(100, 600), height/2 + random(100, 600));
		this.rad = random(20, 40);
		this.hue = random(0, 360);
	}
	
	drawPlanet(){
		noStroke();
		fill(this.hue, 75, 75);
		ellipse(this.x, this.y, this.rad);
	}
	
	movePlanet(){
		this.theta += random(0.001, 0.05);
		this.x = this.x + cos(this.theta) * this.amplitude;
		this.y = this.y + sin(this.theta) * this.amplitude;
	}
	
	returnPHue(){
		return this.hue;
	}
	
	resetPlanets(){
		this.x = random(width/2 - random(200, 500), width/2 + random(200, 500));
		this.y = random(height/2 - random(100, 600), height/2 + random(100, 600));
		this.rad = random(20, 40);
		this.hue = random(0, 360);
	}
}

class Sun{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.rad = 500;
		this.hue = 25;
		this.numLines = 50;
		this.weight = 2;
	}
	
	updateSun(){
		noStroke();
		fill(this.hue, 100, 100);
		ellipse(this.x, this.y, this.rad);
		strokeWeight(this.weight);
		stroke(this.hue, 75, 100);
		for(let i = 0; i < this.numLines; i++){
			line(this.x, this.y, random(10, width - 10), random(10, height - 10));
		}
		this.hue += 1;
		if(this.hue > 60){
			this.hue = 25;
		}
	}
}

class BigPlanet{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.rad = random(400, 600);
		this.sunHue = 25;
		this.numLines = 50;
		this.weight = 3;
	}
	
	drawBigPlanet(bPHue){
		noStroke();
		fill(bPHue, 75, 75);
		ellipse(this.x, this.y, this.rad);
	}
	
	drawSunLines(){
		strokeWeight(this.weight);
		stroke(this.sunHue, 75, 100);
		for(let i = 0; i < this.numLines; i++){
			line(0, random(0, height), mouseX, mouseY);
		}
		this.sunHue += 1;
		if(this.sunHue > 60){
			this.sunHue = 25;
		}
	}
	
	resetBigPlanet(){
		this.rad = random(400, 600);
	}
}

class Cloud{
	constructor(pRad){
		this.x = random(width/2 - pRad/2, width/2 + pRad/2);
		this.y = random(height/2 - pRad/2, height/2 + pRad/2);
		this.w = random(50, 75);
		this.h = random(50, 75);
		this.pRad = pRad;
		this.hue = random(180, 250);
		this.velX = 1;
		this.velY = 1;
		this.offset = 10;
		
		this.pos = createVector(this.x, this.y);
		this.dir = createVector(0,0);
		this.targPos = undefined;
		this.speed = 1.5;
	}
	
	updateCloud(){
		if(mouseIsPressed){
			this.targPos = createVector(mouseX, mouseY);
		}
		if(this.targPos !== undefined){
			this.dir.x = this.targPos.x - this.pos.x;
			this.dir.y = this.targPos.y - this.pos.y;
			
			this.dir.normalize();
			this.dir.mult(this.speed);
		}
		
		this.pos.add(this.dir);
		
		if(this.targPos !== undefined){
			//print(this.targPos.x);
			let distance = dist(this.pos.x, this.pos.y, this.targPos.x, this.targPos.y);
			if(distance < this.speed + 1){
				//print("this happened");
				this.targPos.x = width/2 + random(-this.pRad/2, this.pRad/2);
				this.targPos.y = height/2 + random(-this.pRad/2, this.pRad/2);
			}
		}
		
		
		noStroke();
		fill(this.hue, 100, 100);
		ellipse(this.pos.x, this.pos.y, this.w, this.h);
		ellipse(this.pos.x - this.offset, this.pos.y + this.offset, this.w, this.h);
		ellipse(this.pos.x + this.offset, this.pos.y + this.offset, this.w, this.h);
	}
	
	resetCloud(){
		this.x = random(width/2 - this.pRad/2, width/2 + this.pRad/2);
		this.y = random(height/2 - this.pRad/2, height/2 + this.pRad/2);
		this.w = random(50, 75);
		this.h = random(50, 75);
		this.pRad = this.pRad;
		this.hue = random(180, 250);
		this.velX = 1;
		this.velY = 1;
		this.offset = 10;
		
		this.pos = createVector(this.x, this.y);
		this.dir = createVector(0,0);
		this.targPos = undefined;
		this.speed = 5;
	}
}

class Meeple{
	constructor(){
		this.x = random(10, width - 10);
		this.y = random(10, height - 10);
		this.velX = 2;
		this.w = 25;
		this.h = 60;
		this.hue = random(200, 250);
		this.eHue = random(0,360);
	}
	
	updateMeeple(){
		strokeWeight(2);
		stroke(0, 0, 100);
		fill(this.hue, 25, 25);
		rect(this.x, this.y, this.w, this.h);
		fill(this.eHue, 50, 50);
		noStroke();
		ellipse(this.x + this.w/2 - 3, this.y - this.w/2, 5);
		
		this.x += this.velX;
		
		if(this.x < 0 || this.x > width){
			this.x  = 1;
		}
	}
	
	resetMeeple(){
		this.x = random(10, width - 10);
		this.y = random(10, height - 10);
		this.hue = random(200, 250);
		this.eHue = random(0,360);
	}
}

class Ant{
	constructor(){
		this.x = width/random(2,10);
		this.y = height/random(2,10);
		this.size = random(25, 75);
		this.hue = random(0, 360);
		this.sat = random(25, 75);
		this.bri = random(40, 100);
		this.velX = random(0, 2);
		this.velY = random(0, 2);
		this.hillX = width/3;
		this.hillY = height/3;
		this.hillS = 75;
		
		this.pos = createVector(this.x, this.y);
		this.dir = createVector(0,0);
		this.targPos = createVector(random(-100, width + 100), random(-100, height + 100));
		this.speed = 2.5;
		
		this.hVector = createVector(this.hillX, this.hillY);
	}
	
	drawHill(){
		noStroke();
		fill(0,0,0);
		ellipse(this.hVector.x, this.hVector.y, this.hillS);
	}
	
	drawAnt(){
		noStroke();
		fill(this.hue, this.sat, this.bri);
		ellipse(this.pos.x, this.pos.y, this.size/3);
		ellipse(this.pos.x, this.pos.y + this.size/4, this.size/3);
		ellipse(this.pos.x, this.pos.y - this.size/4, this.size/3);
		
		rect(this.pos.x + this.size/10, this.pos.y, this.size/3, this.size/15);
		rect(this.pos.x + this.size/10, this.pos.y + this.size/10, this.size/3, this.size/15);
		rect(this.pos.x + this.size/10, this.pos.y - this.size/10, this.size/3, this.size/15);
		
		rect(this.pos.x - this.size/10, this.pos.y, this.size/3, this.size/15);
		rect(this.pos.x - this.size/10, this.pos.y + this.size/10, this.size/3, this.size/15);
		rect(this.pos.x - this.size/10, this.pos.y - this.size/10, this.size/3, this.size/15);
		
		rect(this.pos.x + this.size/10, this.pos.y + this.size/3, this.size/15, this.size/3);
		rect(this.pos.x - this.size/10, this.pos.y + this.size/3, this.size/15, this.size/3);
		
		fill(0, 0, 0);
		ellipse(this.pos.x + this.size/12, this.pos.y + this.size/4, this.size/20);
		ellipse(this.pos.x - this.size/12, this.pos.y + this.size/4, this.size/20);
		
		this.dir.x = this.targPos.x - this.pos.x;
		this.dir.y = this.targPos.y - this.pos.y;
			
		this.dir.normalize();
		this.dir.mult(this.speed);
		
		this.pos.add(this.dir);
		
		if(this.targPos !== undefined){
			let distance = dist(this.pos.x, this.pos.y, this.targPos.x, this.targPos.y);
			if(distance < this.speed + 1){
				//print("this happened");
				this.targPos.x = random(-100, width + 100);
				this.targPos.y = random(-100, height + 100);
			}
		}
		
		if(this.pos.x < 0 || this.pos.x > width){
			this.pos.x = this.hVector.x;
			this.pos.y = this.hVector.y;
		}
		
		if(this.pos.y < 0 || this.pos.y > height){
			this.pos.x = this.hVector.x;
			this.pos.y = this.hVector.y;
		}
	}
	
	resetAnt(){
		this.x = width/random(2,10);
		this.y = height/random(2,10);
		this.size = random(25, 75);
		this.hue = random(0, 360);
		this.sat = random(25, 75);
		this.bri = random(40, 100);
		this.velX = random(0, 2);
		this.velY = random(0, 2);
		this.hillX = width/3;
		this.hillY = width/3;
		this.hillS = 75;
	}
}

class Atom{
	constructor(){
		this.coreX = random(0, width);
		this.coreY = random(0, height);
		this.rad = random(50, 100);
		this.nucRad = random(-this.rad, this.rad);
		this.weight = 5;
		this.hue = random(0, 360);
		this.nucHue = random(0, 360);
		this.velX = random(-1, 1);
		this.noiseX = 0.05;
		this.tick = 0;
	}
	
	drawAtom(inputX, inputY){
		this.tick += 1;
		if(this.tick % 3 === 0){
			this.nucRad = random(-this.rad, this.rad);
		}
		if(this.tick > 15){
			this.tick = 0;
		}
		
		this.noiseX += 0.01;
		this.nucHue = this.nucHue + noise(this.noiseX);
		
		noStroke();
		fill(this.hue, 75, 75);
		ellipse(this.coreX, this.coreY, this.rad);
		
		fill(this.nucHue, 75, 75);
		ellipse(this.coreX, this.coreY, this.nucRad);
		
		stroke(this.hue, 75, 75);
		strokeWeight(this.weight);
		line(this.coreX, this.coreY, inputX, inputY);
		
		this.coreX += this.velX;
		if(this.coreX < 20 || this.coreX > width - 50){
			this.velX *= -1;
		}
		
		if(this.noiseX > 1){
			this.noiseX *= -1;
		}
	}
	
	returnLineX(){
		return this.coreX;
	}
	
	returnLineY(){
		return this.coreY;
	}
	
	resetAtom(){
		this.coreX = random(0, width);
		this.coreY = random(0, height);
		this.rad = random(50, 100);
		this.hue = random(0, 360);
		this.nucHue = random(0, 360);
		this.velX = random(-1, 1);
	}
}