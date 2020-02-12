const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const newUser = req.body;
  console.log(newUser)
  if (!newUser.name) {
    res.status(401).json({ errorMessage: "You must enter a user name" })
  } else {
    
    Users.get()
    .then(users => {
      if(users.map(item => item.name).includes(newUser.name)) {
        res.status(401).json({ errorMessage: "username taken, please choose another" })
      } else {

        Users.insert(newUser)
        .then(createdUser => {
          res.status(201).json({ createdUser })
        })
        .catch(err => {
          res.status(500).json({ error: "there was an error inserting the user into the database." })
        })
      }

    })
    .catch(err => 
      res.status(500).json({ error: "could not retreive users from database"}))
  }



  // if(allUsers.includes(newUser)) {
  //   console.log("username taken" )
  // } else {
  //   console.log("nice name!")
  // }
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {

  console.log('get users')
  Users.get()
  .then(users => {
    res.status(200).json({ users })
  })
  .catch( err => {
    res.status(500).json({ error: 'there was an error retreiving users from database' })
  })

});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
