import React from 'react';
import Input from '../../../components/Inputs/Input';

const ContactInfoForm = ({contactInfo, updateSection}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className="text-lg  font-semibold text-gray-900">
            Contact Information
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='col-span-2'>
                <Input
                    value={contactInfo?.location || ""}
                    onChange={({ target }) => updateSection("location", target.value)}
                    label="Address"
                    placeholder="ABC City, Country"
                    type="text"
                />
            </div>

            <Input
                value={contactInfo?.email || ""}
                onChange={({ target }) => updateSection("email", target.value)}
                label="Email"
                placeholder="john@example.com"
                type="email"
            />

            <Input
                value={contactInfo?.phone || ""}
                onChange={({ target }) => updateSection("phone", target.value)}
                label="Phone Number"
                placeholder="123-456-7890"
                type="text"
            />

            <Input
                value={contactInfo?.linkedin || ""}
                onChange={({ target }) => updateSection("linkedin", target.value)}
                label="LinkedIn"
                placeholder="https://www.linkedin.com/in/johndoe"
                type="text"
            />

            <Input
                value={contactInfo?.github || ""}
                onChange={({ target }) => updateSection("github", target.value)}
                label="GitHub"
                placeholder="https://github.com/johndoe"
                type="text"
            />

            <div className='md:col-span-2'>
                <Input
                    value={contactInfo?.website || ""}
                    onChange={({ target }) => updateSection("website", target.value)}
                    label="Portfolio / Website"
                    placeholder="https://yourwebsite.com"    
                    type="text"
                />
            </div>
        </div>
    </div>
  );
};

export default ContactInfoForm;