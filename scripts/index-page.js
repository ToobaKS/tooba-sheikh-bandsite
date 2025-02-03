//array holding the comments as objects
const comments = [
  {
    name: "Isaac Tadesse",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    date: new Date("10/20/2023"),
  },
  {
    name: "Christina Cabrera",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    date: new Date("10/28/2023"),
  },
  {
    name: "Victor Pinto",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    date: new Date("11/02/2023"),
  },
];

renderComments();

//Adding new comments using event listener
let form = document.querySelector(".comments__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    name: e.target.name.value.trim(),
    comment: e.target.comment.value.trim(),
    date: new Date(),
  };

  comments.push(obj);
  console.log(comments);

  form.reset();

  renderComments();
});

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
  const commentDate = commentObj.date;
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
  date.textContent = commentDate.toLocaleDateString();

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
