

// Fix: Update import to use 'Creature' type from '../types'
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Creature } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be logged to the console if API_KEY is not set.
  // The Gemini client initialization will likely fail, and the app's error handling should catch it.
  console.error("API_KEY environment variable not found. The application will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as API_KEY presence is an external requirement.

const TEXT_MODEL_NAME = "gemini-2.5-flash-preview-04-17";
const IMAGE_MODEL_NAME = "imagen-3.0-generate-002";

/**
 * Parses a JSON string, potentially removing markdown fences.
 */
const parseJsonSafely = <T,>(jsonString: string): T | null => {
  let str = jsonString.trim();
  const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
  const match = str.match(fenceRegex);
  if (match && match[1]) {
    str = match[1].trim();
  }

  try {
    return JSON.parse(str) as T;
  } catch (error) {
    console.error("Failed to parse JSON response:", error, "Original string:", jsonString);
    throw new Error(`Failed to parse creature data. The AI might have returned an unexpected format. Raw: ${jsonString.substring(0,100)}...`);
  }
};


// Fix: Update return type and internal type usage from CreatureDetails to Creature
export const generateCreatureDescription = async (keywords: string): Promise<Creature> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured.");
  }
  try {
    const systemInstruction = `You are a master storyteller and mythologist. Based on the user's keywords, craft a compelling and unique mythical creature.
Provide its name, a vivid physical description (around 100-150 words), its natural habitat (around 50-70 words), and a list of its distinct abilities (around 50-70 words).
Respond STRICTLY in JSON format with the following keys: "name" (string), "description" (string), "habitat" (string), "abilities" (string).`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL_NAME,
      contents: `Keywords: ${keywords}`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.8, // Slightly more creative
      },
    });

    // Fix: Update generic type for parseJsonSafely to Creature
    const creatureData = parseJsonSafely<Creature>(response.text);
    if (!creatureData || !creatureData.name || !creatureData.description) {
        throw new Error("Received invalid or incomplete creature data from AI.");
    }
    return creatureData;

  } catch (error) {
    console.error("Error generating creature description:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate creature description: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating creature description.");
  }
};

export const generateCreatureImage = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured.");
  }
  try {
    const response = await ai.models.generateImages({
      model: IMAGE_MODEL_NAME,
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: "image/png" },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image generated or image data is missing.");
    }
  } catch (error) {
    console.error("Error generating creature image:", error);
     if (error instanceof Error) {
        throw new Error(`Failed to generate creature image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating creature image.");
  }
};