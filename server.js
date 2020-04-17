var express = require("express");
var path = require("path");
var fs = require("fs");

// set up express
var app = express();
var PORT = 5050;
app.use(express.static(__dirname + '/public'));

// data parsing in express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API requests
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            return error(err);
        }
        return res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function (req, res) {
    var updatedNotes = (req.body);
    console.log(updatedNotes);
    fs.writeFile("db/db.json", JSON.stringify(updatedNotes), function (err) {
        if (err) {
            error(err);
        }
    });
});


// start server
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});