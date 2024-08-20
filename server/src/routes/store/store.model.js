const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    material: { type: Number, required: true },
    materialDescription: { type: String, required: true },
    materialGroup: { type: String, required: true },
    location: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    uom: { type: String, required: true },
    pmScheduled: { type: Boolean, default: false },
    critical: { type: Boolean, default: false },
    lastUpdate: { type: [Date], default: [] },
  },
  { timestamps: true }
);

// Corrected the index to avoid duplicate keys
storeSchema.index({
  materialDescription: "text",
  materialGroup: "text",
  pmScheduled: true,
  critical: true,
});

storeSchema.methods.addTimestamp = function () {
  const singaporeTime = new Date();
  this.lastUpdate.push(singaporeTime);
};

storeSchema.pre("save", function (next) {
  this.addTimestamp();
  next();
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
