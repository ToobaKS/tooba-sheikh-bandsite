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


//function to send the likes
async function likeC(commentObj) {
  try {
    await bandSiteApi.likeComment(commentObj.id);
    comments = await bandSiteApi.getComments();
    renderComments();
  } catch (error) {
    console.error(error);
  }
}

//function to delete comment
async function deleteC(commentObj) {
  try {
    await bandSiteApi.deleteComment(commentObj.id);
    comments = await bandSiteApi.getComments();
    renderComments();
  } catch (error) {
    console.error(error);
  }
}

/**
 * This function creates HTML elements to
 * display comments
 *
 */
function renderComments() {
  //Getting the parent div from the html document
  let commentSection = document.querySelector(".comments__comments-list");
  commentSection.innerHTML = "";

  for (const commentObj of comments) {

    //creating a div for a single comment
    let comment = createElement("div", "comments__comment", "");

    //creating a div for the profile image
    let profile = createElement("div", "comments__profile", "");

    //creating a div that will contain the name, date and comment
    let commentInfo = createElement("div", "comments__comment-info", "");

    //creating a div that will contain the name and the date
    let userInfo = createElement("div", "comments__user-info", "");

    //creating the profile picture element
    let profileImage = createElement("div", "comments__profile-img", "");

    //creating the name element
    let name = createElement("p", "comments__name", commentObj.name);

    //creating the date element
    let date = createElement(
      "p",
      "comments__date",
      formatDate(commentObj.timestamp)
    );

    //creating the comment paragraph element
    let para = createElement("p", "comments__comment-Para", commentObj.comment);

    //creating div that will have the like button and the delete button
    let functionContainer = createElement("div", "comments__functions", "");

    //creating the like button
    let like = createElement("button", "comments__like", "");

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

    //creating the like ecounter beside the like button
    let likeCounter = createElement(
      "p",
      "comments__likes-number",
      commentObj.likes
    );

    //creating the delete button
    let deleteButton = createElement("button", "comments__delete", "");

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

/**
 *
 * @param {*} timestamp
 * @returns the formatted output for the time
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
