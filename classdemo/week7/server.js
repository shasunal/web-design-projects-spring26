//import libraries
const express = require("express");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");

//initialize express app
let app = express();
//connect nunjucks to express
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//connect express to nunjucks
app.set("view engine", "njk");

//set up our middleware
app.use(express.static("public"));
app.use(express.urleocoded({ extended: true }));

app.use(cookieParser());

//
app.get("/", (request, response) => {
  //3 parameters
  //1st. name of cookie to be stored
  //2nd initial value of the cookie I want to assign
  //3rd when the cookie expires, in object format
  if (request.cookie.visits) {
    console.log(request.cookie.visits);
    let visits = request.cookie.visits;
    visits++;
    response.cookie("visits", visits, {
      expires: new Date(Date.now() + 100 * 60 * 60),
    });
  } else {
    let oneHourInMs = 1000 * 60 * 60;
    response.cookie("visits", 1, {
      expires: new Date(Date.now() + oneHourInMs),
    });

   
  }
   response.render("index.njk", { numVisits: request.cookies.visits });
});

app.get('/about', (request,response)=>{
    response.render('about.njk')
});

app.listen(7001, () => {
  console.log("http://localhost:7001");
});
