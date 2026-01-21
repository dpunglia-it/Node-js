const fs= require("fs");

 fs.writeFile("data.txt","Hey there","utf-8",() => {
   console.log("File Written!");
 })

 fs.unlink("data.txt", () => {
    console.log("file deleted");
 })