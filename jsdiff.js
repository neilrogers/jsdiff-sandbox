const Benchmark = require('benchmark');

class jsdiff {
    libraries(libraries) {
        this.libraries = libraries;
    }

    genPatch(library, left, right) {
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

    benchMark(library, left, right) {
        const jsdiff = this;
        const suite = new Benchmark.Suite;

        for (let i in jsdiff.libraries) {
            suite.add(jsdiff.libraries[i], function () {
                return jsdiff.genPatch(jsdiff.libraries[i], left, right);
            });
        }
        suite.on('cycle', function (event) {
            console.log(String(event.target));
        });

        suite.on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })

        suite.run({ 'async': false });

    }
}

module.exports = jsdiff;