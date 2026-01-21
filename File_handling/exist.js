const fs= require("fs");

if(fs.existsSync("data1.txt")){
    console.log("File exists!");
}
else{
    console.log("Error not found");
}