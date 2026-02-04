const express = require("express");
const app = express();
const fs= require("fs");
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.get("/api/data", (req,res) => {

     const filePath = path.join(__dirname, "dummyData.txt");
      fs.readFile(filePath,"utf-8", (err,dummyData) => {
        if (err) {
            return res.status(500).send("File not found");
         }
        res.send(dummyData);
      })
})

app.post("/api/enter", (req,res) => {
    
    console.log(req.body);
    const data = `ID: ${req.body.id} , Name: ${req.body.name}`;
    fs.appendFile("writeData.txt",data,(err) => {
        if(err) {
            return res.send("File not saved");
        }
        res.send("Data saved!");
    })
})

app.listen(3000, () => {
    console.log("Server is Running!");
})

