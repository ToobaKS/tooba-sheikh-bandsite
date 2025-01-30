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

//Getting the parent div from the html document
let commentSection = document.querySelector(".comments__oldcomments");

//For populating the old comments

for (const commentObj of comments) {
  let userName = commentObj.name;
  let date = commentObj.date;
  let userComment = commentObj.comment;

  populateComment(userName, userComment, date);
}

//For adding new comments using event listener

let form = document.querySelector(".comments__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = e.target.name.value;
  let comment = e.target.comment.value;
  let date = new Date();

  console.log(userName);
  console.log(comment);

  populateComment(userName, comment, date);
});


/**
 * 
 * This function takes in the comment data 
 * and uses them to create HTML elements to
 * display comments
 * 
 * @param {*} userName name of the user making the comment
 * @param {*} userComment comment made by the user
 * @param {*} commentDate date of the posted comment
 */
function populateComment(userName, userComment, commentDate) {
  //creating a div for a single comment
  let comment = document.createElement("div");
  comment.classList.add("comments__comment");

  //creating a div for the profile image
  let profile = document.createElement("div");
  profile.classList.add("comments__profile");

  //creating a div that will contain the name, date and comment
  let commentInfo = document.createElement("div");
  commentInfo.classList.add("comments__commentInfo");

  //creating a div that will contain the name and the date
  let userInfo = document.createElement("div");
  userInfo.classList.add("comments__userinfo");

  //creating the profile picture element
  let profileImage = document.createElement("img");
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

  //Appending the lements to thier parent element
  commentSection.prepend(comment);

  comment.append(profile);
  comment.append(commentInfo);

  profile.append(profileImage);

  commentInfo.append(userInfo);
  commentInfo.append(para);

  userInfo.append(name);
  userInfo.append(date);
}
