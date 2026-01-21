const util = require("util");

function greet(name, callback) {
    setTimeout(() => {
        callback(null, "Hello " + name);
    }, 500)}

const greetAsync = util.promisify(greet);

async function main() {
    const msg = await greetAsync("Darshit");

    console.log(util.format("Message: %s", msg));  
    console.log(util.inspect({ msg }));             
}

main();
