const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;
  console.log(newUser)
  // if (!newUser.name) {
  //   res.status(401).json({ errorMessage: "You must enter a user name" })
  // } else {
    
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
  // }



  // if(allUsers.includes(newUser)) {
  //   console.log("username taken" )
  // } else {
  //   console.log("nice name!")
  // }
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!

  Posts.insert(req.body);

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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
      res.status(200).json({ user });
  })
  .catch( err => {
    res.status(500).json({ error: "There was an error grabbing the user by that id" })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId,  (req, res) => {
  // do your magic!
  console.log(req.params.id)
  // res.status(200).json(req.params.id)
  Users.remove(req.params.id)
  .then(deleted => {
    res.status(200).json({ message: deleted})
  })
  .catch(err => {
    res.status(500).json({ error: "Could not delete selected user for that ID" })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  console.log(req.body)
  Users.update(req.params.id, req.body)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(err => {
    res.status(500).json({ error: "The selected user could not be updated. :(" })
  })
});

//custom middleware



module.exports = router;


  
  function validateUserId (req, res, next) { 
    Users.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).json({ message: "invalid user id" })
      } else {
        // req.user = req.user;
        console.log('valid user id');
        next();
      }
  
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error grabbing the user by that id" })
    })
  

  }

  function validateUser (req, res, next) { 
    if(!req.body){
      res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" })
    }
    next();
  }