export default {
  async fetch(request, env, ctx) {
    const rawQuery = request.url;
    const targetIndex = rawQuery.indexOf("target=");
    if (targetIndex === -1) {
      return new Response("Missing target parameter", { status: 400 });
    }
    const targetUrl = decodeURIComponent(rawQuery.substring(targetIndex + 7));

    try {
      const apiResponse = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/json"
        }
      });

      const body = await apiResponse.text();
      return new Response(body, {
        status: apiResponse.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};
