import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="w-full min-h-screen bg-white text-gray-800">
            <div className="flex">
                {/* Left Sidebar - 30% */}
                <div className="w-[30%] p-8 text-white" style={{ backgroundColor: accentColor }}>
                    {/* Profile Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2 break-words">
                            {data.personal_info?.fullname || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-lg font-light opacity-90 break-words">
                                {data.personal_info.profession}
                            </p>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="mb-8 space-y-3 text-sm">
                        <h3 className="text-base font-bold mb-4 uppercase tracking-wide border-b pb-2 border-white/30">Contact</h3>
                        {data.personal_info?.email && (
                            <div className="flex items-start gap-2">
                                <Mail className="size-4 flex-shrink-0 mt-0.5" />
                                <a 
                                    href={`mailto:${data.personal_info.email}`}
                                    className="break-all text-xs leading-relaxed text-white hover:text-black hover:underline"
                                >
                                    {data.personal_info.email}
                                </a>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-start gap-2">
                                <Phone className="size-4 flex-shrink-0 mt-0.5" />
                                <span className="text-xs break-words">{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-start gap-2">
                                <MapPin className="size-4 flex-shrink-0 mt-0.5" />
                                <span className="text-xs leading-relaxed break-words">{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-start gap-2">
                                <Linkedin className="size-4 flex-shrink-0 mt-0.5" />
                                <span className="break-all text-xs leading-relaxed">{data.personal_info.linkedin}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-start gap-2">
                                <Globe className="size-4 flex-shrink-0 mt-0.5" />
                                <a 
                                    href={data.personal_info.website} 
                                    className="break-all text-xs leading-relaxed text-white hover:text-black hover:underline"
                                >
                                    {data.personal_info.website.replace("https://", "")}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-base font-bold mb-4 uppercase tracking-wide border-b pb-2 border-white/30">Skills</h3>
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="text-sm bg-white/20 rounded px-3 py-1.5 backdrop-blur break-words">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <div>
                            <h3 className="text-base font-bold mb-4 uppercase tracking-wide border-b pb-2 border-white/30">Education</h3>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-sm">
                                        <p className="font-bold mb-1 break-words">{edu.degree}</p>
                                        {edu.field && <p className="text-xs opacity-90 mb-1 break-words">{edu.field}</p>}
                                        <p className="text-xs opacity-80 mb-1 break-words">{edu.institution}</p>
                                        <div className="flex justify-between text-xs opacity-70 mt-2">
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                            <span>{formatDate(edu.graduation_date)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Main Content - 70% */}
                <div className="w-[70%] p-8">
                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
                                <span className="h-1 w-12 rounded flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                                Profile
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed text-justify break-words whitespace-pre-wrap">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
                                <span className="h-1 w-12 rounded flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                                Experience
                            </h2>

                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="border-l-4 pl-4 pb-3" style={{ borderColor: accentColor }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex-1 min-w-0 pr-4">
                                                <h3 className="font-bold text-base text-gray-900 break-words">{exp.position}</h3>
                                                <p className="text-gray-600 text-sm font-medium break-words">{exp.company}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap flex-shrink-0">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words mt-2">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
                                <span className="h-1 w-12 rounded flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                                Projects
                            </h2>

                            <div className="grid grid-cols-1 gap-3">
                                {data.project.map((proj, index) => (
                                    <div key={index} className="border-l-4 border-gray-300 pl-4 pb-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-base text-gray-900 break-words flex-1 min-w-0 pr-2">{proj.name}</h3>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0" style={{ backgroundColor: accentColor, color: 'white' }}>
                                                {proj.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassicTemplate;