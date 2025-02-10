import { BandSiteApi } from "./band-site-api.js";

const API_KEY = "007c2e1f3-da04-4e9c-8536-0c8614581212";
let bandSiteApi = new BandSiteApi(API_KEY);

let showEl = document.querySelector(".shows__listing");

let shows = await bandSiteApi.getShows();
populateShows();

function populateShows() {
  createTitles();
  // for each object in the array shows
  for (const showObj of shows) {
    //creating a div that will contain a single row
    let show = document.createElement("div");
    show.classList.add("shows__show");

    show.append(createElement("p", "shows__title", "DATE"));
    let el = createElement(
      "p",
      "shows__data",
      new Date(showObj.date).toDateString()
    );
    el.classList.add("shows__data--bold");
    show.append(el);
    show.append(createElement("p", "shows__title", "VENUE"));
    show.append(createElement("p", "shows__data", showObj.place));
    show.append(createElement("p", "shows__title", "LOCATION"));
    show.append(createElement("p", "shows__data", showObj.location));
    show.append(createElement("button", "shows__submit", "BUY TICKETS"));

    showEl.append(show);
  }
}

//Setting up the event listener for the click effect
showEl.addEventListener("click", (e) => {
  // get the closest .list__item, even if a child of it is clicked...
  const el = e.target.closest(".shows__show");

  // ... if none return, don't do anything else
  if (!el) {
    return;
  }

  const activeClass = "shows__show--active";
  const active = showEl.querySelector(`.${activeClass}`);

  if (active) {
    active.classList.remove(activeClass);
  }
  // ...add the 'list-item--active' class to the clicked on  element
  el.classList.add(activeClass);
});

//titles for the tablet and desktop screen
function createTitles() {
  //creating a div that will contain a title row
  let show = document.createElement("div");
  show.classList.add("shows__special");

  show.append(createElement("p", "shows__title-visible", "DATE"));
  show.append(createElement("p", "shows__title-visible", "VENUE"));
  show.append(createElement("p", "shows__title-visible", "LOCATION"));
  let el = createElement("p", "shows__submit--invisible", "invisible");
  el.classList.add("shows__submit");
  show.append(el);

  showEl.append(show);
}

/**
 *
 * @param {*} elementType type of element to be created
 * @param {*} className the class name for the element
 * @param {*} textContent the content for element
 * @returns
 */
function createElement(elementType, className, textContent) {
  let element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}
