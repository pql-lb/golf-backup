// app/api/data/route.js
import redis from "@/lib/redis"; // Adjust the path according to your setup

// lib/dataFetcher.js
async function fetchData() {
    try {
        const cacheKey = "api-data"; // Define your cache key

        // Attempt to get cached data from Redis
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            // If data is cached, return it
            return JSON.parse(cachedData);
        } else {
            // If not cached, fetch fresh data from the source
            const freshData = "data";
            // Store the fresh data in Redis
            await redis.set(cacheKey, JSON.stringify(freshData), "EX", 60); // Cache for 60 seconds
            return freshData;
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
}

export async function GET() {
    try {
        const data = await fetchData();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
