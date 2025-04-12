const express = require("express");
const sqlite3 = require("sqlite3").verbose();


const router = express.Router();
const db = new sqlite3.Database("./corporatedatabase.db");

router.get("/",(req,res)=>{
    const sql = 'SELECT * FROM USER';
    db.all(sql,[],(err,row) =>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json(row);
    })
})


module.exports = router;