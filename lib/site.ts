const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "http://localhost:3000";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");
export const siteName = "EcoAashirwad";
export const siteAlternateNames = ["Eco Aashirwad", "ECOAashirwad"];
export const siteDescription =
  "Best quality WPC doors, frames, and boards by Eco Aashirwad — premium strength, density, and resin-bonded construction.";
export const siteLocale = "en_IN";
export const heroImagePath = "/images/home/collage.png";
export const businessAddress =
  "shree Balaji interior concepts, Aashirwad WPC, 14-1-334, behind prakash theatre, Aghapura, Mangalhat, Hyderabad, Telangana 500001";
export const businessPhone = "+91 93987 56407";
export const businessMapUrl = "https://maps.app.goo.gl/F1gAj18Kzcsr2fPJ6";
export const businessCategory = "Door shop";
export const businessCoordinates = {
  latitude: 17.3808288,
  longitude: 78.4622211,
};
export const businessMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60912.879261247894!2d78.3708578!3d17.4091502!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb976d98c6f5bd%3A0x4ab60102507ffd51!2sAashirwad%20WPC%20Doors%20-Shree%20Balaji%20Interior%20concepts-%20wpc%20doors%20%26%20frames%2CPvc%20%26%20wpc%20boards%2CGurjan%20Plywood%2Cdoors%20hdmr%20wholesale!5e0!3m2!1sen!2sin!4v1777033217481!5m2!1sen!2sin";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
