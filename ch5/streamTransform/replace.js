const Replacestream = require('./replaceStream');

const rs = new Replacestream('World', 'Node.js');
rs.on('data', chunk => console.log(chunk.toString()));

rs.write('Hello w');
rs.write('orld!');
rs.end();

