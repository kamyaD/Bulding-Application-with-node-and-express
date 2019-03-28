
const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const bodyparser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

const nav=[
  { link: "/children", title: "Children" },
  { link: "/activity", title: "Activities" },
  { link: "/gallary", title: "Gallary" },
  { link: "/sponsors", title: "Sponsors" }
];

const childrenRouter = require('./src/routes/childrenRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const authRouter = require('./src/routes/authRouter')(nav);


app.use(morgan("tiny"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({secret: 'children'}));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");



app.use('/children',childrenRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.get("/", (req, res) =>
  res.render("index", {
    nav,
    title: "Love the Children "
  })
);


//import database connection:
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server started on port ${PORT}`));

const db = require("./src/config/database");

// Testing connection:
db.authenticate()
  .then(() => console.log("Database connected.."))
  .catch(err => console.log("Error: " + err));
