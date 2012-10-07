var fs = require('fs'),
    argv = require('optimist').argv;

var ishtml = /\.html?$/,
    templatePath = argv._[0];

fs.readFile(templatePath, 'utf8', function(err, template) {
    var ms = template.match(/\$\$([-_\s.0-9a-zA-Z]+)\$\$/g)
    var remaining = ms.length;
    ms.forEach(function(m) {
        var partialPath = m.match(/\$\$(.+)\$\$/)[1];
        fs.readFile(partialPath, 'utf8', function(err, partial) {
            if (err) console.error(err);
            if (ishtml.test(partialPath) && !ishtml.test(templatePath)) 
                partial = partial.replace(/[\r\n]+/g, " ");
            template = template.replace(m, partial);
            if (!--remaining) process.stdout.write(template);
        });
    });
});
