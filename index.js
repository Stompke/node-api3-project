// code away!
const server = require('./server');



server.use(function(req, res) {
  res.status(404).send('Aint nobody got time for dat!!');
});


server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});
