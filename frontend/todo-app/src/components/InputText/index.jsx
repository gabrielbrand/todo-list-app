"use client"
import React from 'react'
import Image from 'next/image'

export default function InputText({ 
  onTitleChange, 
  onDetailChange,
  titleValue,
  detailValue 
}) {
  return (
    <div className="flex flex-col items-center gap-y-5 mt-10">
      <div className="w-[356px]">
        <input 
          type="text" 
          placeholder="Title" 
          className="w-full px-4 py-2 bg-transparent outline-none"
          value={titleValue || ''}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <div className="relative w-full h-[1px]">
          <Image
            src="/line.svg"
            fill
            alt="Input Line"
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="w-[356px]">
        <input 
          type="text" 
          placeholder="Detail" 
          className="w-full px-4 py-2 bg-transparent outline-none"
          value={detailValue || ''}
          onChange={(e) => onDetailChange(e.target.value)}
        />
        <div className="relative w-full h-[1px]">
          <Image
            src="/line.svg"
            fill
            alt="Input Line"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}