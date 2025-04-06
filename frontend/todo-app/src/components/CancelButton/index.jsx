import Link from "next/link";
import React from "react";

export default function CancelButton (){
    return (
        <Link href={"/"}>
        <div className="flex justify-center items-center w-[170] h-[65]
         bg-[#9395D3] text-white text-[15px] rounded-[15]
          shadow-md shadow-gray-400">Cancel</div>
        </Link>
    )
}