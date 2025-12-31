import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize Gemini on the server side where process.env.API_KEY is available and secure
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(req: Request) {
  try {
    const { lang } = await req.json();

    const prompt = lang === 'zh' 
      ? "為一個叫「數字炸彈」的聚會遊戲生成一個簡短、有趣、輕鬆的懲罰。內容必須安全且有趣。例如：「做10個開合跳」、「用歌劇風格唱兒歌」。只輸出懲罰內容，不要有開場白。"
      : "Generate a short, funny, lighthearted forfeit or punishment for losing a party game called 'Number Bomb'. It should be safe for work and fun. Examples: 'Do 10 jumping jacks', 'Sing a nursery rhyme in an opera style'. Output ONLY the punishment text, no intro.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text?.trim() || "";
    return NextResponse.json({ text });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate punishment" },
      { status: 500 }
    );
  }
}