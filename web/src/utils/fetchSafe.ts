import { AxiosResponse } from "axios";

export async function fetchSafe<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  fallback: T
): Promise<T> {
  const skipBuild = process.env.SKIP_BUILD_STATIC_GENERATION === "true";
  
  if (skipBuild) {
    console.log("⚠️ Skip fetch during build - returning fallback");
    return fallback;
  }

  try {
    console.log("🚀 Fetching data - SKIP_BUILD_STATIC_GENERATION:", process.env.SKIP_BUILD_STATIC_GENERATION);
    console.log("🚀 NODE_ENV:", process.env.NODE_ENV);
    console.log("🚀 Timestamp:", new Date().toISOString());
    
    const res = await fetcher();
    console.log("✅ Fetch successful - Response status:", res.status);
    console.log("✅ Response data keys:", Object.keys(res.data || {}));
    
    return res.data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    console.error("❌ Error details:", {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    return fallback;
  }
}