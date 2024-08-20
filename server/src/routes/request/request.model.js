const mongoose = require("mongoose");
const { updateStore } = require("../store/store.controller");

const requestItemSchema = mongoose.Schema(
  {
    requestorId: {
      type: String,
      required: true,
    },
    material: {
      type: Number,
      required: true,
    },
    quantity: {
      type: [{ quantity: Number }, { updated: Number }],
      default: [{ updated: 0 }],
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    updated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const RequestItem = new mongoose.model("RequestItem", requestItemSchema);

module.exports = RequestItem;
