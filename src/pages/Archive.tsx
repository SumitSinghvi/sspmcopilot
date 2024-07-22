import FeatureListTable from "@/components/FeatureListTable";

export default function Archive({data} : {data : any}) {
  return (
    <div className="flex flex-col w-[1350px] h-screen pl-[118px] pt-[88px]">
      <h1 className="text-xl px-[33px] pt-[33px]">Archived</h1>
      <p className="px-[33px] text-sm text-gray-400">
        Here’s a list of archived features and sub-features for Social Snowball
      </p>
      <div className="p-[33px]">
        {data && <FeatureListTable data={data} />}
      </div>
    </div>
  );
}
