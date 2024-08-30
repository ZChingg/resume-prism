import { forwardRef } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

const Template2 = forwardRef<HTMLDivElement, { data: any }>(({ data }, ref) => {
  return (
    <div className="w-1/2 bg-gray-500 flex justify-center overflow-auto h-full items-start">
      <div
        ref={ref}
        className="bg-white mt-8 m-10 shadow-lg justify-center rounded"
        style={{
          width: "595px",
          minHeight: "842px",
          height: "auto",
        }}
      >
        <div
          className="flex flex-col items-center pt-5 pb-2 text-white rounded-t"
          style={{ backgroundColor: "#303030" }}
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
          <div className="flex space-x-8">
            <p className="flex space-x-2 items-center">
              <FaUser className="w-2 h-2" />
              <span className="text-xs">{data.birthDate}</span>
            </p>
            <p className="flex space-x-2 items-center">
              <FaPhoneAlt className="w-2 h-2" />
              <span className="text-xs">{data.phone}</span>
            </p>
            <p className="flex space-x-2 items-center">
              <IoMailSharp className="w-3 h-3" />
              <span className="text-xs">{data.email}</span>
            </p>
          </div>
        </div>
        {/* 主內容 */}
        <div className="px-10 py-6">
          {/* 簡歷 */}
          {data.profile && (
            <div className="text-xs">
              <h2 className="font-bold text-base mb-1">Profile</h2>
              <p>{data.profile}</p>
            </div>
          )}
          {data.sectionOrder?.map((section: string) => (
            <div key={section}>
              {/* 學歷 */}
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
                      <p>{data.description}</p>
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
                      <p>{data.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {/* 專業技能 */}
              {section === "skill" && data.skill.length > 0 && (
                <div className="mt-4 text-xs">
                  <h2 className="font-bold text-base mb-1">Skills</h2>
                  <div className="grid grid-cols-2 gap-x-12">
                    {data.skill.map((skill: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between">
                          <span className="break-words">{skill.name}</span>
                          <span className="break-words text-gray-500">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Template2.displayName = "Template2";

export default Template2;
