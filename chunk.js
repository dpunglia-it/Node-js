const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const upload = multer({
    dest:"uploads/"
});

// Normal File
// app.post("/upload",upload.single("file"),(req,res) => {
//     const filePath = path.join(__dirname,req.file.path)
//     res.send("file uploaded");
// })

// Uploading and reading file
// app.post("/upload",upload.single("file"),(req,res) => {
//     const filePath = path.join(__dirname,req.file.path);
//     fs.readFile(filePath,"utf-8", (err,data) => {
//         if(err) {
//             res.send("File not uploaded");
//         }
//         console.log(data);
//         res.send("Uploaded");
//     })
// })


// Uploading and reading big file in chunks

app.post("/upload",upload.single("file"),(req,res) =>{
    if(!req.file)
    {
        res.send("No file uploaded");
    }

    const filePath = path.join(__dirname,req.file.path);

    const stream = fs.createReadStream(filePath, {
        encoding:"utf-8",highWaterMark:16
    })

    stream.on("data",(chunk) => {
        console.log("Chunk :",chunk);
        res.write(chunk);
    })

    stream.on("end", () => {
        res.end("\n File ended");
    })

    stream.on("error", (err) => {
        console.log(err);
    });
    
});


app.listen(8000,() => {
    console.log("Server is running!");
})