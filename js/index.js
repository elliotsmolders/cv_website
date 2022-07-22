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
//add active class to nav li item on scroll
const arrOfSections = document.querySelectorAll("section");
window.addEventListener("scroll", checkScrollPosition);
//check scroll position

function checkScrollPosition() {
  const currentY = window.scrollY;
  arrOfSections.forEach((element) => {
    const sectionTop = element.offsetTop - 230;
    const sectionHeight = element.offsetHeight;
    if (currentY > sectionTop && currentY <= sectionTop + sectionHeight) {
      document
        .querySelector(`[data-section='${element.dataset.section}']`)
        .classList.add("active");
      console.log(element.dataset.section);
    } else {
      document
        .querySelector(`[data-section='${element.dataset.section}']`)
        .classList.remove("active");
    }
  });
}
