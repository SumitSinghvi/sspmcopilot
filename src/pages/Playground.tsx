import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gpt from "../assets/gpt.svg";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Chat from "../components/chat";

export default function Playground({ data }: { data: any }) {
  const [model, setModel] = useState<any>();
  const [instructions, setInstruction] = useState(
    "You’re the product manager Copilot for Social Snowball. You help Geetansh write scopes of a feature, understand the testing scenarios of a feature/sub-feature/bug fix or help them with anything related to the product side of things in Social Snowball."
  );
  const handleChange = (value: any) => {
    setModel(value);
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelect = (item: any) => {
    const { _id, Archive, __v, ...filteredObjects } = item;
    const filteredObjectStr = JSON.stringify(filteredObjects);
    if (selectedItems.includes(filteredObjectStr)) {
      setSelectedItems(
        selectedItems.filter((prevItem) => prevItem !== filteredObjectStr)
      );
    } else {
      setSelectedItems([...selectedItems, filteredObjectStr]);
    }
  };
  // console.log(instructions + selectedItems)
  // console.log(selectedItems)
  return (
    <div className="flex flex-1">
      <div className="px-8 py-4">
        <div className="flex gap-1 p-2">
          <img src={gpt} alt="gpt" />
          <h1>PM Copilot</h1>
        </div>
        <h1 className="text-gray-400 p-2">Instructions</h1>
        <Textarea
          onChange={(e) => setInstruction(e.target.value)}
          value={instructions + selectedItems}
          className="border-white h-auto min-h-60 w-[256px] outline-none resize-none"
        />
        <h1 className="p-2">Model</h1>
        <Select value={model} onValueChange={handleChange}>
          <SelectTrigger className="text-white">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="text-white">
            <SelectItem value="Feature">gpt-3.5 turbo</SelectItem>
            <SelectItem value="Sub-Feature">gpt-4 turbo</SelectItem>
            <SelectItem value="Func">gpt-4o</SelectItem>
          </SelectContent>
        </Select>
        {data.map((item: any, index: any) => {
          const { _id, Archive, __v, ...filteredObjects } = item;
          const filteredObjectStr = JSON.stringify(filteredObjects);
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedItems.includes(filteredObjectStr)}
                onChange={() => handleSelect(item)}
              />
              <label>{item.Name}</label>
            </div>
          );
        })}
      </div>
      <div className="px-12 text-sm border-l py-8 h-screen flex flex-col flex-1">
        <Chat instructions={instructions + selectedItems} model={model} />
      </div>
    </div>
  );
}
