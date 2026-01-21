import { Mail, Phone, MapPin, Linkedin, Globe, BriefcaseBusiness } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <>
      <style>
        {`
          @media print {
            .resume-header {
              background-color: ${accentColor} !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .resume-header * {
              color: white !important;
            }
            .accent-bg {
              background-color: ${accentColor} !important;
            }
            .accent-text {
              color: ${accentColor} !important;
            }
            .accent-border {
              border-left-color: ${accentColor} !important;
            }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto bg-white text-gray-800 text-[13px] leading-snug">

        {/* Header */}
        <header className=" text-white resume-header p-10" style={{ backgroundColor: accentColor }}>
          <h1 className="text-[30px] font-light mb-1 ">
            {data.personal_info.fullname || "Your Name"}
          </h1>

          {data.personal_info?.profession && (
            <div className="flex items-center gap-2 mb-1 ">
              <BriefcaseBusiness className="size-3.5" />
              <span>{data.personal_info.profession}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
            {data.personal_info?.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                <span>{data.personal_info.email}</span>
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

        <div className="p-6">

          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-6">
              <h2 className="text-[17px] font-light mb-2 pb-1 border-b border-gray-200">
                Professional Summary
              </h2>
              <p className="leading-snug">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[17px] font-light mb-3 pb-1 border-b border-gray-200">
                Experience
              </h2>

              <div className="space-y-3">
                {data.experience.map((exp, index) => (
                  <div key={index} className="pl-4 border-l border-gray-200">
                    <div className="flex justify-between items-start mb-0.5">
                      <div>
                        <h3 className="text-[15px] font-medium">
                          {exp.position}
                        </h3>
                        <p className="font-medium accent-text" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[12px] leading-snug mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[17px] font-light mb-2 pb-1 border-b border-gray-200">
                Projects
              </h2>

              <div className="space-y-3">
                {data.project.map((p, index) => (
                  <div key={index} className="pl-4 border-l accent-border" style={{ borderLeftColor: accentColor }}>
                    <h3 className="text-[14px] font-medium">
                      {p.name}
                      <span className="ml-2 text-[12px]" style={{ color: accentColor }}>
                        {p.type}
                      </span>
                    </h3>
                    {p.description && (
                      <p className="text-[12px] leading-snug mt-1">
                        {p.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid sm:grid-cols-2 gap-4">

            {/* Education */}
            {data.education?.length > 0 && (
              <section>
                <h2 className="text-[17px] font-light mb-2 pb-1 border-b border-gray-200">
                  Education
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <p className="font-semibold text-[13px]">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </p>
                      <p className="accent-text text-[12px]" style={{ color: accentColor }}>
                        {edu.institution}
                      </p>
                      <div className="flex justify-between text-[11px] text-gray-600">
                        <span>{formatDate(edu.graduation_date)}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
              <section>
                <h2 className="text-[17px] font-light mb-2 pb-1 border-b border-gray-200">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-[11px] text-white rounded-full accent-bg"
                      style={{ backgroundColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernTemplate;