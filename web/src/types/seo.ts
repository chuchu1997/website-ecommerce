export interface SeoInterface {
  slug: string;
  title: string;
  description: string;
  keywords: string; // hoặc string[] nếu muốn tách ra
  canonicalUrl?: string;

  // Robots
  robotsIndex?: boolean; // true = index, false = noindex
  robotsFollow?: boolean; // true = follow, false = nofollow

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  altText?: string; // dùng để mô tả ảnh OG (SEO image alt)

  // Sitemap & Structured Data
  xmlSitemap?: boolean;
  structuredData?: boolean;
  
  schema:any;
}