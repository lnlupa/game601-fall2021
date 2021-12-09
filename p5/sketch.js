let ants = [];

let numAnts = 30;

function setup() {
	colorMode(HSB);
	rectMode(CENTER);
	createCanvas(windowWidth, windowHeight);
	background(0,0,0);
	
	for(let i = 0; i < numAnts; i++){
		ants[i] = new Ant(i, numAnts, width, height);
	}
}

function draw() {
	background(0,0,0);
	
	for(let i = 0; i < numAnts; i++){
		ants[i].drawAnt();
	}
}

class Ant{
	constructor(iAnt, arrayLen, screenX, screenY){
		this.x = screenX/2;
		this.y = screenY/2;
		this.size = iAnt + 50;
		this.hue = random(0, 360);
		this.sat = random(25, 75);
		this.bri = random(40, 100);
		this.xVel = 1 - (iAnt - (arrayLen/10));
		this.yVel = 1 - (iAnt - (arrayLen/10));
		this.screenX = screenX;
		this.screenY = screenY;
	}
	
	drawAnt(){
		noStroke();
		fill(this.hue, this.sat, this.bri);
		ellipse(this.x, this.y, this.size/3);
		ellipse(this.x, this.y + this.size/4, this.size/3);
		ellipse(this.x, this.y - this.size/4, this.size/3);
		
		rect(this.x + this.size/10, this.y, this.size/3, this.size/15);
		rect(this.x + this.size/10, this.y + this.size/10, this.size/3, this.size/15);
		rect(this.x + this.size/10, this.y - this.size/10, this.size/3, this.size/15);
		
		rect(this.x - this.size/10, this.y, this.size/3, this.size/15);
		rect(this.x - this.size/10, this.y + this.size/10, this.size/3, this.size/15);
		rect(this.x - this.size/10, this.y - this.size/10, this.size/3, this.size/15);
		
		rect(this.x + this.size/10, this.y + this.size/3, this.size/15, this.size/3);
		rect(this.x - this.size/10, this.y + this.size/3, this.size/15, this.size/3);
		
		fill(0, 0, 0);
		ellipse(this.x + this.size/12, this.y + this.size/4, this.size/20);
		ellipse(this.x - this.size/12, this.y + this.size/4, this.size/20);
		
		this.x += this.xVel;
		this.y += this.yVel;
		
		if(this.x <= 0 || this.x >= this.screenX){
			this.xVel *= -1;
		}
		
		if(this.y <= 0 || this.y >= this.screenY){
			this.yVel *= -1;
		}
	}
}