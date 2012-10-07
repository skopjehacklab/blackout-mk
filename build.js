var fs = require('fs'),
    argv = require('optimist').argv;


fs.readFile(argv._[0], 'utf8', function(err, tmpl) {
    var ms = tmpl.match(/\$\$([-_\s.0-9a-zA-Z]+)\$\$/g)
    var remaining = ms.length;
    ms.forEach(function(m) {
        var tmplFile = m.match(/\$\$(.+)\$\$/)[1];
        var tmplHtml = /\.html?$/.test(tmplFile);
        fs.readFile(tmplFile, 'utf8', function(err, tmplFile) {
            if (err) console.error(err);
            if (tmplHtml) tmplFile = tmplFile.replace(/[\r\n]+/g, " ");
            tmpl = tmpl.replace(m, tmplFile);
            if (!--remaining) process.stdout.write(tmpl);
            else console.error(remaining);
        });
    });
});
