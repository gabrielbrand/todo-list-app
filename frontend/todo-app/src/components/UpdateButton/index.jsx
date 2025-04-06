"use client"
import React from 'react';

export default function UpdateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-[170px] h-[65px]
               bg-[#9395D3] text-white text-[15px] rounded-[15px]
               shadow-md shadow-gray-400 cursor-pointer"
    >
      Update
    </button>
  );
}