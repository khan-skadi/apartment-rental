const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  name: { type: String, required: true, default: "", trim: true },
  description: { type: String, required: true, default: "", trim: true },
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
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
