const backgroundCanvas = function () {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  //console.log(ctx);

  ctx.canvas.width = document.body.clientWidth;
  ctx.canvas.height = window.innerHeight;
  const amountOfCircles = 75;
  let circleArray;
  const colorArray = ["#1D2F6F", "#8390FA", "#FAC748"];

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
      const size = getRandomRange(5, 20) / 10;
      const directionX = getRandomRange(-20, 20) / 100;
      const directionY = getRandomRange(-20, 20) / 100;
      const color = colorArray[getRandomRange(0, 2)];
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

  //console.log(circleArray);
  init();
  //console.log(circleArray);
  animate();

  window.addEventListener("resize", function () {
    canvas.width = this.document.body.clientWidth;
    canvas.height = this.window.innerHeight;
    init();
  });
};
//helper
function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default backgroundCanvas;
