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

// Get current notes
function getNotes() {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            return error(err);
        }
        currentNotes.push(...JSON.parse(data));
    })
}

// initialize notes
var currentNotes = [];


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
        return res.json(currentNotes);
    });
});

app.post("/api/notes", function (req, res) {
    var updatedNotes = (req.body);

    currentNotes.push({...updatedNotes, id: Date.now()});

    fs.writeFile("db/db.json", JSON.stringify(currentNotes, null, 2), function (err) {
        if (err) {
            error(err);
        }
        return res.send("Written");
    });
});

app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;
    console.log(chosen);
    currentNotes = currentNotes.filter(item => item.id != chosen);
    fs.writeFile("db/db.json", JSON.stringify(currentNotes, null, 2), function (err) {
        if (err) {
            error(err);
        }
    });
    return res.send("Deleted");
});

getNotes();

// start server
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});