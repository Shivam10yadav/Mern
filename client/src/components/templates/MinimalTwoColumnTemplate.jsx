import React from "react";
import { Mail, MapPin, Linkedin, Globe, Phone } from "lucide-react";

const MinimalTwoColumnTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const Section = ({ title, children }) => (
    <section className="mb-3">
      <h2 className="text-sm font-bold tracking-wide border-b pb-1 mb-3">
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-black p-6 text-[14px] leading-[1.55]">
      {/* HEADER */}
      <div className="mb-3">
        <h1 className="text-3xl font-bold tracking-wide">
          {data.personal_info?.fullname || "Your Name"}
        </h1>

        <p className="text-[15px] font-medium text-gray-700">
          {data.personal_info?.profession}
        </p>

       <div>
  <h3 className="text-base font-bold  uppercase tracking-wide border-b pb-2 border-white/30">Contact</h3>
  
  <div className="flex flex-wrap gap-4 text-[12.5px] text-black">
    {data.personal_info?.email && (
      <div className="flex items-center gap-2">
        <Mail className="size-4 flex-shrink-0" />
        <a 
          href={`mailto:${data.personal_info.email}`}
          className="break-all text-xs leading-relaxed text-black hover:text-black hover:underline"
        >
          {data.personal_info.email}
        </a>
      </div>
    )}
    
    {data.personal_info?.phone && (
      <div className="flex items-center gap-2">
        <Phone className="size-4 flex-shrink-0" />
        <span className="text-xs">{data.personal_info.phone}</span>
      </div>
    )}
    
    {data.personal_info?.location && (
      <div className="flex items-center gap-2">
        <MapPin className="size-4 flex-shrink-0" />
        <span className="text-xs leading-relaxed">{data.personal_info.location}</span>
      </div>
    )}
    
    {data.personal_info?.linkedin && (
      <div className="flex items-center gap-2">
        <Linkedin className="size-4 flex-shrink-0" />
        <span className="break-all text-xs leading-relaxed">{data.personal_info.linkedin}</span>
      </div>
    )}
    
    {data.personal_info?.website && (
      <a href={data.personal_info.website} className="flex items-center gap-2">
        <Globe className="size-4 flex-shrink-0" />
        <span className="break-all text-xs">
          {data.personal_info.website.replace("https://", "")}
        </span>
      </a>
    )}
  </div>
</div>
      </div>

      <div className="grid grid-cols-[62%_38%] gap-8">
        {/* LEFT COLUMN */}
        <div>
          {/* PROFESSIONAL SUMMARY */}
          {data.professional_summary && (
            <Section title="Professional Summary">
              <p className="text-gray-700 text-justify wrap-break-word">
                {data.professional_summary}
              </p>
            </Section>
          )}

          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">
                    {exp.position} — {exp.company}
                  </p>
                  <p className="text-[12.5px] text-gray-600 mb-1">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                  <p className="text-gray-700 wrap-break-word">
                    {exp.description}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {/* PROJECTS */}
          {data.project?.length > 0 && (
            <Section title="Projects">
              {data.project.map((proj, i) => (
                <div key={i} className="mb-">
                  <p className="font-semibold">
                    {proj.name}
                    {proj.type && (
                      <span className="ml-2 text-[12px] text-gray-600">
                        ({proj.type})
                      </span>
                    )}
                  </p>
                  <p className="text-gray-700 wrap-break-word">
                    {proj.description}
                  </p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{edu.degree}</p>
                  {edu.field && (
                    <p className="text-[13px]">{edu.field}</p>
                  )}
                  <p className="text-[13px]">{edu.institution}</p>
                  <p className="text-[12.5px] text-gray-600">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border text-[12.5px] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTwoColumnTemplate;
