const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

//console.log(canvas);
//console.log(ctx);

ctx.canvas.width = document.body.scrollWidth;
ctx.canvas.height = window.innerHeight * 0.9;
const amountOfCircles = 75;
let circleArray;
const colorArray = ["darkblue", "blue", "blue", "darkblue", "darkred", "red"];

//constructor
function Circle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}
console.log(canvas);
console.log(ctx);

//methods

Circle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

//reverses circle direction when out of bounds, redraws circle
Circle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
};

//fill circle array
function init() {
  circleArray = [];
  for (let index = 0; index < amountOfCircles; index++) {
    const x = getRandomRange(0, canvas.width);
    const y = getRandomRange(0, canvas.height);
    const size = 1.5;
    const directionX = getRandomRange(-20, 20) / 100;
    const directionY = getRandomRange(-20, 20) / 100;
    const color = colorArray[getRandomRange(0, 4)];
    circleArray.push(new Circle(x, y, directionX, directionY, size, color));
  }
}

//animate the circles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].update();
  }
}

//helper
function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//console.log(circleArray);
init();
//console.log(circleArray);
animate();

window.addEventListener("resize", function () {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
  init();
});
