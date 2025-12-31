import { Language } from "../types";

export const generatePunishment = async (lang: Language): Promise<string> => {
  try {
    // Call our own Next.js API route
    const response = await fetch('/api/punishment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lang }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    // Fallback if API returns empty text
    if (!data.text) {
        throw new Error('Empty response');
    }

    return data.text;
  } catch (error) {
    console.error("Error generating punishment:", error);
    return lang === 'zh' ? "給大家講個笑話！" : "Tell a joke to the group!";
  }
};