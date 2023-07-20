const express = require('express')
const routes = express.Router()
const db = require('../data/database')

routes.get('/',(req,res)=> {
    res.redirect('/posts')
})

routes.get('/posts',(req,res)=> {
    res.render('post-detail')
})

routes.get('/new-post',async (req,res)=> {
    const authors = await db.getDb().collection('authors').find().toArray()
    console.log(authors)
    res.render('create-post',{authors:authors})
})


module.exports = routes


