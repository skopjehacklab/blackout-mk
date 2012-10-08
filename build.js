var fs = require('fs'),
    path = require('path'),
    argv = require('optimist')
        .usage("$1 [options] file.tmpl.xx > file.xx")
        .demand(["partialdir"])
        .describe("partialdir", "the directory where partial files are kept")
        .argv;

var ishtml = /\.html?$/,
    hasextension = /\./,
    templatePath = argv._[0];

fs.readFile(templatePath, 'utf8', function(err, template) {
    var ms = template.match(/\$\$([-_\s.0-9a-zA-Z]+)\$\$/g)
    var remaining = ms.length;
    ms.forEach(function(m) {
        var partialPath = m.match(/\$\$(.+)\$\$/)[1];
        fs.readFile(path.join(argv.partialdir, partialPath), 'utf8', function(err, partial) {
            if (err) console.error(err);
            // embed HTML inside non-HTML
            if (ishtml.test(partialPath) && !ishtml.test(templatePath)) 
                partial = partial.replace(/[\r\n]+/g, " ");
            // embed constants
            if (!hasextension.test(partialPath)) 
                partial = partial.replace(/[\r\n]+/g,"");
            template = template.replace(m, partial);
            if (!--remaining) process.stdout.write(template);
        });
    });
});
