import { Completion } from './../../../node_modules/openai/resources/completions.d';
import { NextResponse } from 'next/server';
import { Request } from './../../../node_modules/openai/_shims/index.d';
import OpenAi from "openai"
import { Completions } from 'openai/resources/completions.mjs';

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `You are an expart TailwindCSS developer. A user will provide you with a low-fidelity wireframe of an application and you will return a single HTML file that uses license to make the application more complete. If you need to insert an image, use the service placehold.co to create a placeholder image. Respond only with the HTML file.`

export async function POST(request: Request) {
  const { image } = await request.json()

  if (!image) {
    return NextResponse.json("No image provided", {
      status: 400,
    })
  }

  try {
    const Completion = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    // Provide the prompt to "system" give instant response
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: [{ type: "image_url", image_url: image }] }
    ],
  })
  return NextResponse.json(Completions)
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500, })
  }
}
