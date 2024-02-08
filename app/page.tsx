"use client";
import GenerateButton from "@/components/GenerateButton";
import { Tldraw } from "@tldraw/tldraw";

export default function Home() {
  return (
    <main className=" w-screen">
      <Tldraw persistenceKey="snapapp">
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to Snapapp</h1>
          <GenerateButton />
        </div>
      </Tldraw>
    </main>
  );
}
