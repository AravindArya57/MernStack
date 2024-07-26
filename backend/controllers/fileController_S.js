const FileModel_S = require('../models/fileModel_S');
const path = require('path');
const fs = require('fs');

const uploadVideo = async (req, res) => {
  const { title, description, videoMode } = req.body;
  const videoFile = req.files.video[0];

  var filePathSet;
  switch(videoMode) {
    case '2D':
      filePathSet = `uploads/videos/2D/${videoFile.filename}`;
      break;
    case '180':
      filePathSet = `uploads/videos/180/${videoFile.filename}`;
      break;
    case '360':
      filePathSet = `uploads/videos/360/${videoFile.filename}`;
      break;
    case 'theater':
      filePathSet = `uploads/videos/theater/${videoFile.filename}`;
      break;
    default:
      filePathSet = `uploads/videos/${videoFile.filename}`;
  }

  // Create upload paths
  const videoFilePath = filePathSet // videoFile.path;

  // Save video info to database
  const newVideo = new FileModel_S({
    title,
    description,
    videoMode,
    video: videoFile.filename,
    videoFilePath
  });

  try {
    await newVideo.save();
    res.json({ message: 'Video uploaded successfully', newVideo });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await FileModel_S.find();
    res.json(videos);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  uploadVideo, getAllVideos
}

