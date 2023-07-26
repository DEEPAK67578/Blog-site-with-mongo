const express = require("express");
const routes = express.Router();
const db = require("../data/database");
const mongoDb = require("mongodb");

routes.get("/", (req, res) => {
  res.redirect("/posts");
});

routes.get("/posts", async (req, res) => {
   const posts = await db.getDb().collection('posts').find().toArray()
   res.render("post-list",{posts:posts});
});

routes.get("/new-post", async (req, res) => {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

routes.post("/new-post", async (req, res) => {
  const authorId = new mongoDb.ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  const newPost = {
    title: req.body.title,
    summary: req.body.summay,
    content: req.body.content,
    date: new Date(),
    author: {
      id: new mongoDb.ObjectId(req.body.author),
      name: author.name,
      email: author.email,
    }
  };
  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result)
  res.redirect('/posts')
});



module.exports = routes;
