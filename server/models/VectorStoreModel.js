const mongoose = require('mongoose');

const VectorStoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  doc: { type: Array, required: true },
  // Add other fields as needed
});

const VectorStore = mongoose.model('VectorStore', VectorStoreSchema);

module.exports = VectorStore;
