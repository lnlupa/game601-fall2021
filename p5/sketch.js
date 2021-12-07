let creature1;
let creature2;
let creature3;
let creature4;
let creature5;
let creature6;
let creature7;
let creature8;
let creature9;
let creature10;

function setup() {
	colorMode(HSB);
	rectMode(CENTER);
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	background(40, 70, 60);
	
	//create the 10 ants/creatures
	//order of creature variables: cX, cY, cXVel, cYVel, cSize, screenX, screenY
	creature1 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature2 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature3 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature4 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature5 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature6 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature7 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature8 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature9 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	creature10 = new Creature(random(10, width - 10), random(10, height - 10), random(1, 5), random(1, 5), random(75, 300), width, height);
	
}

function draw() {
	//redraw the background so the creatures are animated
	background(40, 80, 80);
	
	//create all ten creatures on the canvas
	creature1.drawCreature();
	creature2.drawCreature();
	creature3.drawCreature();
	creature4.drawCreature();
	creature5.drawCreature();
	creature6.drawCreature();
	creature7.drawCreature();
	creature8.drawCreature();
	creature9.drawCreature();
	creature10.drawCreature();
	
	//set the creatures moving
	creature1.moveCreature();
	creature2.moveCreature();
	creature3.moveCreature();
	creature4.moveCreature();
	creature5.moveCreature();
	creature6.moveCreature();
	creature7.moveCreature();
	creature8.moveCreature();
	creature9.moveCreature();
	creature10.moveCreature();
	
	//set some of the creatures to react when the mouse comes near them
	creature1.botherCreature();
	creature2.annoyCreature();
	creature4.botherCreature();
	creature5.annoyCreature();
	creature7.botherCreature();
	creature8.annoyCreature();
	
	//set all of the creatures to react when the user clicks
	creature1.scareCreature();
	creature2.scareCreature();
	creature3.scareCreature();
	creature4.scareCreature();
	creature5.scareCreature();
	creature6.scareCreature();
	creature7.scareCreature();
	creature8.scareCreature();
	creature9.scareCreature();
	creature10.scareCreature();
	
	//make sure that if any creature is pushed off the canvas, draw them back somewhere visible to the user
	creature1.redrawCreature();
	creature2.redrawCreature();
	creature3.redrawCreature();
	creature4.redrawCreature();
	creature5.redrawCreature();
	creature6.redrawCreature();
	creature7.redrawCreature();
	creature8.redrawCreature();
	creature9.redrawCreature();
	creature10.redrawCreature();
}

//create the Creature class
class Creature {
	constructor(cX, cY, cXVel, cYVel, cSize, screenX, screenY){
		//enter the x,y position of the creature
		this.x = cX;
		this.y = cY;
		//enter the size of the creature's body parts
		this.size = cSize;
		//generate random colors for the creature
		this.hue = random(0, 360);
		this.sat = random(0, 100);
		this.bri = random(0, 100);
		//enter the velocity of the creature along x and y
		this.xVel = cXVel;
		this.yVel = cYVel;
		//enter the size of the display
		this.screenX = screenX;
		this.screenY = screenY;
	}
	
	//function to draw the various body parts of the creature in relation to each other
	drawCreature(){
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
	}
	
	//function to move the creature regularly across the canvas
	//without it going outside the bounds of the canvas
	moveCreature(){
		this.x += this.xVel;
		this.y += this.yVel;
		
		if(this.x <= 0 || this.x >= this.screenX){
			this.xVel *= -1;
		}
		
		if(this.y <= 0 || this.y >= this.screenY){
			this.yVel *= -1;
		}
	}
	
	//function that causes the creature to react to the mouse
	botherCreature(){
		let cDist = dist(this.x, this.y, mouseX, mouseY);
		
		if(cDist <= this.size){
			this.x += 10;
			this.y -= 10;
		}
	}
	
	//second function that causes the creature to react to the mouse
	annoyCreature(){
		let cDist = dist(this.x, this.y, mouseX, mouseY);
		
		if(cDist <= this.size){
			this.x -= 10;
			this.y += 10;
		}
	}
	
	//function that changes the creature's x and y positions if they ever go too far off the screen
	redrawCreature(){
		if(this.x > this.screenX + 100 || this.y > this.screenY + 100){
			this.x = random(0, this.screenX);
			this.y = random(0, this.screenY);
		}
		if(this.x < -100 || this.y < -100){
			this.x = random(0, this.screenX);
			this.y = random(0, this.screenY);
		}
	}
	
	//function that causes the creature to react as if poked when the user clicks
	scareCreature(){
		if(mouseIsPressed){
			noStroke();
			fill(333, 34, 92);
			ellipse(mouseX, mouseY, 500);
			
			if(this.xVel > 0){
				this.x += 10;
			}
			else{
				this.x += -10;
			}
			
			if(this.yVel > 0){
				this.y += 10;
			}
			else{
				this.y += -10;
			}
			
		}
	}
}