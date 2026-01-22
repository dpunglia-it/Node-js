const path = require("path");

console.log("File Name:",__filename);
console.log("Directory Name:",__dirname);
console.log(path.extname("data.txt"));
console.log(path.join("users","file","data.txt"));
console.log(path.resolve("data.txt"));
console.log(path.parse("hello.js"));