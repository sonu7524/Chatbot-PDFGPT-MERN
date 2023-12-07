const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    files: Buffer
});

const fileModel = mongoose.model("File", FileSchema);
module.exports = fileModel;