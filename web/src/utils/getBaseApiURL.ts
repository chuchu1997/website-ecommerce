



export function getBaseApiUrl() {
  if (typeof window !== "undefined") {
    // 👉 Trình duyệt (client)
    return process.env.NEXT_PUBLIC_API || "";
  }

  // 👉 Server-side hoặc Docker build-time
  return process.env.API_INTERNAL_URL || "http://api:3000";
}
