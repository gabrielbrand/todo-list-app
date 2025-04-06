import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TopBarCompleted () {
    return (
        <div className="flex items-center w-[414px] h-[80px] mx-auto bg-[#9395D3]">
            <div className="flex space-x-10 ml-5">
                <Link href="/">
                    <Image 
                        src="/arrow.svg"
                        width={25}
                        height={25}
                        alt="Arrow"
                        className="cursor-pointer"
                    />
                </Link>
            <div className="text-white font-bold text-xl">Completed Task</div>
            </div>
        </div>
    )
}