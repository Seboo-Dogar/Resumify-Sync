import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationalDetailsForm from "./Forms/EducationalDetailsForm";
import SkillsForm from "./Forms/SkillsForm";
import ProjectsForm from "./Forms/ProjectsForm";
import CertificationsForm from "./Forms/CertificationsForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";

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
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
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
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //validate Inputs
  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;

        if (!fullName.trim()) errors.push("Full name is required.");
        if (!designation.trim()) errors.push("Designation is required.");
        if (!summary.trim()) errors.push("Summary is required.");
        break;
      }

      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          errors.push("Valid Email is required.");
        if (!phone.trim()) errors.push("Phone number is required.");
        break;
      }

      case "work-experience": {
        resumeData.workExperience.forEach((item, index) => {
          const {
            company = "",
            role = "",
            startDate = "",
            endDate = "",
          } = item || {};

          if (!company?.trim())
            errors.push(
              `Company is required for work experience ${index + 1}.`
            );
          if (!role?.trim())
            errors.push(`Role is required for work experience ${index + 1}.`);
          if (!startDate?.trim())
            errors.push(
              `Start date is required for work experience ${index + 1}.`
            );
          if (!endDate?.trim())
            errors.push(
              `End date is required for work experience ${index + 1}.`
            );
        });
        break;
      }

      case "educational-info": {
        resumeData.education.forEach(
          ({ institution, degree, startDate, endDate }, index) => {
            if (!institution?.trim())
              errors.push(`Institution is required ${index + 1}.`);
            if (!degree?.trim())
              errors.push(`Degree is required  ${index + 1}.`);
            if (!startDate?.trim())
              errors.push(`Start date is required ${index + 1}.`);
            if (!endDate?.trim())
              errors.push(`End date is required in education ${index + 1}.`);
          }
        );
        break;
      }

      case "skills":
        console.log("Skills:", resumeData.skills);
        resumeData.skills.forEach(({ skill, progress }, index) => {
          if (!skill.trim())
            errors.push(`Skill name is required for skill ${index + 1}.`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Skills progress must be between 1 to 100 for skill ${index + 1}.`
            );
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required ${index + 1}.`);
          if (!description.trim())
            errors.push(`Description is required for project ${index + 1}.`);
        });
        break;

      case "certification":
        resumeData.certification.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(
              `Certification title is required for certification ${index + 1}.`
            );
          if (!issuer.trim())
            errors.push(`Issuer is required for certification ${index + 1}.`);
        });
        break;

      case "additional-info":
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        ) {
          errors.push("At least one language is required.");
        }
        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("At least one interest is required.");
        }
        break;

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return; // STOP HERE — don't go to next step
    }
    {
      console.log(resumeData);
    }

    //Move to next step
    // Valid input — clear error and go to next step
    setErrorMsg("");
    goToNextStep();
  };

  //function to navigate to next page
  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "educational-info",
      "skills",
      "projects",
      "certifications",
      "additional-info",
    ];

    if (currentPage === "additional-info") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      //set progress as percentage
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //function to navigate to previous page
  const gotoPreviousPage = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "educational-info",
      "skills",
      "projects",
      "certifications",
      "additional-info",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      //update progress
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //function to render form
  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "work-experience":
        return (
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
        return (
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
        return (
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
        return (
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

      case "certifications":
        return (
          <CertificationsForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("certifications", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("certifications", index);
            }}
          />
        );

      case "additional-info":
        return (
          <AdditionalInfoForm
            languages={resumeData?.languages}
            interests={resumeData?.interests}
            updateArrayItem={(section, index, key, value) => {
              updateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => {
              addArrayItem(section, newItem);
            }}
            removeArrayItem={(section, index) => {
              removeArrayItem(section, index);
            }}
          />
        );

      default:
        return null;
    }
  };

  //function to update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  //function to update array item(like workExperience[0], skills[0], etc.)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...prevState[section][index],
          [key]: value,
        };
      }

      return {
        ...prevState,
        [section]: updatedArray,
      };
    });
  };

  //function to add array item
  const addArrayItem = (section, newItem) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], newItem],
    }));
  };

  //function to remove array item
  const removeArrayItem = (section, index) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];
      updatedArray.splice(index, 1);

      return {
        ...prevState,
        [section]: updatedArray,
      };
    });
  };

  //function to fetch resume details by id
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled Resume",
          thumbnailLink: resumeInfo?.thumbnailLink || prevState?.thumbnailLink,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          template: resumeInfo?.template || prevState?.template,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.log("Error fetching resume details", error);
    }
  };

  //function to upload resume images/Thumbnail and profile image
  const uploadResumeImages = async () => {};

  //function to delete resume
  const deleteResume = async () => {};

  //download resume
  const reactToPrintFn = useReactToPrint({
    content: () => resumeDownloadRef.current,
  });

  //function to update base width based on resume container size
  const upadateBaseWidth = () => {};

  useEffect(() => {
    upadateBaseWidth();
    window.addEventListener("resize", upadateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", upadateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout activeMenu="resume-update">
      <div className="constainer mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white  rounded-lg border border-purple-100 px-4 py-3 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({ ...prevState, title: value }))
            }
          />

          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light" onClick={deleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />
            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounder">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={gotoPreviousPage}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" /> Back
                </button>
                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Uploading..." : "Save & Exit"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additional-info" && (
                    <LuDownload className="text-[16px]" />
                  )}
                  {currentPage === "additional-info"
                    ? "Preview & Download"
                    : "Next"}
                  {currentPage !== "additional-info" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="h-[100vh]" ref={resumeRef}>
            {/* Resume Template */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
