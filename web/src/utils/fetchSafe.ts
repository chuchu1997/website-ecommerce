import { AxiosResponse } from "axios";

export async function fetchSafe<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  fallback: T
): Promise<T> {
  const skipBuild = process.env.SKIP_BUILD_STATIC_GENERATION === "true";
  
  if (skipBuild) {
    console.log("⚠️ Skip fetch during build - returning fallback");
    console.log("⚠️ Fallback data:", JSON.stringify(fallback, null, 2));
    return fallback;
  }

  try {
    console.log("🚀 Fetching data - SKIP_BUILD_STATIC_GENERATION:", process.env.SKIP_BUILD_STATIC_GENERATION);
    console.log("🚀 NODE_ENV:", process.env.NODE_ENV);
    console.log("🚀 Timestamp:", new Date().toISOString());
    
    const res = await fetcher();
    console.log("✅ Fetch successful - Response status:", res.status);
    console.log("✅ Response headers:", res.headers);
    console.log("✅ Response data keys:", Object.keys(res.data || {}));
    
    // Log the actual response data structure
    console.log("✅ Full response.data:", JSON.stringify(res.data, null, 2));
    
    // Check if res.data has the expected structure
    if (res.data && typeof res.data === 'object') {
      console.log("✅ res.data type:", typeof res.data);
      console.log("✅ res.data keys:", Object.keys(res.data));
      
      // Check for categories specifically
      if ('categories' in res.data) {
        console.log("✅ Found categories in res.data");
        console.log("✅ Categories type:", typeof (res.data as any).categories);
        console.log("✅ Categories is array:", Array.isArray((res.data as any).categories));
        console.log("✅ Categories length:", (res.data as any).categories?.length || 0);
      } else {
        console.log("⚠️ No 'categories' property found in res.data");
        console.log("⚠️ Available properties:", Object.keys(res.data));
      }
    }
    
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
    
    console.log("❌ Returning fallback:", JSON.stringify(fallback, null, 2));
    return fallback;
  }
}