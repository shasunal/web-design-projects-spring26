const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const nedb = require('@seald-io/nedb');


const app = express();
const database = new nedb({filename: 'data.db', autoload:true});
//set up multer where files will be stored
//needs to be same as app.use express static
const uploadProcessor = multer({dest:'public/uploads'});


//use nunjucks inside response.render 
nunjucks.configure("views", {
    autoescape:true,
    express:app
});

app.set('view engine', 'njk');
//configured app to use nunjucks and response.render
app.use(express.static('public'));
//configure app to parse the body of request use urlencoded to handle files
app.use(express.urlencoded({extended:true}));

app.get('/', (request,response)=>{
    //retrieve items with empty object query
   let query={}
    database.find(query, (err,foundData)=>{
        console.log(foundData);
        response.render('index.njk', {dataToBeSent: foundData});
    });
    
    // response.render('index.njk', {SentData: 'hi'});
});

app.get('/make-a-post', (request,response)=>{
    response.render('make-post.njk');
})

app.post('/post', uploadProcessor.single('uploadedImage'),(request,response)=>{
console.log(request.body);
console.log(request.file);

let dataToBeStored = {
    dataDaption: request.body.caption, 
    filepath: "/uploads/" + request.file.filename,
    timestamp: Date.now(),
    date: new Date(Date.now()).toLocaleString()
}
console.log(dataToBeStored);
database.insert(dataToBeStored);
    response.redirect('/make-a-post');
})


app.get('/post/:uniquepost', (request,response)=>{
let query = {
    _id: request.params.uniquepost
}
database.findOne(query, (err, foundData)=>{
    
    response.render('unique.njk', {dataToBeSent: foundData});
});
});

app.listen(9001, ()=>{
    console.log('server started')
});