const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());

const SECRET = "secretKey";

let users = [
  { name: "Darshit", email: "darshit@gmail.com", password: "1234" },
  { name: "Rahul", email: "rahul@gmail.com", password: "abcd" },
  { name: "Aman", email: "aman@gmail.com", password: "pass123" },
  { name: "Neha", email: "neha@gmail.com", password: "neha@123" },
  { name: "Priya", email: "priya@gmail.com", password: "priya123" }
];

(async () => {
    for(let user in users)
    {
        users[user].hashedPass= await bcrypt.hash(users[user].password,10);
        console.log(users[user]);
    }
})();


app.post("/login", async (req,res) => {
        const {name , password} = req.body;
        
        const user = users.find(u => u.name === name);
        if (!user) return res.json({msg :"User not found"});

        const match = await bcrypt.compare(password,user.password);
        if (!match) return res.json({msg : "Wrong password"});

        const token = jwt.sign({name},
            SECRET,{expiresIn : "5m"}
        );

        res.json({token});
})

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token){
    return res.json({ msg: "No token provided" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.json({ msg: "Token expired or invalid" });
    }
    req.user = decoded; 
    next();               
  });
}

app.get("/profile", auth , (req,res) => {
   res.json({msg:"Welcome " + req.user.name});
});

app.listen(3000, () => {
    console.log("server is running!");
})