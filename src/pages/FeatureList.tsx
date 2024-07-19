import { FeatureFormModal } from "@/components/FeatureFormModal";
import FeatureListTable from "@/components/FeatureListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/components/use-store-modal";
import { getData } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FeatureList() {
  const storeModal = useStoreModal();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.filter((item: any) => item.Archive == false));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-[1350px] h-screen pl-[118px] pt-[88px]">
      <FeatureFormModal storeModal={storeModal} />
      <h1 className="text-xl px-[33px] pt-[33px]">Welcome Back!</h1>
      <p className="px-[33px] text-sm text-gray-400">
        Here's a list of features and sub-features for Social Snowball
      </p>   
      <div className="p-[33px]">
        <div className="flex py-[10px]">
          <Input
            type="text"
            className="w-[250px] px-[33px]"
            placeholder="Filter features.."
          />
          <Button
            variant="secondary"
            className="ml-auto"
            onClick={storeModal.onOpen}
          >
            Add New
          </Button>
        </div>
        {data && <FeatureListTable data={data} />}
      </div>
    </div>
  );
}
