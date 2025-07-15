/** @format */

// app/server-sitemap.xml/route.ts

import { CategoryAPI } from "@/api/categories/category.api";
import { NewsAPI } from "@/api/news/news.api";
import { ProductAPI } from "@/api/products/product.api";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ServiceAPI } from "@/api/services/services.api";
import { CategoryInterface } from "@/types/category";
import { NewsInterface } from "@/types/news";
import { ProductInterface } from "@/types/product";
import { ProjectInterface } from "@/types/project";
import { ServiceInterface } from "@/types/service";

export async function GET(): Promise<Response> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://guitarsaithanh.com";
  const now = new Date().toISOString();

  // 1. Lấy sản phẩm từ API
  const [productsRes, newRes, cateRes, serRes, proRes] = await Promise.all([
    ProductAPI.getAllProducts(),
    CategoryAPI.getAllCategoriesOfStore({
      justGetParent: false,
      currentPage: 1,
      limit: 9999,
    }),
    NewsAPI.getNews({ currentPage: 1, limit: 9999 }),
    ServiceAPI.getServices({
      currentPage: 1,
      limit: 9999,
    }),
    ProjectAPI.getProjects({
      currentPage: 1,
      limit: 9999,
    }),
  ]);
  const products = productsRes.data.products || [];
  const news: NewsInterface[] = newRes.data.articles || [];
  const categories: CategoryInterface[] = cateRes.data.categories || [];

  const services: ServiceInterface[] = serRes.data.services || [];

  const projects: ProjectInterface[] = proRes.data.projects || [];

  const newsUrls = news.map((n) => {
    return `
      <url>
        <loc>${baseUrl}/tin-tuc/${n.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`;
  });
  // 2. Các URL động từ sản phẩm
  const productUrls = products.map((p: ProductInterface) => {
    return `
      <url>
        <loc>${baseUrl}/san-pham/${p.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>
    `;
  });

  const categoriesUrls = categories.map((c) => {
    return `
      <url>
        <loc>${baseUrl}/danh-muc/${c.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`;
  });

  const servicesUrls = services.map((s) => {
    return `
      <url>
        <loc>${baseUrl}/dich-vu/${s.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`;
  });

  const projectsUrls = projects.map((p) => {
    return `
      <url>
        <loc>${baseUrl}/du-an/${p.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`;
  });

  // 3. Các URL tĩnh bổ sung thủ công
  const staticUrls = [
    "/chinh-sach-ban-hang",
    "/chinh-sach-doi-tra",
    "/chinh-sach-bao-mat",
    "/chinh-sach-van-chuyen",
    "/chinh-sach-bao-hanh",
    "/chinh-sach-quy-dinh-chung",
    "/huong-dan-mua-hang",
    "/huong-dan-thanh-toan",
    "/cac-hinh-thuc-mua-hang",
    "/dang-ky-lam-dai-ly",
    "/gioi-thieu",
    "/lien-he",
  ].map((path) => {
    return `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${now}</lastmod>
      </url>
    `;
  });

  // 4. Kết hợp tất cả
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...staticUrls,
  ...productUrls,
  ...newsUrls,
  ...categoriesUrls,
  ...servicesUrls,
  ...projectsUrls,
].join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
