const API_KEY = "007c2e1f3-da04-4e9c-8536-0c8614581212";
let bandSiteApi = new BandSiteApi(API_KEY);

let shows = new Array();
get();

async function get() {
  try {
    shows = await bandSiteApi.getShows();
    console.log(shows);
    populateShows();
  } catch (error) {
    console.error(error);
  }
}

let showEl = document.querySelector(".shows__listing");

function populateShows() {
  createTitles();
  // for each object in the array shows
  for (const showObj of shows) {
    //creating a div that will contain a single row
    let show = document.createElement("div");
    show.classList.add("shows__show");

    //creating the elements for date, venue, location and thier titles
    let showDate = document.createElement("p");
    let showDateData = document.createElement("p");
    let showVenue = document.createElement("p");
    let showVenueData = document.createElement("p");
    let showLocation = document.createElement("p");
    let showLocationData = document.createElement("p");
    let button = document.createElement("button");

    //Adding classes to the created elements
    showDate.classList.add("shows__title");
    showDateData.classList.add("shows__data");
    showDateData.classList.add("shows__data--bold");
    showVenue.classList.add("shows__title");
    showVenueData.classList.add("shows__data");
    showLocation.classList.add("shows__title");
    showLocationData.classList.add("shows__data");
    button.classList.add("shows__submit");

    //Adding text to the created elements
    showDate.textContent = "DATE";
    showDateData.textContent = new Date(showObj.date).toDateString();
    showVenue.textContent = "VENUE";
    showVenueData.textContent = showObj.place;
    showLocation.textContent = "LOCATION";
    showLocationData.textContent = showObj.location;
    button.textContent = "BUY TICKETS";

    //Appending all the elements to thier parent elements
    show.append(showDate);
    show.append(showDateData);
    show.append(showVenue);
    show.append(showVenueData);
    show.append(showLocation);
    show.append(showLocationData);
    show.append(button);

    showEl.append(show);
  }
}

//Setting up the event listener for the click effect
showEl.addEventListener("click", (e) => {
  // get the closest .list__item, even if a child of it is clicked...
  const el = e.target.closest(".shows__show");
  console.log(el);

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

  //creating the title elements for date, venue, location
  let showDate = document.createElement("p");
  let showVenue = document.createElement("p");
  let showLocation = document.createElement("p");
  let button = document.createElement("button");

  //Adding classes to the created elements
  showDate.classList.add("shows__title-visible");
  showVenue.classList.add("shows__title-visible");
  showLocation.classList.add("shows__title-visible");
  button.classList.add("shows__submit");
  button.classList.add("shows__submit--invisible");

  //Adding text to the created elements
  showDate.textContent = "DATE";
  showVenue.textContent = "VENUE";
  showLocation.textContent = "LOCATION";
  button.textContent = "invisible";
  //Appending all the elements to thier parent elements
  show.append(showDate);
  show.append(showVenue);
  show.append(showLocation);
  show.append(button);

  showEl.append(show);
}
