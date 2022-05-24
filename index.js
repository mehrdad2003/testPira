const express=require('express')
require('dotenv').config()
const cors = require('cors');
const path=require('path')
const app=express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors())
app.use('/',require('./routes/main'))
app.get("/", (req, res) => {
    res.redirect("/index/");
    });
 app.get("*", (req, res) => {
      res.redirect("/index/");
      });
const PORT= process.env.PORT||7000
app.listen(PORT,()=>{
  
  console.log('server is run');  
})
