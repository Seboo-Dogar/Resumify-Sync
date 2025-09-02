import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LuArrowLeft, LuArrowRight, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import StepProgress from '../../components/StepProgress';
import ProfileInforForm from './Forms/ProfileInforForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationalDetailsForm from './Forms/EducationalDetailsForm';
import SkillsForm from './Forms/SkillsForm';
import ProjectsForm from './Forms/ProjectsForm';

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("projects");
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
  const renderForm = () => {
    switch(currentPage) {
      case "profile-info":
        return(
          <ProfileInforForm 
            profileData={resumeData.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return(
          <ContactInfoForm 
            contactInfo={resumeData.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "work-experience":
        return(
          <WorkExperienceForm 
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("workExperience", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("workExperience", index);
            }}
            
          />
        );

      case "educational-info":
        return(
          <EducationalDetailsForm 
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("education", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("education", index);
            }}
          />
        );

      case "skills":
        return(
          <SkillsForm 
            skills={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("skills", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("skills", index);
            }}
          />
        );

      case "projects":
        return(
          <ProjectsForm 
            projects={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("projects", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("projects", index);
            }}
          />
        );

      default:
        return null;
    }
  }

  //function to update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      }
    }));
  }

  //function to update array item(like workExperience[0], skills[0], etc.)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prevState) => {
      const updatedArray =[...prevState[section]];

      if (key === null){
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...prevState[section][index],
          [key]: value
        }
      }

      return {
        ...prevState,
        [section]: updatedArray
      }
    });
  }

  //function to add array item
  const addArrayItem = (section, newItem) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], newItem]
    }))
  }

  //function to remove array item
  const removeArrayItem = (section, index) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]]
      updatedArray.splice(index, 1);

      return {
        ...prevState,
        [section]: updatedArray
      }
    })
  }

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

          <div className='flex items-center gap-4'>
            <button className='btn-small-light' onClick={() => setOpenThemeSelector(true)}>
              <LuPalette className='text-[16px]'/>
              <span className='hidden md:block'>Change Theme</span>
            </button>
            <button className='btn-small-light' onClick={deleteResume}>
              <LuTrash2 className='text-[16px]'/>
              <span className='hidden md:block'>Delete</span>
            </button>
            <button className='btn-small-light' onClick={() => setOpenPreviewModal(true)}>
              <LuDownload className='text-[16px]'/>
              <span className='hidden md:block'>Preview & Download</span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>
            <StepProgress progress={progress} />
            {renderForm()}

            <div className='mx-5'>
              {errorMsg && (
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounder'>
                  <LuCircleAlert className='text-md'/> {errorMsg}
                </div>
              )}

              <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
                <button className='btn-small-light' onClick={gotoPreviousPage} disabled={isLoading}>
                  <LuArrowLeft className='text-[16px]'/> Back
                </button>
                <button className='btn-small-light' onClick={uploadResumeImages} disabled={isLoading}>
                  <LuSave className='text-[16px]'/>
                  {isLoading ? "Uploading..." : "Save & Exit"}
                </button>
                <button className='btn-small' onClick={validateAndNext} disabled={isLoading}>
                  {currentPage === "addictionalInfo" && (<LuDownload className='text-[16px]'/>)}
                  {currentPage === "addictionalInfo" ? "Preview & Download" : "Next"}
                  {currentPage !== "addictionalInfo" && (<LuArrowLeft className='text-[16px] rotate-180' />)}
                </button>
              </div>
            </div>
          </div>

          <div className='h-[100vh]' ref={resumeRef}>
            {/* Resume Template */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume