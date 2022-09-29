var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
    silent: true,
});

child.start();