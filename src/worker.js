const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
const json = (data, status=200) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", ...cors }
});
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (url.pathname === "/api/health") return json({ ok: true, app: "NEXORA", mode: env.AI ? "cloudflare-ai-available" : "starter" });
    if (url.pathname === "/api/chat" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "Send valid JSON." }, 400); }
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length > 4000) return json({ error: "Message must be between 1 and 4000 characters." }, 400);
      if (!env.AI) return json({ error: "AI is not connected yet. Configure a Cloudflare Workers AI binding named AI." }, 503);
      try {
        const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: "You are NEXORA, a helpful, clear, respectful general-purpose assistant. Be honest about uncertainty. Do not claim to have accessed external accounts or performed actions you did not perform." },
            { role: "user", content: message }
          ]
        });
        return json({ reply: result.response || "I couldn't generate a response. Please try again." });
      } catch (error) {
        return json({ error: "The AI service could not complete this request. Check the Workers AI binding and account access." }, 502);
      }
    }
    return json({ error: "Not found." }, 404);
  }
};