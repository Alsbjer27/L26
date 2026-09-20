export function hasAllowedRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }

  const forwardedHosts = (request.headers.get("x-forwarded-host") || "")
    .split(",")
    .map(host => host.trim().toLowerCase())
    .filter(Boolean);
  const requestHost = request.headers.get("host")?.trim().toLowerCase();
  const allowedHosts = new Set([
    ...forwardedHosts,
    ...(requestHost ? [requestHost] : []),
    new URL(request.url).host.toLowerCase(),
  ]);

  return allowedHosts.has(originHost);
}
