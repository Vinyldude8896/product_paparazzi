
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const candidSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    productName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    retailer: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
    username: {
        type: String,
        required: true
      },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Candid = model('Candid', candidSchema);

module.exports = Candid;