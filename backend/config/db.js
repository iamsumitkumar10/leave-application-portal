const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/leave_portal';

module.exports = function connectDB(){
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=> console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}
