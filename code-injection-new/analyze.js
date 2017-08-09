//node analyze.js test.js

var fs = require('fs'),esprima = require('esprima');

if (process.argv.length < 3) {
    console.log('Usage: analyze.js file.js');
    process.exit(1);
}

var filename = process.argv[2];
var code = fs.readFileSync(filename);
var ast = esprima.parse(code,"tolerant");
//console.log(JSON.stringify(ast, null, 4));
console.log(JSON.stringify(ast));

//console.log('Done');
