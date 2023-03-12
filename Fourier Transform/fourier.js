const USER = 0;
const FOURIER = 1;

let x = [];
let fourierX;
let t = 0;
let path = [];
let drawing = [];
let state = -1;
let dt;

function epicycles(init_x, init_y, rotation, fourier) {
	let x, y;
	for(let i = 0; i < fourier.length; i++) {
		
		let { freq, amp, phase } = fourier[i];
		// console.log({ freq, amp, phase });
		// let [ freq, amp, phase ] = [i, radius / i, 0];

		// calculating the coordinates for the epicyles
		x = init_x + amp * cos(freq * t + phase + rotation);
		y = init_y + amp * sin(freq * t + phase + rotation);

		noFill();
		stroke(175);
		strokeWeight(1);
		ellipse(init_x, init_y, amp * 2);
		stroke(150);
		line(init_x, init_y, x, y);
		circle(x, y, 2)

		// the point on the bigger cycle acts as the origin for another circle and so on
		init_x = x;
		init_y = y;
	}
	return createVector(x, y);
}

function mousePressed() {
	state = USER;
	drawing = [];
  x = [];
  t = 0;
  path = [];
}

function mouseReleased() {
	state = FOURIER;
  const skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
		x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
  dt = TWO_PI / x.length;
}

function setup() {
	createCanvas(800, 500);
	textSize(16);
}

function draw() {
	background(225);

	if (state == USER) {
    let point = createVector(mouseX - width / 2, mouseY - height / 2);
    drawing.push(point);
    stroke(100);
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();
  } else if(state == FOURIER) {
		let v = epicycles(width / 2, height / 2, 0, fourierX);

		path.unshift(v);
		stroke(100);
		beginShape();
		for(let i = 0; i < path.length; i++) {
			vertex(path[i].x, path[i].y);
		}
		endShape();

		t += dt;
  }
	
	fill(150);
	text('Draw On The Canvas!', 10, 30);	
}
