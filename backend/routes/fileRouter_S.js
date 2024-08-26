const express = require('express');
const multer = require('multer');
const path = require('path');
const FileController_S = require('../controllers/fileController_S.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define upload directories
        if (file.fieldname === 'video') {
            cb(null, 'uploads/videos');
        } else if (file.fieldname === 'thumbnail') {
            cb(null, 'uploads/thumbnails');
        } else {
            cb(null, 'uploads');
        }
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
  
// Initialize multer instances
const upload = multer({ storage: storage });

const uploadFields = upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);

router.route('/admin/insert').post(isAuthenticatedUser,authorizeRoles('admin'), uploadFields, FileController_S.uploadVideo);
router.route('/videos').get(FileController_S.getAllVideos);
router.route('/videos/:id').get(FileController_S.getVideo);
router.route('/videos/device/:device').get(FileController_S.getVideoByDevice);
router.route('/admin/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'), uploadFields, FileController_S.updateVideo);
router.route('/admin/delete/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), FileController_S.deleteVideo);
router.route('/decrypt/:id').get(FileController_S.decryptFiles);
router.route('/decrypt/delete/:id').get(FileController_S.deleteDecryptedVideo);

module.exports = router;
