const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    contact: {
      type: Number,
    },
    logCount: {
      type: Number,
      default: 0,
    },
    logged: {
      type: [Date],
      default: [],
    },
    accessRights: {
      type: [String],
      required: true,
      enum: ["1102", "1101", "1111", "1100"],
      default: ["1100"],
      validate: {
        validator: function (value) {
          return value.every((num) =>
            ["1102", "1101", "1111", "1100"].includes(num)
          );
        },
        message: "Invalid access type",
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.addLoginTimestamp = function () {
  if (this.activated === false) return;
  const singaporeTime = new Date();

  this.logged.push(singaporeTime);
  this.logCount = this.logCount + 1;
  return this.save();
};

// Pre-save middleware to add login timestamp before saving the document
userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.addLoginTimestamp();
  }
  next();
});
const User = new mongoose.model("Users", userSchema);

module.exports = User;
