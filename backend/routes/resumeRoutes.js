const express = require('express');
const { createResume, getUserResumes, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const { updateResumeImage } = require('../controllers/uploadImages');

const router = express.Router();

// Resume Routes
router.post('/', protect, createResume);
router.get('/', protect, getUserResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.put('/:id/upload-images', protect, updateResumeImage);
router.delete('/:id', protect, deleteResume);

module.exports = router;