const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

//Import activities from JSON
const activities = require("./activities.json");

// Allow all origins for GET requests
const cors = require("cors");
app.use(
  cors({
    methods: ["GET"], // Only allow GET requests
    origin: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello you!");
});

//Endpoint for getting random activity
app.get("/api/randomactivity", (req, res) => {
  let randomActivityIndex = Math.floor(Math.random() * activities.length + 1);

  res.send(activities[randomActivityIndex]);
});

//Endpoint for getting a random activity by type /api/activity?type=:type
app.get("/api/activity", (req, res) => {
  let type = req.query.type;

  //Makes a new arrays of activities based on type
  let activitiesByType = activities
    .filter((activity) => activity.type == type)
    .map((activity) => {
      return activity;
    });

  let randomActivityIndex = Math.floor(
    Math.random() * activitiesByType.length + 1
  );

  res.send(activitiesByType[randomActivityIndex]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
