const login1 = document.querySelector("#login");
const register1 = document.querySelector("#register");
const btn = document.querySelector("#btn");

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

function func(post_id, user_id) {
  console.log(post_id);
  fetch("/postId", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post_id, user_id }),
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   console.log("here", data);
    // });
  });
  console.log("end of file");
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
