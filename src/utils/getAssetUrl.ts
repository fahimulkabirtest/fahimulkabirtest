export function getAssetUrl(imagePath: string) {
  if (!imagePath) return "";

  // 1. If the image is already a full external web link, return it as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // 2. Remove any accidental leading slashes from the CMS path 
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // 3. Dynamically detect if the site is running on GitHub Pages
  if (typeof window !== "undefined" && window.location.hostname.includes("github.io")) {
    // Extract the repository name directly from the URL 
    // (e.g., from "/academic-portfolio/home", it grabs "academic-portfolio")
    const repoName = window.location.pathname.split('/')[1];
    
    // Attach the dynamic repo name to the image path
    return `/${repoName}/${cleanPath}`;
  }

  // 4. Default behavior for Vercel, Localhost, or Custom Domains
  return `/${cleanPath}`;
}
