const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.static('public'));

// Middleware to check for the working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const hourOfDay = currentDate.getHours();

  if (dayOfWeek >= 0 && dayOfWeek <= 4 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.send(
      "The Bookish website is only available during working hours (Sunday to Thursday, 9:00 to 17:00)"
    );
  }
};

// Use the working hours middleware for all routes
app.use(workingHoursMiddleware);

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/request", (req, res) => {
  res.sendFile(__dirname + "/views/request.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login-register.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contactUs.html");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});