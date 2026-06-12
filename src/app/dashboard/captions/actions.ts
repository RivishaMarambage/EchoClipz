'use server'

import { generateWithGroq } from "@/utils/groq"
import { createClient } from "@/utils/supabase/server"

export async function generateCaptions(formData: FormData) {
  const topic = formData.get('topic') as string;
  const tone = formData.get('tone') as string;
  const platform = formData.get('platform') as string;

  if (!topic || !tone || !platform) {
    return { error: "All fields are required" };
  }

  const prompt = `You are an expert social media copywriter.
Create 6 different highly engaging, short, and concise captions for a ${platform} video about: "${topic}".
The tone should be: ${tone}.

For each caption include:
1. A strong hook in the first sentence.
2. A very short, punchy main body (maximum 1-2 very short sentences).
3. A clear Call to Action (CTA).
4. A curated list of 3-5 highly relevant hashtags for ${platform}.

IMPORTANT FORMATTING RULES: 
- You MUST separate each of the 6 options with this exact delimiter on a new line: ---SPLIT---
- You MUST put at least two blank lines between the Call to Action and the hashtags so they are clearly separated.
- Do not include "Option 1" titles, I will add those myself. Just output the text for the 6 options separated by ---SPLIT---. 
- Do not include introductory conversational text.`;

  try {
    const captionsContent = await generateWithGroq(prompt, "llama-3.3-70b-versatile");
    
    // Save to Supabase if logged in
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('ideas').insert({
          user_id: user.id,
          niche: topic, // using topic as niche
          results_json: {
            type: 'caption',
            platform,
            tone,
            content: captionsContent
          }
        });
      }
    } catch (dbError) {
      console.warn("Could not save to Supabase. This might be due to missing/invalid API keys.", dbError);
    }

    return { success: true, captions: captionsContent };
  } catch (error: any) {
    console.error("Error generating captions:", error);
    return { error: error.message || "Failed to generate captions" };
  }
}
