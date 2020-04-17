var express = require("express");
var path = require("path");
var fs = require("fs");

// set up express
var app = express();
var PORT = 5050;

// data parsing in express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API requests
app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data) {
        if (err){
            return error(err);
        }
        return data;
    });
    return res.json(jsondata);
});


// start server
app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});