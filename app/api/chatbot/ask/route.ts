import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log("Chatbot Proxy - Received question:", body.question);
    
    // Proxy the request to the external Render API
    const response = await axios.post("https://baby-bloom-api-onbj.onrender.com/ask", body, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000, // Increase to 60s to allow Render extra time to wake up
    });

    console.log("Chatbot Proxy - Received response from Render");
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Chatbot Proxy Error:", error.message);
    
    // Instead of a 500 error, return a graceful "Waking up" message
    // This prevents the AxiosError red screen in the UI
    return NextResponse.json({
      answer: "I'm currently waking up my AI engine (this usually takes 30-50 seconds on the first request). Please try asking again in a moment! ✨",
      status: "waking_up"
    });
  }
}
