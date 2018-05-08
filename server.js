const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello, world"));

//Use Routes
app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/posts", posts);

/* process.env.PORT for deploy on HEROKU */
const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server running on port ${port}`));
