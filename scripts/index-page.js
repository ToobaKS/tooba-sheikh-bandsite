import { BandSiteApi } from "./band-site-api.js";

const API_KEY = "07c2e1f3-da04-4e9c-8536-0c8614581212";
let bandSiteApi = new BandSiteApi(API_KEY);

let comments = await bandSiteApi.getComments();
renderComments();

//Adding new comments using event listener
let form = document.querySelector(".comments__form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.getElementById("name-box");
  name.classList.remove("comments__input--error");

  let comment = document.getElementById("comment-box");
  comment.classList.remove("comments__input--error");

  if (!e.target.name.value.trim()) {
    name.classList.add("comments__input--error");
    alert("Please fill out the form fields");
  } else if (!e.target.comment.value.trim()) {
    comment.classList.add("comments__input--error");
    alert("Please fill out the form fields");
  } else {
    const obj = {
      name: e.target.name.value.trim(),
      comment: e.target.comment.value.trim(),
    };

    await bandSiteApi.postComment(obj);
    comments = await bandSiteApi.getComments();
    renderComments();
    form.reset();
  }
});

async function likeC(commentObj) {
  try {
    await bandSiteApi.likeComment(commentObj.id);
    comments = await bandSiteApi.getComments();
    renderComments();
  } catch (error) {
    console.error(error);
  }
}

async function deleteC(commentObj) {
  try {
    await bandSiteApi.deleteComment(commentObj.id);
    comments = await bandSiteApi.getComments();
    renderComments();
  } catch (error) {
    console.error(error);
  }
}

//Rendering the comments
function renderComments() {
  //Getting the parent div from the html document
  let commentSection = document.querySelector(".comments__comments-list");
  commentSection.innerHTML = "";

  for (const commentObj of comments) {
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

  //creating div that will have the like button and the delete button
  let functionContainer = document.createElement("div");
  functionContainer.classList.add("comments__functions");

  //creating the like button
  let like = document.createElement("button");
  like.classList.add("comments__like");

  //creating the image inside the like button
  let likeImage = document.createElement("img");
  likeImage.classList.add("comments__img");
  likeImage.classList.add("like");
  likeImage.src = "../assets/icons/icon-like.svg";
  like.addEventListener("click", async () => {
    try {
      await likeC(commentObj);
    } catch (error) {
      console.error(error);
    }
  });

  //creating the lik ecounter beside the like button
  let likeCounter = document.createElement("p");
  likeCounter.classList.add("comments__likes-number");
  likeCounter.textContent = commentObj.likes;

  //creating the delete button
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("comments__delete");

  //creating the image inside the delete button
  let deleteImage = document.createElement("img");
  deleteImage.classList.add("comments__img");
  deleteImage.classList.add("delete");
  deleteImage.src = "../assets/icons/icon-delete.svg";
  deleteImage.addEventListener("click", async () => {
    try {
      await deleteC(commentObj);
    } catch (error) {
      console.error(error);
    }
  });

  //Appending the elements to thier parent element
  commentSection.prepend(comment);

  comment.append(profile);
  comment.append(commentInfo);

  profile.append(profileImage);

  commentInfo.append(userInfo);
  commentInfo.append(para);
  commentInfo.append(functionContainer);

  userInfo.append(name);
  userInfo.append(date);

  functionContainer.append(likeCounter);
  functionContainer.append(like);
  like.append(likeImage);

  functionContainer.append(deleteButton);
  deleteButton.append(deleteImage);
}

/**
 *
 * @param {*} timestamp
 * @returns the month
 */
function formatDate(timestamp) {
  let commentDate = new Date(timestamp);
  let currentDate = new Date();

  let ms = currentDate - commentDate;
  let sec = Math.abs(ms) / 1000;
  let min = sec / 60;
  let hours = min / 60;
  let days = hours / 24;
  let months = days / 30;

  if (sec < 60) {
    return `${Math.floor(sec)} seconds ago`;
  } else if (min < 60) {
    return `${Math.floor(min)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 30) {
    return `${Math.floor(days)} days ago`;
  } else if (months < 12) {
    return `${Math.floor(days / 30)} months ago`;
  } else {
    return commentDate.toLocaleDateString();
  }
}
