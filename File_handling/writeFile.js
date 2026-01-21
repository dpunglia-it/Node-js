const fs= require("fs");

fs.readFile("data1.txt","utf-8", (err,data1) =>{
     console.log(data1);
})

