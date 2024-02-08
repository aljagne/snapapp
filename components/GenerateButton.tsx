import { blobToBase64 } from "@/lib/blobToBase64";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { useEditor } from "@tldraw/tldraw";
import { CogIcon } from "lucide-react";
import OpenAI from "openai";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GenerateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const editor = useEditor();
  async function handleGenerateHTML() {
    try {
      setIsLoading(true)
      // Get the image from TLDraw
      const svg = await editor.getSvg(Array.from(editor.currentPageShapes));

      if (!svg) {
        throw new Error("No image provided");
      }

      // Convert the SVG to a base64 image
      const png = await getSvgAsImage(svg!, {
        type: "png",
        quality: 1,
        scale: 1
      });
      const base64Image = await blobToBase64(png!);
      // Send the image to the API
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ image: base64Image }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const error: string = await response.json();
        throw new Error(error);
      }

      const data: OpenAI.Completion = await response.json();
      console.log(data);

    //  toast.success("Success!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <button
      onClick={handleGenerateHTML}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
      px-4 rounded text-lg z-[1000] absolute top-4 left-1/2 -translate-x-1/2 shadow-md shadow-blue-800/50"
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
      ) : (
        <span className="inline-flex items-center">
          <CogIcon className="w-4 h-4 mr-1" />
          <span>Generate</span>
        </span>
      )}
    </button>
  );
}
