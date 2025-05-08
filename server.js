// server.js
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import { getPredefinedResponse } from './services/logozoInfo.js';
import { getCommonSenseResponse } from './services/commonSense.js';
import { getGeminiReply } from './services/geminiService.js';

dotenv.config();

const { MessagingResponse } = twilio.twiml;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', async (req, res) => {
  const incomingMsg = req.body.Body;
  const twiml = new MessagingResponse();

  // 1️⃣ LOGOZO keyword logic
  const logozoReply = getPredefinedResponse(incomingMsg);
  if (logozoReply === "__PDF__") {
    const msg = twiml.message("📄 Here's our pricing list. Let us know if you have any questions! 💼");
    msg.media('https://your-server.com/logozo-pricelist.pdf'); // Replace with your actual PDF URL
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }
  if (logozoReply) {
    twiml.message(logozoReply);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  // 2️⃣ Common-sense questions (e.g. date, time)
  const commonSense = getCommonSenseResponse(incomingMsg);
  if (commonSense) {
    twiml.message(commonSense);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  // 3️⃣ Gemini fallback
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const prompt = `Today is ${today}. The user said: "${incomingMsg}"`;

  try {
    const geminiReply = await getGeminiReply(prompt, process.env.GEMINI_API_KEY);
    twiml.message(geminiReply || "🤖 Sorry, I couldn't generate a response.");
  } catch (error) {
    console.error('❌ Gemini API Error:', error.response?.data || error.message);
    twiml.message("⚠️ Gemini couldn't respond right now.");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('✅ LOGOZO WhatsApp Bot is running on http://localhost:3000');
});
