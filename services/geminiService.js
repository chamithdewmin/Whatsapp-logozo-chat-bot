// services/geminiService.js
import axios from 'axios';

export async function getGeminiReply(prompt, apiKey) {
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
    {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      }
    }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
