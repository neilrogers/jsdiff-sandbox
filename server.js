const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
var Stopwatch = require("node-stopwatch").Stopwatch;

const app = express();

app.set('view engine', 'pug');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const libraries = ["json8", "fast-json-patch", "jiff", "deep-diff"];

function compare(library, left, right) {
    left = JSON.parse(left);
    right = JSON.parse(right);

    var diff = {};
    switch (library) {
        case "json8":
            const ooPatch = require('json8-patch');
            diff = ooPatch.diff(left, right);
            break;
        case "fast-json-patch":
            const jsonpatch = require('fast-json-patch');
            diff = jsonpatch.compare(left, right);
            break;
        case "jiff":
            const jiff = require("jiff");
            diff = jiff.diff(left, right);
            break;
        case "deep-diff":
            const deepdiff = require("deep-diff");
            diff = deepdiff.diff(left, right);
            break;
    }

    return diff;
}

function benchMark(loops, library, left, right) {
    var stopwatch = Stopwatch.create();
    stopwatch.start();
    for (let i = 0; i <= loops ; i++) {
        compare(library, left, right);
    }
    stopwatch.stop();

    return stopwatch;
    // console.log("ticks: " + stopwatch.elapsedTicks);
    // console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
    // console.log("seconds: " + stopwatch.elapsed.seconds);
    // console.log("minutes: " + stopwatch.elapsed.minutes);
    // console.log("hours: " + stopwatch.elapsed.hours);
}

app.post('/', (req, res) => {
    let result = compare(req.body.diffLibrary, req.body.left, req.body.right);
    result = JSON.stringify(result, null, 2);

    const bench = benchMark(1000, req.body.diffLibrary, req.body.left, req.body.right);
    
    let data = {
        left: fs.readFileSync("left.json"),
        right: fs.readFileSync("right.json"),
        result: result,
        diffLibrary: req.body.diffLibrary,
        libraries: libraries,
        bench: bench.elapsedMilliseconds
    };
    res.render('index', data);
});

app.get('/', (req, res) => {
    let data = { 
        left: fs.readFileSync("left.json"), 
        right: fs.readFileSync("right.json"),
        result: "",
        diffLibrary: "",
        libraries: libraries
    };
    res.render('index', data);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));