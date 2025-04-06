import React from "react"
import Image from "next/image"

export default function TopBarHome() {
    return(
        <div className="flex justify-between items-center w-[414px] h-[80px]
         mx-auto bg-[#9395D3]">
            <div className="text-white font-bold text-xl ml-5">TODO APP</div>
            <div className="mr-5">
                <Image 
                    src="/calendar.svg"
                    width={32}
                    height={32}
                    alt="Calendar"
                />
            </div>
        </div>
    )
}