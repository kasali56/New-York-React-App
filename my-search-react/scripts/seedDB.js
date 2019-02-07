const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactarticlelist",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    title: "The First Article",
    author: "Jason Henry",
    synopsis:
      'A sample entry into the database in case there are no others',
    date: new Date(Date.now())
  },
  {
    title: "The Second Article",
    author: "William Golding",
    synopsis:
      "The tale of a party of shipwrecked people.",
    date: new Date(Date.now())
  }
  
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
