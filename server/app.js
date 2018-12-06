let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let passport = require("passport");
let session = require("express-session");
let MongoStore = require("connect-mongo")(session);
let envConfig = require("./config/env");
let cors = require("cors");

let responseHandler = require("./util/responseHandler").Response;

let UsersController = require("./controllers/users");
let EventsController = require("./controllers/events");
let AuthController = require("./controllers/auth");
let LocationsController = require("./controllers/locations");
let CategoriesController = require("./controllers/categories");

let isLoggedIn = require("./util/middlewares").isLoggedIn;
let isAdmin = require("./util/middlewares").isAdmin;
let acl = require("./util/middlewares").aclLookup;
let app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

let socket = require("./util/socket");
socket.setSocket(io);

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(
  require("express-session")({
    secret: envConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: envConfig.mongoURI
      // mongoOptions: advancedOptions // See below for details
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({ origin: [envConfig.frontEnd], credentials: true }));

// ----------------------------------------------- APIs Handlers Start ------------------------------
app.use("/api/events", EventsController, responseHandler);
app.use("/api/users", UsersController, responseHandler);
app.use("/api/locations", LocationsController, responseHandler);
app.use("/api/categories", CategoriesController, responseHandler);
app.use("/api/auth", AuthController, responseHandler);
// ----------------------------------------------- APIs Handlers End ------------------------------

// Catch all other routes and return the index file for dev
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// rewrite virtual urls to angular app to enable refreshing of internal pages
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app: app, server: server };
