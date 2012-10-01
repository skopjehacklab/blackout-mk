var fs = require('fs');

fs.readFile('./blackout-mk.tmpl.js', 'utf8', function(err, tmpljs) {
    fs.readFile('./blackout-mk.html', 'utf8', function(err, html) {
        html = html.replace(/[\r\n]+/g, " ");
        var outjs = tmpljs.replace("$$BHSTR$$", html);
        process.stdout.write(outjs);
    });
});
