const express = require('express')
const path = require('path')
const app = express()
const mongodb = require('./data/database')
const routes = require('./routes/routes')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set("views",path.join(__dirname,"views"))
app.set('view engine',"ejs")

app.use(routes)

mongodb.connectToDatabase().then(function() {
    app.listen(3000)
})