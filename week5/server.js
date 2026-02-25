//nodemon server.js
//storing inside database instead of an array

//1.import libraries
const express = require("express");
let nedb = require("@seald-io/nedb");
let nunjucks = require("nunjucks");

//2. initialize library settings
let app = express();
//sets up database variable that we are storing data in an external file
let database = new nedb({ filename: "data.db", autoload: true });

//set up nunjuckd template
//nunjucks will be using express
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//express will use the templating engine of nunjucks
app.set("view engine", "njk");

//3. middleware, settings for our application
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));

//3. routes
app.get("/", (request, response) => {
  //any database manipulation needs to happen before sending response
  //insert will take data insoide database
  database.insert({ data: "hello" });

  //inside of a req, send always need to go at the end
  response.send("<h1>hi</h1>");
});

app.get("/data", (request, response) => {
  //find takes in 2 parameters,
  // first is object we are looking for,
  //second is callback function, or action to happen
  //empty, find everything
  let query = {};
  database.find(query, (error, foundData) => {
    //checking for an error
    if (error) {
      response.send("error");
      //otherwise send back found data in json format
    } else {
      //formatt found data in json
      let formattedJSON = {
        allData: foundData,
      };
      //now it is json array
      response.json(formattedJSON);
    }
  });
});

app.get("/guestbook", (request, response) => {
  //second param is an object that represents the data that
  // is going to be populated on the client side
  //serverData is name of variable I am going to use
  response.render("guestbook.njk", { serverData: "<h1>hello</h1>" });
});
//sending data from /post in guestbook
app.post("/sign", (request, response) => {
  //process body of request in the format I want
  //  it to be displayed in json data
  //how it will be stored in database
  let guestSignature = {
    guestname: request.body.guest,
    guestMessage: request.body.guestMessage,
  };
  //store data in database
  database.insert(guestSignature);

  //send user back to guestbook page
  response.redirect("/guestbook");
});

//get all responses in database
app.get('/display-guest-messages', (request, response)=>{
    let query = {
        guestName:{$exists: true}
    }
database.find(query, (error, foundData)=>{
if (error){
    response.redirect('/guestbook');
//else display all data
}else{response.json.foundData};

response.render('messages.njk' , {messages:foundData})

console.log('displaying guest messages')

});
});
//last: start server

app.listen(9001, () => {
  console.log("server is running");
});
