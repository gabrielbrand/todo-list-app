import React from 'react';

export default function MobileTemplateWhite( {children} ){
  return (
    <div className="flex flex-col items-center w-[414px] h-[748px] mx-auto
     bg-[#FFFFFF] overflow-hidden font-sans">
      {children}</div>
  )
}