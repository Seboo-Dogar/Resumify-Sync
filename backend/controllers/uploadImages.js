const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');
const upload = require('../middlewares/uploadMiddleware');

const updateResumeImage = async (req, res) => {
    try {
        upload.fields([{ name: 'thumbnail'}, { name: 'profileImage'}])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findById(resumeId);

            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }

            const uploadsFolder = path.join(__dirname, '..', 'uploads');
            const baseUrl = req.protocol + '://' + req.get('host');

            const newThumbnailUrl = req.files.thumbnail ? `${baseUrl}/upload/${req.files.thumbnail[0].filename}` : resume.thumbnailLink;
            const newProfileImageUrl = req.files.profileImage ? `${baseUrl}/upload/${req.files.profileImage[0].filename}` : resume.profileInfo.profilePreviewUrl;

            if (newThumbnailUrl){
                if(resume.thumbnailLink) {
                    const thumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(thumbnailPath)) {
                        fs.unlinkSync(thumbnailPath);
                    }
                }
                resume.thumbnailLink = baseUrl + '/upload/' + req.files.thumbnail[0].filename;
            }
            
            if (newProfileImageUrl){
                if(resume.profileInfo?.profilePreviewUrl) {
                    const profilePreviewPath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                    if (fs.existsSync(profilePreviewPath)) {
                        fs.unlinkSync(profilePreviewPath);
                    }
                }
                resume.profileInfo.profilePreviewUrl = baseUrl + '/upload/' + req.files.profileImage[0].filename;
            }

            await resume.save();
            res.status(200).json({
                message: 'Image updated successfully',
                thumbnailUrl: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl
            });
        });
    } catch (error) {
        console.error('Error uploading resume image:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { updateResumeImage };