// code away!
require('dotenv').config(); // add this line as the first thing to run1
const server = require('./server');



// server.use(function(req, res) {
//   res.status(404).send('Aint nobody got time for dat!!');
// });

const port = process.env.PORT 



server.listen(port, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});
