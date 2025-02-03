const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

let showEl = document.querySelector(".shows__listing");
console.log(showEl);

// for each object in the array shows
for (const showObj of shows) {
  //creating a div that will contain a single row
  let show = document.createElement("div");
  show.classList.add("shows__show");
  
  // show.addEventListener();

  //add click event show item
  //have a variable stored outside for last clicked item
  //last show clicked item should be null
  //in the click event
  //upadate the show class list of the show element

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
  showDateData.textContent = showObj.date;
  showVenue.textContent = "VENUE";
  showVenueData.textContent = showObj.venue;
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
