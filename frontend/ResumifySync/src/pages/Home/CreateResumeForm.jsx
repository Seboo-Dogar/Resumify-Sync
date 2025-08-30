import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


function CreateResumeForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if(!title) {
      setError('Title is required.');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {title});

      if(response.data?._id) {
        navigate(`/resume/${response.data?._id}`);

      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }else {
        setError('An error occurred. Please try again.');
      }
    }
  }

  return (
    <div className='w-[90vw] md:w-[70vw] flex flex-col items-center justify-center p-7'>
      <h3 className='text-2xl font-semibold text-black'>Create New Resume</h3>
      <p className='text-sm text-slate-700 mt-[5px] mb-3'>Give your resume a title to start. You can always change this all later.</p>

      <form onSubmit={handleCreateResume}>
        <Input type='text' placeholder="Eg: Seboo's Resume" label='Resume Title:' value={title} onChange={(e) => setTitle(e.target.value)} />
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button className='btn-primary' type='submit'>Create Resume</button>
      </form>
    </div>
  )
}

export default CreateResumeForm;