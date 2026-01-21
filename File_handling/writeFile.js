const fs= require("fs");

 // fs.writeFile("data.txt","Hey there","utf-8",() => {
 //   console.log("File Written!");
// })

fs.readFile("data1.txt","utf-8", (err,data1) =>{
     console.log(data1);
})