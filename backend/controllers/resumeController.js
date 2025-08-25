const fs = require('node:fs');
const path = require('path');
const Resume = require('../models/Resume');

// Create a new resume
// @route POST /api/resumes
// @access Private
const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        //Default Template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null, 
                previewURL: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    githubLink: '',
                    liveLink: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            interests: [
                '',
            ],
            // theme: 'light',
            // colorPalette: ['#FF0000', '#00FF00', '#0000FF'],
        };

        const newResume = await Resume.create({ userId: req.user._id, title, ...defaultResumeData });
        res.status(201).json(newResume);

    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all resumes
// @route GET /api/resumes
// @access Private
const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes); 
    } catch (error) {
        console.error('Error getting resumes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a specific resume
// @route GET /api/resumes/:id
// @access Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id});
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        console.error('Error getting resume:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a specific resume
// @route PUT /api/resumes/:id
// @access Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        resume.set(req.body);
        await resume.save();
        res.json(resume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a specific resume
// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = req.protocol + '://' + req.get('host');

        if(resume.thumbnailLink){
            const thumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(thumbnailPath)) {
                fs.unlinkSync(thumbnailPath);
            }
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const profilePreviewPath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(profilePreviewPath)) {
                fs.unlinkSync(profilePreviewPath);
            }
        }

        const deleted = await Resume.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Resume not found' });
        } 

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createResume, getUserResumes, getResumeById, updateResume, deleteResume };