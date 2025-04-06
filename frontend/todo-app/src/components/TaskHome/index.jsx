// components/TaskHome.js
"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function TaskHome({ id, title, detail, onDelete, onComplete }) {
  const handleCompleteClick = async () => {
    try {
      await onComplete(id);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      <div className="flex flex-row justify-between items-center w-[400px] h-[82px]
       mx-auto bg-white rounded-[15px] shadow-md shadow-gray-400 p-4">
        <div className="flex flex-col justify-center gap-y-1 ml-2">
          <div className="text-[17px] text-[#9395D3] font-bold">{title}</div>
          <div className="text-[14px] text-gray-600">{detail}</div>
        </div>
        
        <div className="flex flex-row space-x-8 mr-5">
          <Link href={`/edit/${id}`}>
            <Image
              src="/edit.svg"
              width={17.5}
              height={20}
              alt="Edit"
              className="cursor-pointer"
            />
          </Link>
          <Image
            src="/delete.svg"
            width={15.42}
            height={20}
            alt="Delete"
            className="cursor-pointer"
            onClick={() => onDelete(id)}
          />
          <Image
            src="/completed.svg"
            width={20}
            height={20}
            alt="Completed"
            className="cursor-pointer"
            onClick={handleCompleteClick}
          />
        </div>
      </div>
    </div>
  )
}