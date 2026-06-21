import { createVercelCompleteHandler } from "netlify-cms-oauth-provider-node";

export default function handler(req, res) {
  const host = req.headers.host;
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const config = {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    completeUrl: `${origin}/api/callback`,
    origin: origin, // This automatically satisfies the security check!
  };

  const completeHandler = createVercelCompleteHandler(config);
  return completeHandler(req, res);
}
