import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'GEMINI_API_KEY is missing from environment variables.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const { prompt } = await req.json();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const code = await response.text();

    return new Response(JSON.stringify({ code }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate description' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
