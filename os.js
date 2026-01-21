const os = require ("os");

console.log("OS Platform :",os.platform());
console.log("OS CPU's :",os.cpus().length);
console.log("OS type :",os.type());
console.log("OS Architecture :",os.arch());
console.log("OS Release :",os.release());
console.log("OS Hostname :",os.hostname());