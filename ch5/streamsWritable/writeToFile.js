const ToFileStream = require('./toFileStream.js');
const tfs = new ToFileStream();

tfs.write({path: "f1.txt", content: "hello"});
tfs.write({path: "f2.txt", content: "hello1"});
tfs.write({path: "f3.txt", content: "hello2"});
tfs.end(() => console.log("All files created"));
