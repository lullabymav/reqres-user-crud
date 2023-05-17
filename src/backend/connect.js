import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reqres-user"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("This is Backend")
})
app.get("/user", (req,res)=>{
    const q = "SELECT * FROM user;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/user", (req,res)=>{
    const q = "INSERT INTO user (`email`,`firstName`,`lastName`,`job`) VALUES (?)"
    //const values = ["title from backend", "desc from backend", "cover from backend"]
    const values = [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.job,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has being created successfully")
    });
});

app.delete("/user/:id", (req,res) => {
    const userId = req.params.id
    const q = "DELETE FROM user WHERE id = ?"

    db.query(q, [userId], (err,data) =>{
        if(err) return res.json(err)
        return res.json("User has being deleted successfully")
    })

})

app.put("/user/:id", (req,res) => {
    const userId = req.params.id
    const q = "UPDATE user SET `email`=?, `firstName`=?,`lastName`=?,`job`=? WHERE id = ?";
    const values=[
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.job,
    ]

    db.query(q, [...values,userId], (err,data) =>{
        if(err) return res.json(err)
        return res.json("User has being updated successfully")
    })

})

app.listen(8800, () => {
    console.log("Connected to Backend!")
})