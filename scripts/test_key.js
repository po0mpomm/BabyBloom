const axios = require('axios');

const key = "AIzaSyCIBW-NqRrukUAGayAURwUfRgJAgqdqoEQ";
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;

async function test() {
  try {
    const res = await axios.post(url, {
      contents: [{ parts: [{ text: "Hello" }] }]
    });
    console.log("✅ Success! Your key is working and Gemini responded.");
  } catch (err) {
    console.log("❌ Error detected:");
    if (err.response) {
      console.log(`Status: ${err.response.status}`);
      console.log(`Message: ${JSON.stringify(err.response.data.error.message)}`);
      if (err.response.status === 404) {
        console.log("\n⚠️  EXPLANATION:");
        console.log("This 404 means the Gemini model was not found for your key.");
        console.log("This ALMOST ALWAYS means the 'Generative Language API' is NOT ENABLED.");
        console.log("\n🛠️  FIX:");
        console.log("1. Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
        console.log("2. Click 'ENABLE'.");
      }
    } else {
      console.log(err.message);
    }
  }
}

test();
