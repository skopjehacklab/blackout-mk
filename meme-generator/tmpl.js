var fs = require('fs'),
    tmpl = process.argv[2],    
    items = require('./' + process.argv[3]),
    template = fs.readFileSync(tmpl, 'utf8');

items.forEach(function(item) {
    var result = template;
    for (var key in item) {
        result = result.replace(key, item[key]);
        result = result.replace(key, item[key]);
        result = result.replace(key, item[key]);
    }
    fs.writeFileSync(item.fileName, result);
});

