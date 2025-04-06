import React from "react";

export default function TaskCompleted({ title, detail }) {
  return (
    <div className="flex flex-col gap-y-5 mt-5">
        <div className="flex flex-row justify-between items-center w-[400px] h-[82px]
         mx-auto bg-white rounded-[15px] shadow-md shadow-gray-400 p-4">
            <div className="flex flex-col justify-center gap-y-1 ml-2">
                <div className="text-[17px] text-[#9395D3] font-bold">{title}</div>
                <div className="text-[14px] text-gray-600">{detail}</div>
            </div>
        </div>
    </div>
  );
}