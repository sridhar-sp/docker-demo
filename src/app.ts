import express, { Request, Response } from "express";
import RedisHelper from "./RedisHelper"

const bodyParser = require("body-parser");

const app: express.Application = express();

const PORT = 8080

const redisHelper = new RedisHelper()

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    redisHelper.setString("key", "value")
    res.send("Welcome to Node.js server.");
});

app.get("/save/:key/:value", (req: Request, res: Response) => {
    const key = req.params['key']
    const value = req.params['value']
    redisHelper.setString(key, value)
    res.send(`Setting ${value} to ${key}`)
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});