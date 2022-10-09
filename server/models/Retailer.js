

const { Schema, model } = require('mongoose');
const retailerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    image: { // image will be stored in the server's static folder
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Retailer = model('Retailer', retailerSchema);

module.exports = Retailer;