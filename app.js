const express = require('express')
const path = require('path')
const app = express()
const mongodb = require('./data/database')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set("views",path.join(__dirname,"views"))
app.set('view engine',"ejs")

app.get('/',(req,res)=> {
    res.send('hi')
})

mongodb.connectToDataBase().then(function() {
    app.listen(3000)
})