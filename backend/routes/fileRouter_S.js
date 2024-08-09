const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FileController_S = require('../controllers/fileController_S.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

const router = express.Router();

// Ensure upload directories exist
const ensureUploadDirectories = () => {
  const uploadPaths = ['uploads/videos', 'uploads/thumbnails'];
  uploadPaths.forEach(dir => {
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
      }
  });
};

ensureUploadDirectories();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      if (file.fieldname === 'video') {
          cb(null, 'uploads/videos/');
      } else if (file.fieldname === 'thumbnail') {
          cb(null, 'uploads/thumbnails/');
      } else {
          cb(new Error('Invalid file field!'), false);
      }
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
      if (file.mimetype.startsWith('video/')) {
          cb(null, true);
      } else {
          cb(new Error('Not a video file!'), false);
      }
  } else if (file.fieldname === 'thumbnail') {
      if (file.mimetype.startsWith('image/')) {
          cb(null, true);
      } else {
          cb(new Error('Not an image file!'), false);
      }
  } else {
      cb(new Error('Invalid file field!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const uploadFields = upload.fields([{ name: 'video' }, { name: 'thumbnail' }]);

router.route('/admin/insert').post(isAuthenticatedUser,authorizeRoles('admin'), uploadFields, FileController_S.uploadVideo);
router.route('/videos').get(FileController_S.getAllVideos);
router.route('/videos/:id').get(FileController_S.getVideo);
router.route('/videos/device/:device').get(FileController_S.getVideoByDevice);
router.route('/admin/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'), uploadFields, FileController_S.updateVideo);
router.route('/admin/delete/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), FileController_S.deleteVideo);

module.exports = router;
