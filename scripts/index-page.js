const API_KEY = "07c2e1f3-da04-4e9c-8536-0c8614581212";
let bandSiteApi = new BandSiteApi(API_KEY);


get();

async function get() {
  try {
    let comments = await bandSiteApi.getComments();
    console.log(comments);
    renderComments(comments);
  } catch (error) {
    console.error(error);
  }
}

async function post(commentObj) {
  try {
    await bandSiteApi.postComment(commentObj);
    get();
  } catch (error) {
    console.error(error);
  }
}

//Adding new comments using event listener
let form = document.querySelector(".comments__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    name: e.target.name.value.trim(),
    comment: e.target.comment.value.trim(),
  };

  post(obj);
  form.reset();
});

//Rendering the comments
function renderComments(comments) {
  console.log("hello");
  //Getting the parent div from the html document
  let commentSection = document.querySelector(".comments__comments-list");
  commentSection.innerHTML = "";

  for (const commentObj of comments) {
    console.log(commentObj);
    populateComment(commentObj, commentSection);
  }
}

/**
 * This function takes in the comment data
 * and uses them to create HTML elements to
 * display comments
 *
 * @param {*} commentObj an object from the comments array
 */
function populateComment(commentObj, commentSection) {
  const userName = commentObj.name;
  const commentDate = formatDate(commentObj.timestamp);
  const userComment = commentObj.comment;

  //creating a div for a single comment
  let comment = document.createElement("div");
  comment.classList.add("comments__comment");

  //creating a div for the profile image
  let profile = document.createElement("div");
  profile.classList.add("comments__profile");

  //creating a div that will contain the name, date and comment
  let commentInfo = document.createElement("div");
  commentInfo.classList.add("comments__commentinfo");

  //creating a div that will contain the name and the date
  let userInfo = document.createElement("div");
  userInfo.classList.add("comments__userinfo");

  //creating the profile picture element
  let profileImage = document.createElement("div");
  profileImage.classList.add("comments__profileimg");

  //creating the name element
  let name = document.createElement("p");
  name.classList.add("comments__name");
  name.textContent = userName;

  //creating the date element
  let date = document.createElement("p");
  date.classList.add("comments__date");
  date.textContent = commentDate;

  //creating the comment paragraph element
  let para = document.createElement("p");
  para.classList.add("comments__commentPara");
  para.textContent = userComment;

  //Appending the elements to thier parent element
  commentSection.prepend(comment);

  comment.append(profile);
  comment.append(commentInfo);

  profile.append(profileImage);

  commentInfo.append(userInfo);
  commentInfo.append(para);

  userInfo.append(name);
  userInfo.append(date);
}


/**
 * 
 * @param {*} timestamp 
 * @returns the month
 */
function formatDate(timestamp){
  let commentDate = new Date(timestamp);
  let currentDate = new Date();

  let ms = currentDate - commentDate;
  let sec = ms/1000;
  let min = sec/60;
  let hours = min/60;
  let days = hours/24;
  let months = days/30;

  if (sec < 60) {
    return `${Math.floor(sec)} seconds ago`;
  } else if (min < 60) {
    return `${Math.floor(min)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 30) {
    return `${Math.floor(days)} days ago`;
  } else if (months < 12) {
    return `${Math.floor(days/30)} months ago`;
  }else{
    return commentDate.toLocaleDateString();
  }

}