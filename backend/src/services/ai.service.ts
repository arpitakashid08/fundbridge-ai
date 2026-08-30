const OLLAMA_URL = process.env.OLLAMA_URL?.replace(/\/$/, "");
const MODEL = process.env.OLLAMA_MODEL || "gemma3:4b";
const timeoutMs = Number(process.env.AI_REQUEST_TIMEOUT_MS || 15000);

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function askAI(
  messages: AIMessage[]
): Promise<string> {
  if (!OLLAMA_URL) {
    throw new Error("AI is not configured. Set OLLAMA_URL to a remote Ollama-compatible endpoint.");
  }

  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      signal: AbortSignal.timeout(timeoutMs),

      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false,
        options: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      console.error("OLLAMA RESPONSE ERROR:", error);

      throw new Error(
        `Ollama returned status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.message?.content) {
      throw new Error("Ollama returned an empty response.");
    }

    return data.message.content;
  } catch (error) {
    console.error("OLLAMA CONNECTION ERROR:", error);

    throw new Error(
      "Unable to connect to the configured AI model."
    );
  }
}
