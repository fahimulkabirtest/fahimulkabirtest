export function getAssetUrl(imagePath: string) {
  if (!imagePath) return "";

  // 1. If it's an external link, return it as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // 2. Strip any accidental leading slashes so we just have "uploads/image.png"
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // 3. Grab Vite's automatically generated Base URL
  const baseUrl = import.meta.env.BASE_URL;

  // 4. Combine them safely (prevents double slashes)
  return baseUrl.endsWith('/') 
    ? `${baseUrl}${cleanPath}` 
    : `${baseUrl}/${cleanPath}`;
}
