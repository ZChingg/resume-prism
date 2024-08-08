export default function ResumeTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 border border-gray-300 rounded shadow-lg">
      <div className="text-center">
        <div className="bg-purple-500 text-white text-2xl w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
          {data.name[0]}
        </div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-lg">{data.email}</p>
        <p className="text-lg">{data.phone}</p>
        <p className="text-lg">
          <a href={data.websiteLink} target="_blank" rel="noopener noreferrer">
            {data.website}
          </a>
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">簡歷</h2>
        <p>{data.profile}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">工作經驗</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mt-4">
            <h3 className="text-lg font-bold">{exp.position}</h3>
            <p className="italic">{exp.company}</p>
            <p>{`${exp.startDate} ~ ${exp.endDate}`}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
