const ResumeTemplate = ({ data }: { data: any }) => {
  return (
    <div className="p-4 border border-gray-300 rounded shadow">
      <h1 className="text-2xl font-bold">
        {data.name}
      </h1>
      <p>{data.email}</p>
      <p>{data.phone}</p>
      {/* 其他字段... */}
    </div>
  );
};

export default ResumeTemplate;
