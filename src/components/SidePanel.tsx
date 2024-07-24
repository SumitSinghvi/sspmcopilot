// import React from "react";
import { Button } from "./ui/button";
import dataSource from "../assets/SVG.svg";
import playGround from "../assets/SVG (1).svg";
import Archive from "../assets/SVG (2).svg";
import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function SidePanel() {
  const navigate = useNavigate();
  const url = location.href;
  const currentURL = url.split("/")[3];
  return (
    <div className="w-[247px] h-screen border-r">
      <h1 className="py-2 px-4 flex justify-between">
        <i className="playfairfont font-bold">yo babes</i>
        <div>
          <UserButton />
        </div>
      </h1>
      <div className="flex flex-col gap-[4px] p-[8px]">
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className={`p-[8px] rounded-md flex items-center justify-start gap-2 ${
            currentURL == "" ? "bg-gray-800" : "bg-black"
          }`}
        >
          <img src={dataSource} alt="svg 1" />
          <span className="font-thin">Data source</span>
        </Button>
        <Button
          onClick={() => navigate("/playground")}
          variant="secondary"
          className={`p-[8px] rounded-md flex items-center justify-start gap-2 ${
            currentURL == "playground" ? "bg-gray-800" : "bg-black"
          }`}
        >
          <img src={playGround} alt="svg 1" />
          <span className="font-thin">Playground</span>
        </Button>
        <Button
          onClick={() => navigate("/archive")}
          variant="secondary"
          className={`p-[8px] rounded-md flex items-center justify-start gap-2 ${
            currentURL == "archive" ? "bg-gray-800" : "bg-black"
          }`}
        >
          <img src={Archive} alt="svg 1" />
          <span className="font-thin">Archive</span>
        </Button>
      </div>
    </div>
  );
}
