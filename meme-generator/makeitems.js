var fs = require('fs');
var json = [];

var za = fs.readFileSync('pratenici-za.txt', 'utf8').split("\n");
var protiv = fs.readFileSync('pratenici-protiv.txt', 'utf8').split("\n");
var neglasale = fs.readFileSync('pratenici-neglasale.txt', 'utf8').split("\n");

var protbg = "#339933";
var zabg = "#993333";
var vozbg = "#666666";



var mapper = function(color, text) {
    return function(u) { 
        var ip = u.split(" ");
        return {
            "$$ime$$": ip[0],
                "$$prezime$$": ip[1],
                "$$slika$$": "../prat/" + u + ".jpg",
                "#000000": color,
                "$$tekst$$": text,
                fileName: "out/" + u + ".svg"
        };
    };
};

var all = []
    .concat(za.map(mapper(zabg, 'гласав "ЗА"')))
    .concat(protiv.map(mapper(protbg, 'гласав "ПРОТИВ"')))
    .concat(neglasale.map(mapper(vozbg, 'не гласав "ПРОТИВ"')));

console.log(JSON.stringify(all));
