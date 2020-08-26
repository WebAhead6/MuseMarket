const login1 = document.querySelector("#login");
const register1 = document.querySelector("#register");
const btn = document.querySelector("#btn");
var myInput = document.querySelector("#psw");
var letter = document.querySelector("#letter");
var capital = document.querySelector("#capital");
var number = document.querySelector("#number");
var length = document.querySelector("#length");

function register() {
  login1.style.left = "-400px";
  register1.style.left = "50px";
  btn.style.left = "110px";
}

function login() {
  login1.style.left = "50px";
  register1.style.left = "450px";
  btn.style.left = "0";
}

login1.style.left = "50px";

function func(post_id, user_id) {
  console.log(post_id);
  fetch("/postId", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post_id, user_id }),
  });
}
console.log("end of file");
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
