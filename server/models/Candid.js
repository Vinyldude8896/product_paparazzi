const { Schema, model } = require('mongoose');
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
    retilerId: {
      type: Schema.Types.ObjectId,
      ref: 'Retailer',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Candid = model('Candid', candidSchema);

module.exports = Candid;