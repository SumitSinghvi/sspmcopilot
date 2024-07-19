import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gpt from '../assets/gpt.svg';
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRight } from "lucide-react";
import axios from 'axios';
import { generateGPT } from "@/lib/utils";

export default function Playground() {
  const [message, setMessage] = useState<any>();
  const [model, setModel] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [instructions, setInstruction] = useState('You’re the product manager Copilot for Social Snowball. You help Geetansh write scopes of a feature, understand the testing scenarios of a feature/sub-feature/bug fix or help them with anything related to the product side of things in Social Snowball.');
  const handleSubmit = () => {
      const data = {
        message,
        model,
        instructions
      }
      const result = generateGPT(data);
      setResponse(result);
  }
  return (
    <div className="flex flex-1">
      <div className="px-8 py-4">
        <div className="flex gap-1 p-2">
          <img src={gpt} alt="gpt" /> 
          <h1>PM Colpilot</h1>
        </div>
        <h1 className="text-gray-400 p-2">Instructions</h1>
        <Textarea onChange={(e) => setInstruction(e.target.value)} value={instructions} className="border-white h-auto min-h-60 w-[256px]"/>
        <h1 className="p-2">Model</h1>
        <Select value="gpt-4o">
          <SelectTrigger className="text-white">
            <SelectValue placeholder="Select an option " />
          </SelectTrigger>
          <SelectContent className="text-white">
            <SelectItem value="Feature">gpt-3.5 turbo</SelectItem>
            <SelectItem value="Sub-Feature">gpt-4 turbo</SelectItem>
            <SelectItem value="Func">gpt-4o</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="px-12 text-sm border-l py-8 h-screen flex flex-col flex-1 justify-between">
        <h1>THREAD</h1>
        <div>
          <div className="w-full h-28 flex flex-col items-center gap-3">
            <Textarea placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} className="outline-none bg-gray-500 border-none flex-1 resize-none"/>
            <Button className="bg-[#1A7F64] text-white w-full p-3 text-md flex items-center gap-3 justify-between">Run<ArrowRight size={20} /></Button>
          </div>
          <p className="text-gray-500 text-center">This is your playground, feel free to ask any question you want.</p>
        </div>
      </div>
    </div>
  );
}
