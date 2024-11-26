const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');

<<<<<<< HEAD
module.exports = mongoose.connection;
=======
module.exports = mongoose.connection;
>>>>>>> bb890564d085e92d382bffca92b8cb08ca517af2
