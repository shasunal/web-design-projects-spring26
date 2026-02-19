//start with nodemon server.jsno
//go to http://localhost:8000/test

//import libraries
const express = require("express");
//initialize our app as an express server
const app = express();
//front end files will go in public folder
app.use(express.static("public"));
//allows send and receive json data
app.use(express.urlencoded({ extended: true }));

//store in an array in global variable
let guestbookMessages = [];

//get and post request communicate between client and server
//first param is the url or location where we want to get data from
//second param is a function, action to happen when route is hit
//anonymous function instead of declaring function
app.get("/test", (req, res) => {
  //only send back one type of response
  res.send("my server is working");
});

app.get("/", (req, res) => {
  res.send("I set up / route");
});

app.get("/gb", (req, res) => {
  res.sendFile("guestbook.html", { root: "./public" });
});

app.post("/sign", (req, res) => {
  console.log(req.body);

  //store this data somewhere
  let guest = req.body.guest;
  let message = req.body.message;

  //push
  guestbookMessages.push({
    person: guest,
    note: message,
  });

  console.log("sign route has been hit");
  //go to guestbook route after submitting
  //only use one redirect/send/etc once per function
  res.redirect("/gb");
  //   res.send("hihihihi");
});

//send response back as api data
app.get("/all-messages", (req, res) => {
  //only can do response.something one time
  res.json({ allMessages: guestbookMessages });
});

app.listen(8116, () => {
  //when we write console.log in server, it will show in terminal
  console.log("server is running");
});
