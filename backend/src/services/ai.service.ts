const OLLAMA_URL = "http://127.0.0.1:11434";
const MODEL = "gemma3:4b";

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function askAI(
  messages: AIMessage[]
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      signal: AbortSignal.timeout(5000),

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
      "Unable to connect to the local AI model."
    );
  }
}