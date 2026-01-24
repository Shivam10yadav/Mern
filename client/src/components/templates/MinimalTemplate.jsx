import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
     console.log('🎨 MinimalTemplate - Accent Color:', accentColor);
    console.log('🎨 MinimalTemplate - Type:', typeof accentColor);
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-light mb-4 tracking-wide">
                    {data.personal_info?.fullname || "Your name"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
            {data.personal_info?.email && (
              <div className="flex items-center gap-1.5">
                       <Mail className="size-4 flex-shrink-0 mt-0.5" />
                       <a 
                           href={`mailto:${data.personal_info.email}`}
                           className="break-all text-xs leading-relaxed text-black hover:text-black hover:underline"
                       >
                           {data.personal_info.email}
                       </a>
               
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <a href={data.personal_info.linkedin} className="flex items-center gap-1.5">
                <Linkedin className="size-3.5" />
                <span className="break-all">
                  {data.personal_info.linkedin.replace("https://www.", "")}
                </span>
              </a>
            )}
            {data.personal_info?.website && (
              <a href={data.personal_info.website} className="flex items-center gap-1.5">
                <Globe className="size-3.5" />
                <span className="break-all">
                  {data.personal_info.website.replace("https://", "")}
                </span>
              </a>
            )}
          </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className="text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 
                        className="text-sm uppercase tracking-widest mb-6 font-medium" 
                        style={{ color: accentColor || '#4F46E5' }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
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
                <section className="mb-10">
                    <h2 
                        className="text-sm uppercase tracking-widest mb-6 font-medium" 
                        style={{ color: accentColor || '#4F46E5' }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                               <h3 className="text-lg font-medium pr-5">{proj.name} <span className="ml-2">{proj.type}</span></h3>
                                 
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 
                        className="text-sm uppercase tracking-widest mb-6 font-medium" 
                        style={{ color: accentColor || '#4F46E5' }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 
                        className="text-sm uppercase tracking-widest mb-6 font-medium" 
                        style={{ color: accentColor || '#4F46E5' }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;