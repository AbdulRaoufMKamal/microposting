const TRANSLATE_URL =
  process.env.TRANSLATE_API_URL || "http://localhost:5000";

export async function translate(
  text: string,
  targetLang: string,
  sourceLang: string = "auto"
) {
  try {
    const res = await fetch(TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
    });

    if (!res.ok) {
      throw new Error(`LibreTranslate failed: ${res.status}`);
    }

    const data = await res.json();
    return data.translatedText as string;
  } catch (err) {
    console.error("LibreTranslate error:", err);
    return text;
  }
}

