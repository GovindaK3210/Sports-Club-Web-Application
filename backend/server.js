let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db");
const expressJwt = require("express-jwt");
const fs = require("fs");

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected");
    },
    (error) => {
      console.log("Database could not connected: " + error);
    }
  );

// Setting up port with express js
const userRoute = require("../backend/routes/user.route");
const practiceSessionRoute = require("../backend/routes/practicesession.route");
const attendanceRoute = require("../backend/routes/attendance.route");
const loginRoute = require("../backend/routes/login.route");



const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/", express.static(path.join(__dirname, "dist/mean-stack-crud-app")));

const RSA_PUBLIC_KEY = fs.readFileSync("./JWT_KEY/jwtRS256.key.pub");
const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
});

app.use("/login", loginRoute);

// DISABLE THIS IF YOU WANT TO TEST API USING TOOL
// THIS IS BACK END AUTHORIZATION

app.use(checkIfAuthenticated);

app.use("/user", userRoute);
app.use("/practice-session", practiceSessionRoute);
app.use("/attendance", attendanceRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

require("./generate-dummy-data");


// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
