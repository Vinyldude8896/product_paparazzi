const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const couponSchema = new Schema(
    {
     couponText: {
        type: String,
        required: true,
        minlegnth: 4,
        maxlength: 55
     },
     redeemCounter: {
        type: String,  
        default: "0"
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


const Coupon = model('Coupon', couponSchema);

module.exports = Coupon;