var tri;
var state; // "play" and "menu"
var randomPoint;
var h = 0;
var sqrtThree = Math.sqrt(3);

class Triangle {
	constructor() {
		this.points = new Array(3);
		this.radius = 5;
		this.side = 400;
		this.height = (sqrtThree / 2) * this.side;
	}

	setPoints() {
		this.points[0] = new p5.Vector(width * 0.5, 50);
		this.points[1] = new p5.Vector((width - this.side) * 0.5, 50 + this.height);
		this.points[2] = new p5.Vector((width + this.side) * 0.5, 50 + this.height);
	}

	drawPoints() {
		stroke(0, 0, 80);
		strokeWeight(2 * this.radius);
		for(let p of this.points) {
			point(p);
		}
	}
}

function nextPoint(currPoint, triPoint) {
	let newPoint = p5.Vector.add(currPoint, triPoint);
	return newPoint.mult(0.5);
}

function mouseDragged() {
	let r = tri.radius;
	for(let i in tri.points) {
		let p = tri.points[i];
		if(state === "menu" && mouseX >= p.x - r && mouseX <= p.x + r && mouseY >= p.y - r && mouseY <= p.y + r) {
			tri.points[i].x = mouseX;
			tri.points[i].y = mouseY;
			console.log(true);
		}
	}
}

function mousePressed() {
	if(state === "menu") {
		randomPoint = new p5.Vector(mouseX, mouseY);
	}
}

function setup() {
	createCanvas(500, 500);
	colorMode(HSB);
	background(0, 0, 20);
	stroke(255);
	strokeWeight(6);

	let startButton = createButton('START');
	startButton.mousePressed(() => state = 'play');
	startButton.parent('button-container');

	let pauseButton = createButton('PAUSE');
	pauseButton.mousePressed(() => state = 'menu');
	pauseButton.parent('button-container');

	tri = new Triangle();
	state = 'menu';
	randomPoint = new p5.Vector(width / 2, height / 2);
	tri.setPoints();
}

function draw() {
	if(state === "play") {
		strokeWeight(2);
		stroke(h, 50, 80);
		point(randomPoint);

		let r = floor(random(3));
		randomPoint = nextPoint(randomPoint, tri.points[r]);
		h = (h + 1) % 255;
	} else {
		background(0, 0, 20);
		strokeWeight(2);
		stroke(h, 50, 80);
		point(randomPoint);
	}

	tri.drawPoints();
}