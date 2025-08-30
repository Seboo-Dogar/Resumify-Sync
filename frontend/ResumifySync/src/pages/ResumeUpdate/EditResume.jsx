import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink:"",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName:"",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        // description: "",
      }
    ],
    skills: [
      {
        name: "",
        progress: 0,
      }
    ],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        liveLink: "", 
      }
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      }
    ],
    languages: [
      {
        name: "",
        progress: 0,
      }
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //validate Inputs
  const validateAndNext = () => {}

  //function to navigate to next page
  const gotoNextPage = () => {}

  //function to navigate to previous page
  const gotoPreviousPage = () => {}
  
  //function to render form
  const renderForm = () => {}

  //function to update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {}

  //function to update array item(like workExperience[0], skills[0], etc.)
  const updateArrayItem = (section, index, key, value) => {}

  //function to add array item
  const addArrayItem = (section) => {}

  //function to remove array item
  const removeArrayItem = (section, index) => {}

  //function to fetch resume details by id
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));

      if(response.data && response.data.profileInfo) {
        const resumeInfo = response.data;
        
        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled Resume",
          thumbnailLink: resumeInfo?.thumbnailLink || prevState?.thumbnailLink,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          template: resumeInfo?.template || prevState?.template,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.log("Error fetching resume details", error);
    }
  }

  //function to upload resume images/Thumbnail and profile image
  const uploadResumeImages = async () => {}

  //function to delete resume
  const deleteResume = async () => {}

  //download resume
  const reactToPrintFn = useReactToPrint({
    contentRef: () => resumeDownloadRef,
  })

  //function to update base width based on resume container size
  const upadateBaseWidth = () => {}

  useEffect(() => {
    upadateBaseWidth();
    window.addEventListener("resize", upadateBaseWidth);

    if(resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", upadateBaseWidth);
    }
  }, []);

  return (
    <DashboardLayout activeMenu="resume-update" >
      <div className='constainer mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white  rounded-lg border border-purple-100 px-4 py-3 mb-4'>
          <TitleInput 
            title={resumeData.title}
            setTitle={(value) => setResumeData((prevState) => ({...prevState, title: value}))}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume