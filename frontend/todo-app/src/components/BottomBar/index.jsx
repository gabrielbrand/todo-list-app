import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BottonBar(){
    return(
        <div className="flex flex-row w-[414px] h-[68px] mx-auto bg-white text-[#9395D3] items-center justify-around text-10px">
            <div className="flex flex-col item-center text-[#9395D3]">
                <Image
                src={"/list.svg"}
                width={17.5}
                height={12.5}
                alt="list icon"
                />
                <div className="text-[10px] mt-1">All</div>
            </div>
            <Link href="/completed">
                <div className="flex flex-col items-center text-[#8B8787]">
                   <Image
                    src={"/mark.svg"}
                    width={17.5}
                    height={12.5}
                    alt="tasks done"
                    className="cursor-pointer"
                    />
                    <div className="text-[10px] mt-1">Completed</div>
                </div>
            </Link>
        </div>
    )
}