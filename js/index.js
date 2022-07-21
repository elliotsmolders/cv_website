import backgroundCanvas from "./background.js";
backgroundCanvas();

//scrollto smooth
const offset = document.querySelector("#header-container").clientHeight;
console.log(offset);
document.querySelectorAll("a.nav").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top:
        document.querySelector(this.getAttribute("href")).offsetTop -
        offset -
        80,
      behavior: "smooth",
    });
  });
});
document.querySelector("#home").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
