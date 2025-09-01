const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.logout = function() {
  this.tokens = [];
  this.save();
};

module.exports = mongoose.model('User', userSchema);
