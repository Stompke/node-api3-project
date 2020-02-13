const express = require('express');

const router = express.Router();

const Posts = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(allPosts => {
    res.status(200).json(allPosts)
  })
  .catch(err => {
    res.status(500).json({ error: "unable to retrieve posts from database" });
  })
});

router.post('/', validatePost, (req, res) => {
  
  Posts.insert(req.body)
  .then(addedPost => {
    res.status(201).json(addedPost)
  })
  .catch(err => {
    res.status(500).json({ error: "There was an error adding the post to the database"})
  })

});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


// custom middleware

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  next();
}

module.exports = router;
