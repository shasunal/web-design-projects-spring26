window.onload = () => {
  console.log("Script is connected");

  //retrieve button element on lage
let button = document.getElementById('send');
//click event on the button
button.addEventListener('click', ()=>{
    //retrieve input text box
    let text = document.getElementById('search');
    //printing out data to console
console.log(text.value);
//call function when button is pressed
request(text.value);
//reset text value to be empty
text.value = ""
});



  //call function - only call fetch when request has been clicked
//   request();



  async function request(inputText) {
    let baseURL = "http://www.omdbapi.com/?";

    //api key = f9253397

    let params = new URLSearchParams({
      apikey: "f9253397",
      //use input text param instead of hard code option
      s: inputText,
      type: "movie",
    });

    console.log(baseURL + params);

    let url = baseURL + params;

    //response is what is being returned
    //retrieves entire request
    let response = await fetch(url);

    console.log(response);
    //convert to json wait for that to finish
    //just want to see data, not everything about request
    let json = await response.json();

    console.log(json);
    //json.Search comes from omdb api
    let movies = json.Search;
    console.log(movies);
    //add each movie to webpage
    for (let movie of movies) {
      //1. retrueve where on the webpage movie data should be added
      let container = document.getElementById("container");
      //2. create the item to be added
      let m = document.createElement("div");
      m.textContent = movies.Title + " " + movie.Year;

      //2.5 adding poster element
      let img = document.createElement("img");
      img.src = movie.Poster;
      //3. add image to div
      m.append(img);
      //4. add div to container
      container.appendChild(m);
    }
  }
};
