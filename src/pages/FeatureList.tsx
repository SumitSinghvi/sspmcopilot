import { FeatureFormModal } from "@/components/FeatureFormModal";
import FeatureListTable from "@/components/FeatureListTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/components/use-store-modal";

export default function FeatureList({data} : {data : any}) {
  const storeModal = useStoreModal();
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
