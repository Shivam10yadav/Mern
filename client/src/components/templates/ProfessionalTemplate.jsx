import React from "react";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full bg-white text-gray-900 p-9 text-[13px] leading-normal">
      {/* Header */}
      <div className="text-center mb-3 pb-2" style={{ borderBottom: `1px solid ${accentColor}` }}>
        <h1 className="text-[34px] font-bold uppercase tracking-wide ">
          {data.personal_info?.fullname || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mb-1">
          {data.personal_info?.location}
        </p>

        <div className="flex justify-center gap-4 flex-wrap text-[13px]">
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4 flex-shrink-0 mt-0.5" />
              <a 
                href={`mailto:${data.personal_info.email}`}
                className="break-all text-xs leading-relaxed text-black hover:text-black hover:underline"
              >
                {data.personal_info.email}
              </a>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              className="flex items-center gap-1.5"
            >
              <div className="flex items-center gap-1">
                <Linkedin className="size-4" />
                <span className="break-all">
                  {data.personal_info.linkedin.replace("https://www.", "")}
                </span>
              </div>
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
      </div>

      {/* Profile */}
      {data.professional_summary && (
        <section className="mb-2">
          <h2 className="text-[16px] font-bold uppercase mb-2" style={{ borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.5rem' }}>
            Profile
          </h2>
          <p className="text-justify wrap-break-word">{data.professional_summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[16px] font-bold uppercase mb-2" style={{ borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.5rem' }}>
            Technical Skills
          </h2>
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {data.skills.join(", ")}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[16px] font-bold uppercase mb-2" style={{ borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.5rem' }}>
            Experience
          </h2>

          <div className="space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{exp.position}</p>
                    <p className="font-semibold text-gray-700">{exp.company}</p>
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <ul className="list-disc list-inside ml-3 mt-1 space-y-1 wrap-break-word">
                  {exp.description
                    ?.split("\n")
                    .map(
                      (line, j) =>
                        line.trim() && (
                          <li key={j}>{line.replace(/^[•\-*]\s*/, "")}</li>
                        ),
                    )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[16px] font-bold uppercase mb-2" style={{ borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.5rem' }}>
            Projects
          </h2>

          <div className="space-y-3">
            {data.project.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="font-bold">{proj.name}</p>
                  <span className="text-gray-600">{proj.type}</span>
                </div>

                <ul className="list-disc list-inside ml-3 mt-1 space-y-1 wrap-break-word">
                  {proj.description
                    .split("\n")
                    .map(
                      (line, j) =>
                        line.trim() && (
                          <li key={j}>{line.replace(/^[•\-*]\s*/, "")}</li>
                        ),
                    )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section>
          <h2 className="text-[16px] font-bold uppercase mb-2" style={{ borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.5rem' }}>
            Education
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="font-bold">{edu.institution}</p>
                  <span className="font-semibold">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
                <p className="font-semibold text-gray-700">{edu.degree}</p>
                {edu.field && (
                  <p className="italic text-gray-600">{edu.field}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;