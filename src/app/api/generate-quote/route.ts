import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { findLocalQuote } from "@/utils/quoteLibrarySearch";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    if (!theme) {
      return new Response("Theme is required", { status: 400 });
    }

    const local = findLocalQuote(theme);
    if (local) {
      return Response.json({ quote: local.quote, author: local.author });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response("API key not configured", { status: 500 });
    }

    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      temperature: 0.2, // 幻覚（ハルシネーション）を抑え、事実に基づいた出力を強制
      schema: z.object({
        quote: z
          .string()
          .describe(
            "生成された名言。必ず実際に存在し確認可能なテキストのみを含めること。",
          ),
        author: z
          .string()
          .describe("その名言の著者・発言者・キャラクター名 (作品名)など"),
      }),
      prompt: `あなたは極めて正確な知識を持つ「名言・セリフの参照データベース」です。
以下のリクエストに対して、完全に実在し、出典が存在する正確な名言を1つ出力してください。

リクエスト: 「${theme}」

【厳密なルール（必ず遵守すること）】
1. 【創作厳禁】絶対に架空のセリフや、それらしいだけの作り話を生成しないでください。
2. アニメや漫画のキャラクターが指定された場合、原作コミックやアニメ本編で【実際に本人が発した固有のセリフ】を選んでください。言い回しや語尾も原作通りにしてください。
3. 実在の人物が指定された場合、その人物が過去に発言・執筆した事実のある名言を選んでください。翻訳の場合は、日本で広く知られている自然な翻訳文にしてください。
4. authorフィールドには、アニメの場合は「キャラクター名 (作品名)」、偉人の場合はフルネームを正確に記述してください。
5. もしリクエストに対する正確な名言が特定できない・自信がない場合は、代わりに「世界的に有名な偉人の絶対に間違いない名言」を出力してください。`,
    });

    return Response.json(object);
  } catch (error) {
    console.error("Error generating quote:", error);
    return new Response("Failed to generate quote", { status: 500 });
  }
}
