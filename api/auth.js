import { createVercelBeginHandler } from "netlify-cms-oauth-provider-node";

export default function handler(req, res) {
  // Dynamically grab the current domain from the incoming request
  const host = req.headers.host;
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const config = {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    completeUrl: `${origin}/api/callback`,
  };

  // Generate and run the handler with our dynamic config
  const beginHandler = createVercelBeginHandler(config);
  return beginHandler(req, res);
}
