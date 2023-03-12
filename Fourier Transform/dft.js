class Complex {
	constructor(x = 0, y = 0) {
		this.re = x;
		this.im = y;
	}

	mult(c) {
		const re = this.re * c.re - this.im * c.im;
		const im = this.re * c.im + this.im * c.re;
		return new Complex(re, im);
	}

	add(c) {
		this.re += c.re;
		this.im += c.im;
	}

	mag() {
		return sqrt(this.re * this.re + this.im * this.im);
	}
}

function dft(x) {
	const N = x.length;
	let X = [];
	for(let k = 0; k < N; k++) {
		let sum = new Complex();
		for(let n = 0; n < N; n++) {
			const phi = (TWO_PI * k * n) / N;
			const c = new Complex(cos(phi), -sin(phi));
			sum.add(x[n].mult(c));
		}
		sum.re = sum.re / N;
		sum.im = sum.im / N;

		let freq = k;
		let amp = sum.mag()
		let phase = atan2(sum.im, sum.re);

		X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
	}
	return X;
}
