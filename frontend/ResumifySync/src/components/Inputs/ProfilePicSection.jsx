import React, { useRef, useState } from 'react';
import { LuUser, LuUpload , LuTrash  } from "react-icons/lu";
import Input from './Input';

const ProfilePicSection = ({profilePic, setProfilePic, preview, setPreview}) => {
    const inputRef =  useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);

            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview);
            }
            setPreviewURL(preview);
        }
    };

    const handleRemoveImage = () => {
        setProfilePic(null);
        if(setPreview){
            setPreview(null);
        }
        setPreviewURL(null);
    };

    const onClickUpload = () => {
        
        if(inputRef.current) {
            inputRef.current.click();
        }
    }

  return (
    <div className='flex justify-center mb-6'>
        <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImgChange}
            className="hidden"
        />

        {!profilePic ? (
            <div className='w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center cursor-pointer relative'>
                <LuUser className='text-4xl text-purple-500' />
                <button type='button' className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={onClickUpload}><LuUpload /></button>
            </div>
        ):(
            <div className='relative'>
                <img 
                    src={previewURL || preview} 
                    alt="Profile Photo" 
                    className='w-20 h-20 rounded-full object-cover'
                />
                <button 
                    type='button' 
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePicSection