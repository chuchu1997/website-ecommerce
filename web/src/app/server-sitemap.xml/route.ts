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
import { fetchSafe } from "@/utils/fetchSafe";

export async function GET(): Promise<Response> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://saithanhguitar.com";
  const now = new Date().toISOString();

  // ✅ Gọi API an toàn với fetchSafe()
  const [productsRes, cateRes, newsRes, serRes, proRes] = await Promise.all([
    fetchSafe(() => ProductAPI.getAllProducts(), { products: [] }),
    fetchSafe(
      () =>
        CategoryAPI.getAllCategoriesOfStore({
          justGetParent: false,
          currentPage: 1,
          limit: 9999,
        }),
      { categories: [] }
    ),
    fetchSafe(() => NewsAPI.getNews({ currentPage: 1, limit: 9999 }), {
      articles: [],
    }),
    fetchSafe(
      () =>
        ServiceAPI.getServices({
          currentPage: 1,
          limit: 9999,
        }),
      { services: [] }
    ),
    fetchSafe(
      () =>
        ProjectAPI.getProjects({
          currentPage: 1,
          limit: 9999,
        }),
      { projects: [] }
    ),
  ]);

  // ✅ Nếu API bị skip (lúc build) thì dùng fallback để không crash
  const products: ProductInterface[] = productsRes?.products || [];
  const categories: CategoryInterface[] = cateRes?.categories || [];
  const news: NewsInterface[] = newsRes?.articles || [];
  const services: ServiceInterface[] = serRes?.services || [];
  const projects: ProjectInterface[] = proRes?.projects || [];

  // Tạo sitemap urls
  const newsUrls = news.map(
    (n) => `
      <url>
        <loc>${baseUrl}/tin-tuc/${n.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

  const productUrls = products.map(
    (p) => `
      <url>
        <loc>${baseUrl}/san-pham/${p.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

  const categoriesUrls = categories.map(
    (c) => `
      <url>
        <loc>${baseUrl}/danh-muc/${c.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

  const servicesUrls = services.map(
    (s) => `
      <url>
        <loc>${baseUrl}/dich-vu/${s.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

  const projectsUrls = projects.map(
    (p) => `
      <url>
        <loc>${baseUrl}/du-an/${p.slug}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

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
  ].map(
    (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${now}</lastmod>
      </url>`
  );

  // Combine tất cả URL vào XML
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
