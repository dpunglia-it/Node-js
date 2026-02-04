const fs= require("fs");

 fs.writeFile("data.txt","Hey there 1",() => {
   console.log("File Written!");
 })
