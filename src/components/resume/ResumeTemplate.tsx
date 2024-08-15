import { IoLinkOutline } from "react-icons/io5";

export default function ResumeTemplate({ data }: { data: any }) {
  return (
    <>
      <div className="flex items-center space-x-8">
        <p className="font-bold text-2xl mb-4">{data.name}</p>
        {/* <div className="bg-purple-500 text-white text-2xl w-16 h-16 rounded-full flex items-center justify-center mb-4"></div> */}
      </div>
      <div className="flex">
        {/* 主內容 */}
        <div className="w-3/4">
          {/* 簡歷 */}
          <div className="mt-2 text-xs">
            <h2 className="font-bold text-base mb-1">簡歷</h2>
            <p>{data.profile}</p>
          </div>
          {/* 學歷 */}
          <div className="mt-4 text-xs">
            <h2 className="font-bold text-base mb-1">學歷</h2>
            {data.education.map((data: any, index: number) => (
              <div key={index} className="mt-1">
                <h3 className="font-bold">
                  {data.school},<span className="ml-5">{data.major}</span>
                  <span className="ml-3">{data.degree}</span>
                </h3>
                <p className="text-xs text-gray-400">{`${data.startDate} ~ ${data.endDate}`}</p>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
          {/* 工作經驗 */}
          <div className="mt-4 text-xs">
            <h2 className="font-bold text-base mb-1">工作經驗</h2>
            {data.experience.map((data: any, index: number) => (
              <div key={index} className="mt-2">
                <h3 className="font-bold">
                  {data.position},<span className="ml-5">{data.company}</span>
                </h3>
                <p className="text-xs text-gray-400">{`${data.startDate} ~ ${data.endDate}`}</p>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 側邊欄 */}
        <div className="w-1/4 pl-8">
          <p className="text-xs mt-10">{data.birthDate}</p>
          <p className="text-xs">{data.phone}</p>
          <p className="text-xs">{data.email}</p>
          <p className="text-xs">
            <a
              href={data.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1"
            >
              <span>{data.website}</span>
              <IoLinkOutline />
            </a>
          </p>
          {/* 專業技能 */}
          <div className="mt-6 text-xs">
            <h2 className="font-bold mb-1">專業技能</h2>
            {data.skill.map((data: any, index: number) => (
              <p key={index} className="flex justify-between ">
                <p>{data.name}</p>
                <p>{data.level}</p>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
