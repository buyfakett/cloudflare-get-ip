// Cloudflare Workers Script
const GEO_API_URL = "http://ip-api.com/json/"; // 使用 ip-api.com 作为示例

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 获取客户端 IP 地址
  const clientIp = request.headers.get("CF-Connecting-IP");
  
  if (url.pathname === "/") {
    // 返回客户端的 IP 地址
    return new Response(JSON.stringify({ ip: clientIp }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/ip") {
    // 获取完整的客户端信息
    const geoResponse = await fetch(`${GEO_API_URL}${clientIp}`);
    if (!geoResponse.ok) {
      return new Response("Failed to fetch geo information", { status: 500 });
    }

    const geoData = await geoResponse.json();
    return new Response(JSON.stringify(geoData), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 其他路径返回 404
  return new Response("Not Found", { status: 404 });
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
