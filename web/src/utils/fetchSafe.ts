import { AxiosResponse } from "axios";

export async function fetchSafe<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  fallback: T
): Promise<T> {
  const skipBuild = process.env.SKIP_BUILD_STATIC_GENERATION === "true";
  
  if (skipBuild) {
    // console.log("⚠️ Skip fetch during build - returning fallback");
    // console.log("⚠️ Fallback data:", JSON.stringify(fallback, null, 2));
    return fallback;
  }

  try {
    // console.log("🚀 Fetching data - SKIP_BUILD_STATIC_GENERATION:", process.env.SKIP_BUILD_STATIC_GENERATION);
    // console.log("🚀 NODE_ENV:", process.env.NODE_ENV);
    // console.log("🚀 Timestamp:", new Date().toISOString());
    
    const res = await fetcher();
    // Log the actual response data structure
    
    return res.data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    console.error("❌ Error details:", {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      name: err instanceof Error ? err.name : undefined
    });
    
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as any;
      console.error("❌ Axios error response:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data
      });
    }
    
    // console.log("❌ Returning fallback:", JSON.stringify(fallback, null, 2));
    return fallback;
  }
}