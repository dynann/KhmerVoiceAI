import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client
// Note: In a production Next.js app, this would likely be a server action or API route 
// to protect the key, but for this client-side demo, we use the env variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Transcribes audio data using Gemini 2.5 Flash.
 * @param audioBase64 The base64 encoded audio string (without data URI prefix)
 * @param mimeType The mime type of the audio (e.g., 'audio/webm' or 'audio/wav')
 */
export const transcribeAudio = async (audioBase64: string, mimeType: string = 'audio/webm'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt parts
    // We strictly instruct the model to only output the transcription.
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: audioBase64,
            },
          },
          {
            text: "Transcribe the following audio strictly into Khmer text. Do not add any introductory or concluding remarks. Just provide the transcription.",
          },
        ],
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No transcription generated.");
    }
    
    return text;

  } catch (error) {
    console.error("Gemini Transcription Error:", error);
    throw error;
  }
};

/**
 * Helper to convert Blob to Base64
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g., "data:audio/webm;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
