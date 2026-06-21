export function getAssetUrl(imagePath: string) {
  if (!imagePath) return "";

  // 1. If the image is already a full external web link, just return it
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // 2. Remove any accidental leading slashes from the CMS path 
  // so we don't end up with double slashes like //uploads/image.png
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // 3. Attach the Vite base URL (works for both "/" on Vercel and "/repo-name/" on GitHub Pages)
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
