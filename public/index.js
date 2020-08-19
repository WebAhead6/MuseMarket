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
