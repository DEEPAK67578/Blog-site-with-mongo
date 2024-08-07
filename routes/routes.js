const express = require("express");
const routes = express.Router();
const db = require("../data/database");
const mongoDb = require("mongodb");

routes.get("/", (req, res) => {
  res.redirect("/posts");
});

routes.get("/posts", async (req, res) => {
  const posts = await db.getDb().collection("posts").find().toArray();
  console.log(posts);
  res.render("post-list", { posts: posts });
});

routes.get("/new-post", async (req, res) => {
  const authors = await db.getDb().collection("authors").find().toArray();
  console.log(authors)
  res.render("create-post", {
    authors: authors,
    title: "Create Posts",
    h1Title: "New post",
  });
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
    },
  };
  const result = await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

routes.post("/posts/:id/delete", async (req, res) => {
  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new mongoDb.ObjectId(req.params.id) });
  res.redirect("/posts");
});

routes.get("/posts/:id/edit", async (req, res) => {
  const element = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new mongoDb.ObjectId(req.params.id) });
  res.render("update-post", { posts: element });
});

routes.post("/posts/:id/edit", async (req, res) => {
  const result = await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new mongoDb.ObjectId(req.params.id) },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          content: req.body.content,
        },
      }
    );
  res.redirect("/posts");
});

routes.get("/posts/:id/view", async (req, res) => {
  const [posts] = await db
    .getDb()
    .collection("posts")
    .find({ _id: new mongoDb.ObjectId(req.params.id) })
    .toArray();
  posts.humanReadableDate = posts.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  posts.date = posts.date.toISOString()
  console.log(posts)
  res.render('post-detail',{posts:posts})
});

module.exports = routes;
