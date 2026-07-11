async function test() {
  try {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = "AQ.Ab8RN6LatvpmWr-0zFBtkP5VdossYe4iW1OoGNsjwDjymC6hXQ";
    const { google } = await import('@ai-sdk/google');
    const { streamText } = await import('ai');
    
    const result = await streamText({
      model: google('gemini-3.5-flash'),
      prompt: 'Hello',
    });
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  } catch (e) {
    console.error("ERROR:", e);
  }
}
test();
