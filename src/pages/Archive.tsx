import FeatureListTable from "@/components/FeatureListTable";
import { getData } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Archive() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.filter((item: any) => item.Archive == true));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
