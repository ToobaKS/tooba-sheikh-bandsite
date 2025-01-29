const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tues Sept 17 2024",
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

for (const showObj of shows) {
  //creating a div that will contain a single row
  let show = document.createElement("div");
  show.classList.add("shows__show");

  //creating the elements for date, venue, location and thier titles
  let showDate = document.createElement("p");
  let showDateInfo = document.createElement("p");
  let showVenue = document.createElement("p");
  let showVenueInfo = document.createElement("p");
  let showLocation = document.createElement("p");
  let showLocationInfo = document.createElement("p");

  //Adding classes to the created elements
  showDate.classList.add("shows__title");
  showDateInfo.classList.add("shows__info");
  showDateInfo.classList.add("shows__info--bold");
  showVenue.classList.add("shows__title");
  showVenueInfo.classList.add("shows__info");
  showLocation.classList.add("shows__title");
  showLocationInfo.classList.add("shows__info");

  //Adding text to the created elements 
  showDate.innerHTML = "Date";
  showDateInfo.innerHTML = showObj.date;
  showVenue.innerHTML = "Venue";
  showVenueInfo.innerHTML = showObj.venue;
  showLocation.innerHTML = "Location";
  showLocationInfo.innerHTML = showObj.location;

  //Appending all the elements to thier parent elements
  show.append(showDate);
  show.append(showDateInfo);
  show.append(showVenue);
  show.append(showVenueInfo);
  show.append(showLocation);
  show.append(showLocationInfo);

  showEl.append(show);
}
