const FileModel_S = require('../models/fileModel_S');
const path = require('path');
const fs = require('fs');

const uploadVideo = async (req, res) => {
  const { title, description, videoMode } = req.body;
  const videoFile = req.files.video[0];

  // Create upload paths
  const videoFilePath = `uploads/videos/${videoFile.filename}` // videoFile.path;

  // Save video info to database
  const newVideo = new FileModel_S({
    title,
    description,
    device,
    videoMode,
    video: videoFile,
    thumbnail : thumbnailPath
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

// Get single video
const getVideo = async (req, res) => {
  try {
      const video = await FileModel_S.findById(req.params.id); // Assuming you're using Mongoose
      res.json(video);
  } catch (error) {
      res.status(500).send(error);
  }
};

// get device method video
const getVideoByDevice = async (req, res) => {
  try {
      const { device } = req.params;
      const video = await FileModel_S.find({ device: new RegExp('^' + device + '$', "i") });
      if (!video) {
          return res.status(404).json({ success: false, message: 'Video not found' });
      }
      res.status(200).json({ success: true, data: video });
  } catch (error) {
      console.error('Error fetching video by device', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Update video by ID
const updateVideo = async (req, res) => {
  try {
    const { title, description, device, videoMode } = req.body;
    const videoId = req.params.id;

    // console.log('Request Body:', req.body);
    // console.log('Request Files:', req.files);

    const videoData = await FileModel_S.findById(videoId);
    if (!videoData) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // console.log('Original Video Data:', videoData);

    videoData.title = title || videoData.title;
    videoData.description = description || videoData.description;
    videoData.device = device || videoData.device;
    videoData.videoMode = videoMode || videoData.videoMode;

    if (req.files && req.files.video) {
      // Delete the old video file
      const oldVideoPath = path.join(__dirname, '..', '..', videoData.video);
      if (fs.existsSync(oldVideoPath)) {
        fs.unlinkSync(oldVideoPath);
      }

      // Save the new video file path
      videoData.video = path.posix.join('/', req.files.video[0].path).replace(/\\/g, '/');
    }

    if (req.files && req.files.thumbnail) {
      // Delete the old thumbnail file
      const oldThumbnailPath = path.join(__dirname, '..', '..', videoData.thumbnail);
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }

      // Save the new thumbnail file path
      videoData.thumbnail = path.posix.join('/', req.files.thumbnail[0].path).replace(/\\/g, '/');
    }

    // console.log('Updated Video Data Before Save:', videoData);

    // Save the updated video data
    await videoData.save((err, updatedVideo) => {
      if (err) {
        // console.error('Error saving video data:', err);
        return res.status(500).json({ success: false, message: 'Error saving video data' });
      }
      // console.log('Updated Video Data After Save:', updatedVideo);
      res.status(200).json({ success: true, data: updatedVideo });
    });
  } catch (error) {
    // console.error('Error updating video', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete video by ID
const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const videoData = await FileModel_S.findById(videoId);
    if (!videoData) {
        return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // Delete video and thumbnail files
    fs.unlinkSync(path.join(__dirname, '..', '..', videoData.video));
    fs.unlinkSync(path.join(__dirname, '..', '..', videoData.thumbnail));

    await videoData.remove();
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
      // console.error('Error deleting video', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  uploadVideo, getAllVideos , getVideo, getVideoByDevice, updateVideo, deleteVideo
}

