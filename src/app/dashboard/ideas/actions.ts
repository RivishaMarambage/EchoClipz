'use server'

import { generateWithGroq } from "@/utils/groq"
import { createClient } from "@/utils/supabase/server"

export async function generateViralIdeas(formData: FormData) {
  const niche = formData.get('niche') as string;
  const creatorType = formData.get('creatorType') as string;
  const audience = formData.get('audience') as string;

  if (!niche || !creatorType || !audience) {
    return { error: "All fields are required" };
  }

  const prompt = `You are an expert viral content strategist for short-form video (TikTok, Reels, Shorts).
Generate 10 viral content ideas for a ${creatorType} in the ${niche} niche, targeting a ${audience} audience.

For each idea, provide:
1. A catchy Hook
2. The core emotional trigger
3. A brief explanation of why it will go viral
4. A suggested format (e.g. talking head, gameplay, montage, sketch)

Format the output cleanly in Markdown. Do not include any intro/outro fluff.`;

  try {
    const ideasContent = await generateWithGroq(prompt, "llama-3.3-70b-versatile");
    
    // Save to Supabase if logged in (will fail gracefully if no valid anon key yet)
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('ideas').insert({
          user_id: user.id,
          niche: niche,
          results_json: {
            creatorType,
            audience,
            content: ideasContent
          }
        });
      }
    } catch (dbError) {
      console.warn("Could not save to Supabase. This might be due to missing/invalid API keys.", dbError);
    }

    return { success: true, ideas: ideasContent };
  } catch (error: any) {
    console.error("Error generating ideas:", error);
    return { error: error.message || "Failed to generate ideas" };
  }
}
