import React, { useEffect } from 'react';
import { useState } from 'react';
import axisosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Modal';

function Dashboard() {
  const navigate = useNavigate();
  const [openCreateResumeModel, setOpenCreateResumeModel] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axisosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.log("Error fetching resumes", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
        <div className='h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg cursor-pointer border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 ' onClick={() => setOpenCreateResumeModel(true)}>
          <div className='w-12 h-12 bg-purple-200/60 rounded-lg flex items-center justify-center'>
            <LuCirclePlus className='text-xl text-purple-500' />
          </div>
          <h3 className='font-medium text-gray-800'>Add New Resume</h3>
        </div>
        {allResumes?.map((resume) => (
          <ResumeSummaryCard key={resume?._id} imgUrl={resume?.thumbnailLink || null} title={resume.title} lastUpdated={resume?.updatedAt ? moment(resume.updatedAt).format("DD MMM YYYY") : ""} onSelect={() => navigate(`/resume/${resume?._id}`)} />
        ))}
      </div>
      
      <Modal isOpen={openCreateResumeModel} onClose={() => setOpenCreateResumeModel(false)} hideHeader title="Create Resume">
        <div className=''>
          <CreateResumeForm />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard;