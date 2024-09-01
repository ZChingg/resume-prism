import { forwardRef } from "react";
import Image from "next/image";
import { ResumeData } from "@/components/types";

const Template1 = forwardRef<HTMLDivElement, { data: ResumeData }>(
  ({ data }, ref) => {
    console.log(data);

    return (
      <>
        <div className="p-7 bg-white">
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
            <p className="font-bold text-2xl">{data.name}</p>
          </div>
          <div className="flex">
            {/* 主內容 */}
            <div className="w-3/4">
              {/* 簡歷 */}
              {data.profile && data.profile !== "<p><br></p>" && (
                <div className="mt-2 text-xs">
                  <h2 className="font-bold text-base mb-1">Profile</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.profile,
                    }}
                  />
                </div>
              )}
              {/* 學歷 */}
              {data.sectionOrder?.map((section: string) => (
                <div key={section}>
                  {section === "education" && data.education.length > 0 && (
                    <div className="mt-4 text-xs">
                      <h2 className="font-bold text-base mb-1">Education</h2>
                      {data.education.map((data: any, index: number) => (
                        <div key={index} className="mt-1">
                          <h3 className="font-bold">
                            {data.school}
                            {(data.major || data.degree) && ","}
                            <span className="ml-5">{data.major}</span>
                            <span className="ml-3">{data.degree}</span>
                          </h3>
                          <p className="text-2xs text-gray-400 font-bold">
                            {data.startDate && <span>{data.startDate}</span>}
                            {(data.startDate || data.endDate) && " ~ "}
                            {data.endDate && <span>{data.endDate}</span>}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 工作經驗 */}
                  {section === "job" && data.job.length > 0 && (
                    <div className="mt-4 text-xs">
                      <h2 className="font-bold text-base mb-1">Job History</h2>
                      {data.job.map((data: any, index: number) => (
                        <div key={index} className="mt-1">
                          <h3 className="font-bold">
                            {data.position}
                            {data.company && ","}
                            <span className="ml-5">{data.company}</span>
                          </h3>
                          <p className="text-2xs text-gray-400 font-bold">
                            {data.startDate && <span>{data.startDate}</span>}
                            {(data.startDate || data.endDate) && " ~ "}
                            {data.endDate && <span>{data.endDate}</span>}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 競賽 */}
                  {section === "award" &&
                    data.award &&
                    data.award.length > 0 && (
                      <div className="mt-4 text-xs">
                        <h2 className="font-bold text-base mb-1">Awards</h2>
                        {data.award.map((data: any, index: number) => (
                          <div key={index} className="mt-1">
                            <h3 className="font-bold">
                              {data.name}
                              <span className="ml-5">{data.company}</span>
                            </h3>
                            <p className="text-2xs text-gray-400 font-bold">
                              {data.date}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
            {/* 側邊欄 */}
            <div className="w-1/4 pl-5 mt-9">
              <p className="text-xs">{data.birthDate}</p>
              <p className="text-xs">{data.phone}</p>
              <p className="text-xs break-words">{data.email}</p>
              {/*<p className="text-xs break-words">
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

              {/* 專業技能 */}
              {data.sectionOrder?.map((section: string) => (
                <div key={section}>
                  {section === "skill" &&
                    data.skill &&
                    data.skill.length > 0 && (
                      <div className="mt-6 text-xs">
                        <h2 className="font-bold mb-1">Skills</h2>
                        {data.skill.map((skill: any, index: number) => (
                          <div key={index}>
                            <div className="">
                              <li className="break-words">{skill.name}</li>
                              <p className="text-2xs break-words text-gray-400 ml-4">
                                {skill.level}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  {/* 興趣 */}
                  {section === "hobby" &&
                    data.hobby &&
                    data.hobby !== "<p><br></p>" && (
                      <div className="mt-6 text-xs">
                        <h2 className="font-bold mb-1">Hobbies</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.hobby,
                          }}
                        />
                      </div>
                    )}
                  {/* 語言 */}
                  {section === "language" &&
                    data.language &&
                    data.language.length > 0 && (
                      <div className="mt-6 text-xs">
                        <h2 className="font-bold mb-1">Languages</h2>
                        {data.language.map((language: any, index: number) => (
                          <div key={index}>
                            <div className="">
                              <li className="break-words">{language.name}</li>
                              <p className="text-2xs break-words text-gray-400 ml-4">
                                {language.proficiency}
                              </p>
                              <p className="text-2xs break-words text-gray-400 ml-4">
                                {language.certificate}
                                <span className="text-2xs break-words text-gray-400 ml-1">
                                  {language.level}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  {section === "certification" &&
                    data.certification &&
                    data.certification.length > 0 && (
                      <div className="mt-6 text-xs">
                        <h2 className="font-bold mb-1">Certifications</h2>
                        {data.certification.map(
                          (certification: any, index: number) => (
                            <div key={index}>
                              <div className="">
                                <p className="break-words">
                                  {certification.name}
                                </p>
                                <p className="text-2xs break-words text-gray-400">
                                  {certification.date}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
);

Template1.displayName = "Template1"; // 添加 displayName

export default Template1;
