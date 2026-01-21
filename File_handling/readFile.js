const fs= require("fs");

 fs.writeFile("data.txt","Hey there","utf-8",() => {
   console.log("File Written!");
 })