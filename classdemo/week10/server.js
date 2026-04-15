// how do we know this is a npm project?
// A: There is package jsons files

// what command do we run to start an npm project?
// A: npm init

// how do we create the node_modules folder if it doesn't exist?
// A: npm install

// what does the below chunk of code do?
// A: import libraries
const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const nedb = require('@seald-io/nedb');

// what is app?
// A: creates webserver that uses express 
const app = express();
// what is database?
// A: creates an external file that stores info in object format {}
//autoload loads the file automatically
const database = new nedb({ filename: 'data.db', autoload: true });

// what is this configuring?
// A: multer processes and stores photos in the uploads folder
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: any front-end files and assets goes in public folder
app.use(express.urlencoded({ extended: true })); // A: able to access any type of files that is uploaded, 
app.set('view engine', 'njk'); // A: sets express the ability to use njk files
nunjucks.configure('views', {
	autoescape: true,
	express: app,
}); // A: njk uses views folder and connects to express

// what type of request is this? what does it do?
// A: Get request, what happens when a particular route is hit
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: send, render, redirect, json, sendFile
	// how many parameters does response.render use? list them.
	// A: can be 1, optional two
	//first one is file that is rendered, second is object with data we are sending
	// write out the render for index.njk using the database
database.find({}, (error, foundData) => {
		response.render('index.njk', { data: foundData});
	});
});



// what are the three parameters in this function?
// A: route ('/upload'), (req,res) = >{ everything inside}, upload.single
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A: object
	let data = {
		dataCaption: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A: check if file was already uploaded
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the insert function do?
	// A: saves data to the database
	database.insert(dataToBeStored);

	resopnse.redirect('/');
});

// what does the number signify?
// A: port number that the server will run on
// how do we access this on the web?
// A: http://localhost:6001
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.njk
