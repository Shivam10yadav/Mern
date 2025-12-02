import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import Personalform from "../components/Personalform";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeid } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [resumedata, setresumedata] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#000000",
    public: false,
  });
  const [activesectionindex, setactivesectionindex] = useState(0);
  const [removebackground, setremovebackground] = useState(false);

  const loadexistenceresume = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        toast.error("Please login to continue");
        return;
      }

      if (!resumeid) {
        console.error("No resume ID provided");
        return;
      }

      console.log("Fetching resume:", resumeid);

      const { data } = await api.get(`/api/resumes/get/${resumeid}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      console.log("Resume loaded:", data);

      if (data.resume) {
        setresumedata(data.resume);
        document.title = data.resume.title || "Resume Builder";
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      toast.error(error?.response?.data?.message || "Failed to load resume");
    }
  };
const saveResume = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to continue');
      throw new Error('No token');
    }
    
    if (!resumeid) {
      toast.error('Resume ID not found');
      throw new Error('No resume ID');
    }
    
    let updatedResumeData = structuredClone(resumedata);

    
    
    // Remove image if it's a file object
    if(resumedata.personal_info && typeof resumedata.personal_info.image === 'object'){
      delete updatedResumeData.personal_info.image;
    }
    
    const formData = new FormData();
    formData.append('resumeid', resumeid);
    formData.append('resumedata', JSON.stringify(updatedResumeData));
    
    if(removebackground) {
      formData.append('removebackground', 'yes');
    }
    
    if(resumedata.personal_info && typeof resumedata.personal_info.image === 'object') {
      formData.append('image', resumedata.personal_info.image);
    }
    
    const {data} = await api.put('/api/resumes/update', formData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    
    // Don't replace resumedata - just update the image URL if it exists
    if(data.resume.personal_info?.image) {
      setresumedata(prev => ({
        ...prev,
        personal_info: {
          ...prev.personal_info,
          image: data.resume.personal_info.image
        }
      }));
    }
    
    return data.message || 'Resume saved successfully!';
    
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to save resume');
  }
};

  const section = [
    { id: "Personal", name: "Personal Info", icon: User },
    { id: "Summary", name: "Summary ", icon: FileText },
    { id: "Experience", name: "Experience", icon: Briefcase },
    { id: "Education", name: "Education", icon: GraduationCap },
    { id: "Projects", name: "Projects ", icon: Sparkles },
    { id: "Skills", name: "Skills", icon: FolderIcon },
  ];

  const activsection = section[activesectionindex];

  useEffect(() => {
    if (resumeid) {
      loadexistenceresume();
    }
  }, [resumeid]); // Fix: Add resumeid as dependency
const changeResumeVisibility = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to continue');
      return;
    }

    const formData = new FormData();
    formData.append("resumeid", resumeid);
    formData.append(
      "resumedata",
      JSON.stringify({ public: !resumedata.public })
    );

    const { data } = await api.put("/api/resumes/update", formData, {  // ✅ Fixed endpoint
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setresumedata({ ...resumedata, public: !resumedata.public });
   toast.success(
  resumedata.public 
    ? "Resume is now private" 
    : "Resume is now public"
);
    
  } catch (error) {
    console.error("Error changing visibility:", error);
    toast.error(error?.response?.data?.message || "Failed to change visibility");
  }
};




  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeid;

    if (navigator.share) {
      navigator
        .share({ url: resumeUrl, text: "My Resume" })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left panel */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200"
                style={{
                  width: `${
                    (activesectionindex * 100) / (section.length - 1)
                  }%`,
                }}
              />
              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex gap-2 items-center">
                  <TemplateSelector
                    selectedTemplate={resumedata.template}
                    onChange={(template) =>
                      setresumedata((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumedata.accent_color}
                    onChange={(color) =>
                      setresumedata((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {activesectionindex !== 0 && (
                    <button
                      onClick={() =>
                        setactivesectionindex((previndex) =>
                          Math.max(previndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activesectionindex === 0}
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setactivesectionindex((previndex) =>
                        Math.min(previndex + 1, section.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activesectionindex === section.length - 1 && "opacity-50"
                    }`}
                    disabled={activesectionindex === section.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              {/* form */}
              <div className="space-y-6">
                {activsection.id === "Personal" && (
                  <Personalform
                    data={resumedata.personal_info}
                    onChange={(data) =>
                      setresumedata((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removebackground={removebackground}
                    setremovebackground={setremovebackground}
                  />
                )}
                {activsection.id === "Summary" && (
                  <ProfessionalSummary
                    data={resumedata.professional_summary}
                    onChange={(data) =>
                      setresumedata((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setresumedata={setresumedata}
                  />
                )}
                {activsection.id === "Experience" && (
                  <ExperienceForm
                    data={resumedata.experience}
                    onChange={(data) =>
                      setresumedata((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activsection.id === "Education" && (
                  <EducationForm
                    data={resumedata.education}
                    onChange={(data) =>
                      setresumedata((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activsection.id === "Projects" && (
                  <Projects
                    data={resumedata.project}
                    onChange={(data) =>
                      setresumedata((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activsection.id === "Skills" && (
                  <Skills
                    data={resumedata.skills || []}
                    onChange={(data) =>
                      setresumedata((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>
           <button 
  onClick={() => {
    toast.promise(
      saveResume(),
      {
        loading: 'Saving...',
        success: (msg) => msg,
        error: (err) => err.message
      }
    );
  }} 
  className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
>
  Save Changes
</button>
            </div>
          </div>

          {/* right panel */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-10 px-4">
                {resumedata.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-pink-600 ring-pink-300 rounded-lg hover:ring transition-colors"
                >
                  {resumedata.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumedata.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>
            </div>

            <ResumePreview
              data={resumedata}
              template={resumedata.template}
              accentColor={resumedata.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
