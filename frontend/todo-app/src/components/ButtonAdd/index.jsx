import React from "react";

export default function ButtonAdd ( {onClick} ){
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center w-[386] h-[65]
             bg-[#9395D3] text-white font-bold text-lg  rounded-[15]
              justify-center mt-15 shadow-md shadow-gray-400 cursor-pointer">
                ADD
        </button>
    )
}