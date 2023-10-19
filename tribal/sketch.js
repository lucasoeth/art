let xoff = 0;
let yoff = 0;

let res = 0.0025;

let max_rad = 12;
let stroke_val = 2;

let cell_size = max_rad + stroke_val;

// between 0 and 1
let alpha = 0.7;

let alpha_hex = Math.floor(alpha * 255).toString(16);
// let alpha_hex = 'ff';

// let colors = ['#E6C229', '#D11149', '#1A8FE3']
// let colors = ['#8661C1', '#E83151']
let colors = ['#090446', '#698F3F']

colors = colors.map((color) => { return color + alpha_hex });

let constant_perlin_offsets = colors.map(() => { return Math.floor(Math.random()*100000)});
let dynamic_perlin_offsets = colors.map(() => { return [0, 0]});
let offsets;
let directions;

function setup() {
  createCanvas(windowWidth, windowHeight);

  directions = colors.map(() => { 
    let angle = TWO_PI*Math.random();
    return [Math.cos(angle), Math.sin(angle)];
  });

  offsets = colors.map(() => { return random([[0,0], [cell_size/2, cell_size/2]])});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);


  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    let cpo = constant_perlin_offsets[i];
    let [poffx, poffy] = dynamic_perlin_offsets[i];
    let [offx, offy] = offsets[i];

    for (let x = 0; x < width; x += cell_size) {
      for (let y = 0; y < height; y += cell_size) {
        // Calculate the noise value at this point
        noiseDetail(2, 0.75);
        let noiseVal = noise((x+poffx)*res, (y+poffy)*res, cpo);
        // Map the noise value to a size for the ellipse
        let size = map(noiseVal, 0.2, 0.8, 0, max_rad);
        
        ball(x+offx, y+offy, size, stroke_val, color);
      }
    }


    let [dx, dy] = directions[i];
    let c = 5;
    dynamic_perlin_offsets[i] = [poffx + c*dx, poffy + c*dy];
  }
}

const ball = (x, y, rad, w, color) => {
  noFill();
  // stroke(...color);
  stroke(color);
  strokeWeight(w);
  circle(x, y, rad);
}