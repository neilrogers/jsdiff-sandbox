const fs = require("fs");
const libraries = ["json8", "fast-json-patch", "jiff", "deep-diff"];

class route {
    get(req, res) {
        let data = {
            left: fs.readFileSync("left.json"),
            right: fs.readFileSync("right.json"),
            result: "",
            diffLibrary: "",
            libraries: libraries
        };
        res.render('index', data);
    }

    post(req, res) {
        const jsdiff = new jsdifflibraries
        let result = jsdiff.genPatch(req.body.diffLibrary, req.body.left, req.body.right);
        result = JSON.stringify(result, null, 2);

        //const bench = benchMark(req.body.diffLibrary, req.body.left, req.body.right);

        let data = {
            left: req.body.left,
            right: req.body.right,
            result: result,
            diffLibrary: req.body.diffLibrary,
            libraries: libraries
        };
        res.render('index', data);
    }
}

module.exports = new route();