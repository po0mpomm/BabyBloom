const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 8001;

app.post('/ask', (req, res) => {
  const { question } = req.body;
  console.log(`Received question: ${question}`);
  
  // Mock response for testing
  setTimeout(() => {
    res.json({
      answer: `[MOCK RESPONSE] I'm BabyBloom AI. You asked: "${question}". This is a local test response.`,
      intent: "general"
    });
  }, 1000);
});

app.get('/health', (req, res) => {
  res.json({ status: "healthy", engine_loaded: true });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Chatbot Mock Server running at http://localhost:${PORT}`);
  console.log(`To use this, update your Next.js proxy at app/api/chatbot/ask/route.ts to point here.`);
});
