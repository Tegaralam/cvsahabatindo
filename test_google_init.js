const { google } = require('@ai-sdk/google');
try {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = '';
  google('gemini-1.5-flash');
  console.log("Success");
} catch (e) {
  console.error("Error:", e);
}
