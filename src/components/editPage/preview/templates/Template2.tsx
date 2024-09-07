import { forwardRef } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { ResumeData } from "@/components/types";
import { poppins } from "@/app/font";

const Template2 = forwardRef<HTMLDivElement, { data: ResumeData }>(
  ({ data }, ref) => {
    return (
      <div
        className={`bg-white template text-2xs pb-6 ${poppins.className}`}
        style={{
          width: "595px",
          height: "842px",
        }}
      >
        <div className="overflow-hidden h-full">
          <div
            className="flex flex-col items-center pt-5 pb-3 text-white"
            style={{ backgroundColor: data.selectedColor }}
          >
            {/* 上方欄 */}
            {data.photoURL && (
              <div className="w-12 h-12 mb-1">
                <Image
                  src={data.photoURL}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <p className="font-bold text-xl">{data.name}</p>
            <hr className="w-full mt-4 mb-2 border-white opacity-20" />
            <div className="flex space-x-8 text-3xs">
              <p>{data.birthDate}</p>
              <p>{data.phone}</p>
              <p>{data.email}</p>
            </div>
          </div>
          {/* 主內容 */}
          <div className="px-8 pt-6 bg-white space-y-4">
            {/* 簡歷 */}
            {data.profile && data.profile !== "<p><br></p>" && (
              <div>
                <h2 className="font-bold text-sm mb-1">Profile</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.profile,
                  }}
                />
              </div>
            )}
            {data.sectionOrder?.map((section: string) => {
              if (section === "education" && data.education.length > 0) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm">Education</h2>
                    {data.education.map((edu: any, index: number) => (
                      <div key={index} className="mt-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">
                            {edu.school}
                            {(edu.major || edu.degree) && ","}
                            <span className="mx-3">{edu.major}</span>
                            <span>{edu.degree}</span>
                          </h3>
                          <p className="text-gray-400 text-3xs">
                            {edu.startDate && <span>{edu.startDate}</span>}
                            {(edu.startDate || edu.endDate) && " ~ "}
                            {edu.endDate && <span>{edu.endDate}</span>}
                          </p>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: edu.description,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              if (section === "job" && data.job.length > 0) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm">Job History</h2>
                    {data.job.map((job: any, index: number) => (
                      <div key={index} className="mt-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">
                            {job.position}
                            {job.company && ","}
                            <span className="ml-3">{job.company}</span>
                          </h3>
                          <p className="text-gray-400 text-3xs">
                            {job.startDate && <span>{job.startDate}</span>}
                            {(job.startDate || job.endDate) && " ~ "}
                            {job.endDate && <span>{job.endDate}</span>}
                          </p>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: job.description,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              if (section === "award" && data.award && data.award.length > 0) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm">Awards</h2>
                    {data.award.map((awd: any, index: number) => (
                      <div key={index} className="mt-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{awd.name}</h3>
                          <p className="text-gray-400 text-3xs">{awd.date}</p>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: awd.description,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                );
              }
              if (section === "skill" && data.skill && data.skill.length > 0) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm mb-1">Skills</h2>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                      {data.skill.map((skill: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <p className="break-words">{skill.name}</p>
                          {skill.level && <div>{skill.level}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (
                section === "hobby" &&
                data.hobby &&
                data.hobby !== "<p><br></p>"
              ) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm mb-1">Hobbies</h2>
                    <div
                      className="space-y-1"
                      dangerouslySetInnerHTML={{
                        __html: data.hobby,
                      }}
                    />
                  </div>
                );
              }

              if (
                section === "language" &&
                data.language &&
                data.language.length > 0
              ) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm mb-1">Languages</h2>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                      {data.language.map((language: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between">
                            <p className="break-words">{language.name}</p>
                            {language.proficiency && (
                              <p>{language.proficiency}</p>
                            )}
                          </div>
                          {(language.certificate || language.level) && (
                            <div className="break-words text-gray-400 space-x-1">
                              <span>{language.certificate}</span>
                              <span>{language.level}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (
                section === "certification" &&
                data.certification &&
                data.certification.length > 0
              ) {
                return (
                  <div key={section}>
                    <h2 className="font-bold text-sm mb-1">Certifications</h2>
                    {data.certification.map(
                      (certification: any, index: number) => (
                        <div key={index} className="mb-1 flex justify-between">
                          <p className="break-words">{certification.name}</p>
                          <p className="break-words text-gray-400 text-3xs">
                            {certification.date}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
);

Template2.displayName = "Template2";

export default Template2;
