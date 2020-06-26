const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  name: { type: String, required: true, default: "", trim: true },
  description: { type: String, required: true, default: "", trim: true },
  rooms: {
    type: Number,
    required: true,
    default: 1,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    validate: {
      validator: function (v) {
        return v >= 1;
      },
      message: (props) => `${props.value} is not a valid number of rooms!`,
    },
    alias: "i",
  },
  floorSize: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
  },
  pricePerMonth: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
  },
  lat: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
    validate: {
      validator: function (v) {
        return v > -90 && v < 90;
      },
      message: (props) => `${props.value} is not a valid latitude!`,
    },
  },
  lng: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
    validate: {
      validator: function (v) {
        return v > -180 && v < 180;
      },
      message: (props) => `${props.value} is not a valid longitude!`,
    },
  },
  created: {
    autoCreate: true,
    type: Date,
    default: new Date(),
    required: true,
  },
  realtor: {
    type: Schema.ObjectId,
    ref: "User",
  },
  rentable: {
    autoCreate: true,
    type: Boolean,
    default: true,
    required: true,
  },
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
