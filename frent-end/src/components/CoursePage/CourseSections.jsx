import { useState } from "react";

export default function CourseSections() {
  const [open, setOpen] = useState(false);
return (
    <div className="flex flex-col p-4 bg-white w-[500px] border-gray-200 border rounded-2xl">
        <div
            className="flex justify-between p-3 border-b border-gray-200 font-semibold cursor-pointer"
            onClick={() => setOpen(!open)}
        >
            <span>title</span>
            <span>2 hrs</span>
        </div>
        <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                open ? "max-h-screen" : "max-h-0"
            }`}
        >
            <div className="p-2 pl-8 flex justify-between border-b border-gray-200 text-gray-600">
                <span>learn the basics</span>
                <span>30 min</span>
            </div>
            <div className="p-2 pl-8 flex justify-between border-b border-gray-200 text-gray-600">
                <span>learn the basics</span>
                <span>30 min</span>
            </div>
            <div className="p-2 pl-8 flex justify-between border-b border-gray-200 text-gray-600">
                <span>learn the basics</span>
                <span>30 min</span>
            </div>
            <div className="p-2 pl-8 flex justify-between border-b border-gray-200 text-gray-600">
                <span>learn the basics</span>
                <span>30 min</span>
            </div>
            <div className="p-2 pl-8 flex justify-between border-b border-gray-200 text-gray-600">
                <span>learn the basics</span>
                <span>30 min</span>
            </div>
        </div>
    </div>
);
}
