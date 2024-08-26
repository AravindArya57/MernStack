const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileModel_S_Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  device : {
    type : String,
    required : true
  },
  videoMode: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  videoFilePath: {
    type : String,
    required: true
  }, // Original path to encrypted video file
  videoOriginalName: {
    type : String,
    required: true
  },
  secretKey: {
    type : String,
    required: true
  }, // Encryption key
  iv: {
    type : String,
    required: true
  }, // Initialization vector
  thumbnail: {
    type : String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const FileModel_S = mongoose.model('FileModel_S', FileModel_S_Schema);
module.exports = FileModel_S;
