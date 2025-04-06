import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewTask(){
    return (
        <div className="flex flex-col items-end mt-auto m-5">
            <Link href="/add">
                <Image
                src={"/new-button.svg"}
                width={70}
                height={70}
                alt="Add tasks"
                className="cursor-pointer"
                />
            </Link>
        </div>
    )
}