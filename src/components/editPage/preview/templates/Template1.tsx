import { forwardRef } from "react";
import Image from "next/image";
import { ResumeData } from "@/components/types";
import { poppins } from "@/app/font";

const Template1 = forwardRef<HTMLDivElement, { data: ResumeData }>(
  ({ data }, ref) => {
    const languageLevels: Record<string, number> = {
      Beginner: 30,
      Basic: 70,
      "Professional proficiency": 80,
      Proficiency: 90,
      "Native Language": 100,
    };

    const skillLevels: Record<string, number> = {
      Novice: 20,
      Beginner: 40,
      Skillful: 60,
      Experienced: 80,
      Expert: 100,
    };

    return (
      <div
        className={`bg-white template p-7 text-2xs ${poppins.className}`}
        style={{
          width: "595px",
          height: "842px",
        }}
      >
        <div className="h-full overflow-hidden">
          <div className="flex items-center space-x-4 mb-3">
            {data.photoURL && (
              <div className="w-14 h-14">
                <Image
                  src={data.photoURL}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <p className="font-bold text-xl">{data.name}</p>
          </div>
          <div className="flex">
            {/* 主內容 */}
            <div className="w-3/4 space-y-5 mt-2">
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
              {/* 學歷、工作經驗、競賽 */}
              {data.sectionOrder?.map((section: string) => {
                if (section === "education" && data.education.length > 0) {
                  return (
                    <div key={section}>
                      <h2 className="font-bold text-sm">Education</h2>
                      {data.education.map((edu: any, index: number) => (
                        <div key={index} className="mt-1">
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

                if (
                  section === "award" &&
                  data.award &&
                  data.award.length > 0
                ) {
                  return (
                    <div key={section}>
                      <h2 className="font-bold text-sm">Awards</h2>
                      {data.award.map((awd: any, index: number) => (
                        <div key={index} className="mt-1">
                          <h3 className="font-bold">{awd.name}</h3>
                          <p className="text-gray-400 text-3xs">{awd.date}</p>
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

                return null;
              })}
            </div>
            {/* 側邊欄 */}
            <div className="w-1/4 pl-5 mt-8 space-y-5">
              <div>
                <p>{data.birthDate}</p>
                <p>{data.phone}</p>
                <p className="break-words">{data.email}</p>
              </div>
              {/*<p className="break-words">
                <a
                  href={data.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <span>{data.website}</span>
                  <IoLinkOutline />
                </a>
              </p>*/}

              {/* 專業技能、興趣、語言、證照 */}
              {data.sectionOrder?.map((section: string) => {
                if (
                  section === "skill" &&
                  data.skill &&
                  data.skill.length > 0
                ) {
                  return (
                    <div key={section}>
                      <h2 className="font-bold mb-1">Skills</h2>
                      {data.skill.map((skill: any, index: number) => (
                        <div key={index} className="mb-1">
                          <p className="break-words">{skill.name}</p>
                          {skill.level && (
                            <div className="h-3 flex items-center">
                              <div className="w-full bg-gray-200 rounded h-0.5">
                                <div
                                  className="h-0.5 rounded"
                                  style={{
                                    width: `${skillLevels[skill.level]}%`,
                                    backgroundColor: data.selectedColor,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
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
                      <h2 className="font-bold mb-1">Hobbies</h2>
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
                      <h2 className="font-bold mb-1">Languages</h2>
                      {data.language.map((language: any, index: number) => (
                        <div key={index} className="mb-1">
                          <p className="break-words">{language.name}</p>
                          {(language.certificate || language.level) && (
                            <p className="break-words text-gray-400 space-x-1">
                              <span>{language.certificate}</span>
                              <span>{language.level}</span>
                            </p>
                          )}
                          {language.proficiency && (
                            <div className="h-3 flex items-center">
                              <div className="w-full bg-gray-200 rounded h-0.5 mt-0.5">
                                <div
                                  className="h-0.5 rounded"
                                  style={{
                                    width: `${
                                      languageLevels[language.proficiency]
                                    }%`,
                                    backgroundColor: data.selectedColor,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
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
                      <h2 className="font-bold mb-1">Certifications</h2>
                      {data.certification.map(
                        (certification: any, index: number) => (
                          <div key={index} className="mb-1">
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
      </div>
    );
  }
);

Template1.displayName = "Template1"; // 添加 displayName

export default Template1;
