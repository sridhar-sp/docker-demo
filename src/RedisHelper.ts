import redis, { RedisClient } from "redis";

class RedisHelper {
    redisClient: RedisClient;

    constructor() {
        console.log("Constructing RedisHelper");
        const redisUrl = process.env.REDIS_URL || "a"
        this.redisClient = redis.createClient(redisUrl);
        this.redisClient.on("error", function (error) {
            console.error(error);
        });
    }

    setString(key: string, value: string): Promise<boolean> {
        return new Promise((resolve, reject: (error: Error) => void) => {
            this.redisClient.set(key, value, (err, reply) => {
                if (err == null) resolve(true);
                else reject(err);
            });
        });
    }
}

export default RedisHelper