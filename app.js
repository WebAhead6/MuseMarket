const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

const controllers = require("./controllers");
// const helpers = require("./views/helpers/index");
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main",
    // helpers: helpers,
  })
);

app.set("port", process.env.PORT || 3000);
app.use(controllers);

module.exports = app;
