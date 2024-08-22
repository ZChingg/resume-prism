import { forwardRef } from "react";

const ResumeTemplate = forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    return (
      <div className="w-1/2 bg-gray-500 flex justify-center overflow-auto h-full items-start">
        <div
          ref={ref}
          className="bg-white mt-8 m-10 p-7 shadow-lg justify-center"
          style={{
            width: "595px",
            minHeight: "842px",
            height: "auto",
          }}
        >
          <div className="flex items-center space-x-8">
            <p className="font-bold text-2xl mb-4">{data.name}</p>
            {/* <div className="bg-purple-500 text-white text-2xl w-16 h-16 rounded-full flex items-center justify-center mb-4"></div> */}
          </div>
          <div className="flex">
            {/* 主內容 */}
            <div className="w-3/4">
              {/* 簡歷 */}
              {data.profile && (
                <div className="mt-2 text-xs">
                  <h2 className="font-bold text-base mb-1">Profile</h2>
                  <p>{data.profile}</p>
                </div>
              )}
              {/* 學歷 */}
              {data.education && data.education.length > 0 && (
                <div className="mt-4 text-xs">
                  <h2 className="font-bold text-base mb-1">Education</h2>
                  {data.education.map((data: any, index: number) => (
                    <div key={index} className="mt-1">
                      <h3 className="font-bold">
                        {data.school},<span className="ml-5">{data.major}</span>
                        <span className="ml-3">{data.degree}</span>
                      </h3>
                      <p className="text-2xs text-gray-400 font-bold">{`${data.startDate} ~ ${data.endDate}`}</p>
                      <p>{data.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {/* 工作經驗 */}
              {data.job && data.job.length > 0 && (
                <div className="mt-4 text-xs">
                  <h2 className="font-bold text-base mb-1">Job History</h2>
                  {data.job.map((data: any, index: number) => (
                    <div key={index} className="mt-2">
                      <h3 className="font-bold">
                        {data.position},
                        <span className="ml-5">{data.company}</span>
                      </h3>
                      <p className="text-2xs text-gray-400 font-bold">{`${data.startDate} ~ ${data.endDate}`}</p>
                      <p>{data.description}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-5"></div>
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
              {data.skill && data.skill.length > 0 && (
                <div className="mt-6 text-xs">
                  <h2 className="font-bold mb-1">Skills</h2>
                  {data.skill.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <span className="break-words">{skill.name}</span>
                        <span className="text-2xs break-words">
                          {skill.level}
                        </span>
                      </div>
                      {skill.description && (
                        <div className="text-2xs text-gray-400 break-words mb-1">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate"; // 添加 displayName

export default ResumeTemplate;
