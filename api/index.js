const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());

//Import activities from JSON
let activities = require("./activities.json");

// Allow all origins for GET requests
const cors = require("cors");
app.use(
  cors({
    origin: "*", // ✅ Allows all origins
    methods: ["GET"], // ✅ Allows only GET requests
  })
);

app.get("/", (req, res) => {
  res.send("Hello youjj!");
});

//Endpoint for getting random activity
app.get("/api/randomactivity", (req, res) => {
  let randomActivityIndex = Math.floor(Math.random() * activities.length + 1);

  res.send(activities[randomActivityIndex]);
});

//Endpoint for getting a random activity by type /api/activity?type={type}
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

//Endpoint for 10 activities in a list /api/activities
app.get("/api/activities", (req, res) => {
  res.send("Coming soon");
});

// Endpoint for adding a new activity
app.post("/api/activity", (req, res) => {
  const newActivity = req.body;

  // // Validate the new activity
  if (
    !newActivity.activity ||
    !newActivity.type ||
    typeof newActivity.participants !== "number" ||
    typeof newActivity.price !== "number" ||
    !newActivity.link ||
    !newActivity.key ||
    typeof newActivity.accessibility !== "number"
  ) {
    return res.status(400).send({ error: "Invalid activity data." });
  }

  // Check for duplicate key
  const existingActivity = activities.find(
    (activity) => activity.key === newActivity.key
  );
  if (existingActivity) {
    return res
      .status(409)
      .send({ error: "Activity with this key already exists." });
  }

  // Add the new activity
  activities.push(newActivity);

  // Write the updated activities array back to the JSON file
  fs.writeFile(
    "./activities.json",
    JSON.stringify(activities, null, 2),
    (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Failed to save the new activity." });
      }
      res.status(201).send(newActivity);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
