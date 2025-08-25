const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        // name: {
        //     type: String,
        //     required: true
        // },
        title: {
            type: String,
            required: true
        },
        thumbnailLink: {
            type: String,
        },
        template: {
            theme: String,
            colorPalette: [String],
        },
        profileInfo: {
            profilePreviewUrl: String,
            fullName: String,
            jobTitle: String,
            designation: String,
            summary: String,
        },
        contactInfo: {
            email: String,
            phone: String,
            address: String,
            website: String,
            linkedin: String,
            github: String,
        },
        workExperience: [
            {
                companyName: String,
                jobTitle: String,
                startDate: Date,
                endDate: Date,
                description: String,
            }
        ],
        education: [
            {
                institutionName: String,
                degree: String,
                startDate: Date,
                endDate: Date,
            }
        ],
        skills: [
            {
                name: String,
                progress: Number,
            }
        ],
        projects: [
            {
                title: String,
                description: String,
                githubLink: String,
                liveLink: String, 
            }
        ],
        certifications: [
            {
                title: String,
                issuer: String,
                issueDate: Date,
            }
        ],
        languages: [
            {
                name: String,
                progress: Number,
            }
        ],
        interests: [String],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

    module.exports = mongoose.model('Resume', ResumeSchema);