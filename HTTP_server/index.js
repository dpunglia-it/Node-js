const http = require ("http");

const server = http.createServer((req,res) => {
    const url=req.url;
    const method = req.method;
    if(url === "/"){
        res.end("Welcome to home page");
    } else if (url==="/about"){
        res.end("This is about page");
    } else {
        res.end("404 Not found");
    }

}) ;

server.listen(3000,() => {
    console.log("Server is running");
})