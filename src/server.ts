import fastify from "fastify";
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = fastify();

app.post("/get-info", async (request, reply) => {
    const body: getBody = request.body as getBody;
    const url = `https://${process.env.BLYNK_REGION}${process.env.GET_URL}${process.env.TOKEN}${body.virtualPort}`;

    const response = await axios.get(url);
    const data = await response.data;

    const responseData = {
        virtualPort: body.virtualPort,
        atrributedValue: data
    }

    reply.send(responseData);
});

app.post("/update", async (request, reply) => {
    const body: updateBody = request.body as updateBody;
    const url = `https://${process.env.BLYNK_REGION}${process.env.UPDATE_URL}${process.env.TOKEN}${body.virtualPort}=${body.value}`;

    const response = await fetch(url);
    const answer = await response.statusText;
    const answerCode = await response.status;

    const responseData = {
        virtualPort: body.virtualPort,
        atrributedValue: body.value,
        updateStatus: answer,
        updateStatusCode:answerCode
    }

    reply.send(responseData);
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