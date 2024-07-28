import Redis from "ioredis";
const port = 6379;

const redis = new Redis({
    host: "feedbackgolf-jjlumd.serverless.euw2.cache.amazonaws.com",
    port: port,
    // password: process.env.REDIS_PASSWORD,
    // tls: process.env.REDIS_TLS ? {} : undefined,
});

export default redis;
