/** @format */

import type { AxiosResponse } from "axios";

export async function fetchSafe<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  fallback: T | null = null
): Promise<T | null> {
  // Nếu đang build, skip API call

  console.log(
    "🔥 SKIP BUILD VARIABLE",
    process.env.SKIP_BUILD_STATIC_GENERATION
  );
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.log("⚠️ Skip fetch during build");
    return fallback;
  }

  try {
    const res = await fetcher();
    return res.data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return fallback;
  }
}
