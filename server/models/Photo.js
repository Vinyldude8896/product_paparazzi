const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const photoSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  product: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    minlength: 5
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now

  },
//   photos: [Photo.schema]
});

_id: ID
location: String
product: String
image: String
createdAt: String

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;