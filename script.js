import * as css from "./style.scss";

const dates = document.querySelectorAll(".date");
const buttons = document.querySelectorAll(".button");
const contents = document.querySelectorAll(".content");
const scrollLine = document.querySelector(".red-line");

const createObserver = (classname, { top = 0, bottom = 0 }) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(classname, entry.isIntersecting);
      });
    },
    { rootMargin: `${top}px 0px ${bottom}px 0px` }
  );

  return observer;
};

const dateObserver = createObserver("intersected-date", {
  bottom: -window.innerHeight / 2,
});
const buttonObserver = createObserver("intersected-button", {
  bottom: -window.innerHeight / 2,
});

const contentObserver = createObserver("intersected-content", {
  top: 10000,
  bottom: 100,
});

// date color change
dates.forEach((elem) => {
  dateObserver.observe(elem);
});

// central button color change
buttons.forEach((elem) => {
  buttonObserver.observe(elem);
});

// content transition
contents.forEach((elem) => {
  contentObserver.observe(elem);
});

//line
window.addEventListener("scroll", () => {
  scrollLine.style.height = `${
    window.innerHeight / 2 - scrollLine.getBoundingClientRect().top
  }px`;
});
