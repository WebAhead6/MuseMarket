const login1 = document.querySelector("#login");
const register1 = document.querySelector("#register");
const btn = document.querySelector("#btn");
//const icon = document.querySelectorAll(".fa");

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
  console.log("mmm", post_id);
  ////  for (i = 0; i < icon.length; i++) {
  // console.log("mmmm", icon[i].getAttribute("data-value"));
  // if (icon[i].getAttribute("data-value") == post_id)

  fetch("/addLike", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post_id, user_id }),
  }).then(() => window.location.reload(true));

  console.log("end of file");
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
}
