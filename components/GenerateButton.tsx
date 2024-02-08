import { CogIcon } from "lucide-react";

export default function GenerateButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg z-[1000] absolute top-4 left-1/2 -translate-x-1/2 shadow-md shadow-blue-800/50">
      <span className="inline-flex items-center">
        <CogIcon className="w-4 h-4 mr-1" />
        <span>Generate</span>
      </span>
    </button>
  );
}
