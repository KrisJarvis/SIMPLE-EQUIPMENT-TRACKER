const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Machine', 'Vessel', 'Tank', 'Mixer']
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Under Maintenance'],
    default: 'Active'
  },
  lastCleanedDate: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Equipment', equipmentSchema);
