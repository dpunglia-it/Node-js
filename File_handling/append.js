const fs = require("fs");

fs.appendFile("data.txt","New feature", () => {
    console.log("Added");
})

fs.unlink("data.txt", () => {
    console.log("file deleted");
 })