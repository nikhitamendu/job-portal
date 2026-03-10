const mongoose = require('mongoose');
require('dotenv').config();
const Notification = require('./models/Notification');
const User = require('./models/User');

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ name: /Nikhita/i });
    if (!user) {
      console.log('Nikhita not found');
      process.exit(1);
    }
    
    await Notification.create({
      recipient: user._id,
      sender: user._id, // notify self for test
      type: 'new_job',
      message: 'Test Notification: Welcome to the new redesign!',
      link: '/notifications'
    });
    
    console.log('Test notification created for user:', user.name);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
