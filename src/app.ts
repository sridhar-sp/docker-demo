import express, { Request, Response } from "express";
const bodyParser = require("body-parser");

const app: express.Application = express();

const PORT = 8080

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Node.js server.");
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});