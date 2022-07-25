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

//adds active-section to all elements with data-section-[this section]
function checkScrollPosition() {
  const currentY = window.scrollY;
  arrOfSections.forEach((element) => {
    const sectionTop = element.offsetTop - 230;
    const sectionHeight = element.offsetHeight;
    const arrOfCurrentSection = [
      ...document.querySelectorAll(
        `[data-section='${element.dataset.section}']`
      ),
    ];
    if (currentY > sectionTop && currentY <= sectionTop + sectionHeight) {
      arrOfCurrentSection.forEach((element) =>
        element.classList.add("active-section")
      );
    } else {
      arrOfCurrentSection.forEach((element) =>
        element.classList.remove("active-section")
      );
    }
  });
}

//mobile menu button
document
  .querySelector("#mobile-menu-icon")
  .addEventListener("click", handleMobileIconClick);

function handleMobileIconClick(event) {
  console.log("menu icon clicked");
  event.preventDefault();
  scrollToActive();
  toggleMenu();
  toggleLock();
}
//scrolls to top of current section
function scrollToActive() {
  window.scrollTo({
    top:
      document.querySelector("section.active-section").offsetTop -
      document.querySelector("#header-container").clientHeight -
      80,
    behavior: "smooth",
  });
}
//function that toggles menu by adding/Removing open and visible class
function toggleMenu() {
  const navMenu = document.querySelector("ul.navigation");
  if (navMenu.classList.contains("open")) {
    navMenu.classList.remove("visible");
    navMenu.addEventListener(
      "webkitTransitionEnd",
      () => {
        console.log("removed");
        navMenu.classList.remove("open");
      },
      { once: true }
    );
  } else {
    navMenu.classList.add("open");
    setTimeout(function () {
      navMenu.classList.add("visible");
    }, 1);
  }
}
function toggleLock() {
  const body = document.querySelector("body");
  if (body.classList.contains("locked")) {
    document.querySelector("body").classList.remove("locked");
  } else {
    document.querySelector("body").classList.add("locked");
  }
}
//close menu when link is clicked
document.querySelectorAll("a.nav").forEach((element) =>
  element.addEventListener("click", () => {
    toggleMenu();
  })
);
