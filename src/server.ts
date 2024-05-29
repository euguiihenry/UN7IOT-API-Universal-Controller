import fastify from "fastify";
import * as dotenv from 'dotenv';
const fetch = require('node-fetch');

dotenv.config();
const app = fastify();

app.post("/get-info", async (request, reply) => {
    const body: getBody = request.body as getBody;
    const url = `https://${process.env.BLYNK_REGION}${process.env.GET_URL}${process.env.TOKEN}${body.virtualPort}`;

    const response = await fetch(url);
    const data = await response.text();

    reply.send(data);
});

app.post("/update", async (request, reply) => {
    const body: updateBody = request.body as updateBody;
    const url = `https://${process.env.BLYNK_REGION}${process.env.UPDATE_URL}${process.env.TOKEN}${body.virtualPort}=${body.value}`;

    const response = await fetch(url);
    const answer = await response.status;

    reply.send(`Status Code: ${answer}`);
});

app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3005,
})
.then(() => {
    console.log("HTTP Server Running");
});

interface getBody {
    virtualPort: string
}

interface updateBody {
    virtualPort: string,
    value: string
}