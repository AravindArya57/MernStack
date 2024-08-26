const FileModel_S = require('../models/fileModel_S');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Encryption function for video files
const encryptFile = async (filePath, secretKey, iv) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  const input = fs.createReadStream(filePath);
  const encryptedFilePath = `${filePath}.enc`;
  const output = fs.createWriteStream(encryptedFilePath);

  input.pipe(cipher).pipe(output);

  return new Promise((resolve, reject) => {
      output.on('finish', () => resolve(encryptedFilePath));
      output.on('error', reject);
  });
}

// Decryption function for video files
const decryptFile = async (encryptedFilePath, secretKey, iv, decryptedFilePath) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  const input = fs.createReadStream(encryptedFilePath);
  // const decryptedFilePath = path.basename(encryptedFilePath, '.enc'); // Remove .enc extension
  const output = fs.createWriteStream(decryptedFilePath);

  input.pipe(decipher).pipe(output);

  return new Promise((resolve, reject) => {
      output.on('finish', () => resolve(decryptedFilePath));
      output.on('error', reject);
  });
}


// upload video content
const uploadVideo = async (req, res) => {
  const { title, description, device, videoMode } = req.body;

  const videoFile = req.files['video'][0];
  const thumbnailFile = req.files['thumbnail'][0]; //path.posix.join('/', ).replace(/\\/g, '/');  

  // Generate encryption key and IV for the video file
  const secretKey = crypto.randomBytes(32); // 32 bytes = 256 bits
  const iv = crypto.randomBytes(16); // 16 bytes for AES

  // Encrypt the video file
  const encryptedFilePath = await encryptFile(videoFile.path, secretKey, iv);

  // Delete the original .mp4 file
  fs.unlink(videoFile.path, (err) => {
    if (err) {
      console.error(`Failed to delete original file: ${err.message}`);
    }
  });

  // Save file information to MongoDB
  const newVideo = new FileModel_S({
      title,
      description,
      device,
      videoMode,
      video: videoFile.path, //videoFile.filename
      videoFilePath: encryptedFilePath,
      videoOriginalName: videoFile.originalname,
      secretKey: secretKey.toString('hex'),
      iv: iv.toString('hex'),
      thumbnail: thumbnailFile.path, // Store the thumbnail file path
  });

  try {
    await newVideo.save();
    res.json({ message: 'Video uploaded successfully', newVideo });
  } catch (err) {
    res.status(500).send(err);
  }
};

// decrypted video function 
const decryptFiles = async (req, res) => {
  try {
      const fileRecord = await FileModel_S.findById(req.params.id);

      if (!fileRecord) {
          return res.status(404).json({ error: 'File not found' });
      }

      const secretKey = Buffer.from(fileRecord.secretKey, 'hex');
      const iv = Buffer.from(fileRecord.iv, 'hex');

      // Define the decrypted file path
      const decryptedDir = path.join(__dirname, '..', '..', 'uploads', 'videos', 'decrypted');
        
      // Ensure the decrypted directory exists
      if (!fs.existsSync(decryptedDir)) {
          fs.mkdirSync(decryptedDir, { recursive: true });
      }

      // Create the full path for the decrypted file
      const decryptedFilePath = path.join(decryptedDir, path.basename(fileRecord.videoFilePath, '.enc'));

      // Decrypt the file and save it in the specified location
      await decryptFile(fileRecord.videoFilePath, secretKey, iv, decryptedFilePath);

      res.json({ decryptedFilePath });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to serve the video file.' });
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

const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const videoData = await FileModel_S.findById(videoId);
    if (!videoData) {
        return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // Construct the absolute paths
    const videoEncFilePath = path.resolve(__dirname, '..', '..', videoData.videoFilePath);
    const videoFilePath = path.resolve(__dirname, '..', '..', videoData.video);
    const thumbnailFilePath = path.resolve(__dirname, '..', '..', videoData.thumbnail);

    // Check if files exist before attempting to delete
    if (fs.existsSync(videoEncFilePath)) {
        fs.unlinkSync(videoEncFilePath);
    } else {
        console.warn(`Video file not found: ${videoEncFilePath}`);
    }

    if (fs.existsSync(videoFilePath)) {
        fs.unlinkSync(videoFilePath);
    } else {
        console.warn(`Video file not found: ${videoFilePath}`);
    }

    if (fs.existsSync(thumbnailFilePath)) {
        fs.unlinkSync(thumbnailFilePath);
    } else {
        console.warn(`Thumbnail file not found: ${thumbnailFilePath}`);
    }

    await videoData.remove();
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
      console.error('Error deleting video', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  uploadVideo, getAllVideos , getVideo, getVideoByDevice, updateVideo, deleteVideo, decryptFiles
}

