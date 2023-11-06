import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
// import * as https from "https";
import * as http from "http";

import { BoilingData } from "@boilingdata/node-boilingdata";

const HOST = "0.0.0.0";
const HTTP_PORT = 3100;
// const HTTPS_PORT = 3101;

const app = new Koa();
const router = new Router();
let bd: BoilingData;
const idleTimeoutMs = 300 * 1000; // 5min
let idleTimeout: NodeJS.Timeout;
let isBoilingConnected = false;

const isDebug = process.env["DEBUG"] == "true";
const username = process.env["BD_USERNAME"];
const password = process.env["BD_PASSWORD"];
if (!password || !username) throw new Error("Set BD_USERNAME and BD_PASSWORD envs");

interface IStatement {
  statement: string;
}

async function closeWebSocket(): Promise<void> {
  if (!isBoilingConnected) return;
  await bd.close();
  isBoilingConnected = false;
  console.log({ timestamp: new Date().toISOString(), isBoilingConnected });
}

async function openWebSocket(): Promise<void> {
  if (isBoilingConnected) return;
  await bd.connect();
  isBoilingConnected = true;
  console.log({ timestamp: new Date().toISOString(), isBoilingConnected });
}

router.get("/healthcheck", async (ctx, next) => {
  ctx.status = 200;
  await next();
});

// Pass SQL to Boiling and await the response back
router.post("/", async (ctx, next) => {
  clearTimeout(idleTimeout);
  console.log(ctx.request.body);
  await openWebSocket();
  const sql = (<IStatement>ctx.request.body).statement;
  const requestId = `${(Math.random() * 10000).toFixed(0)}`;
  const resp = await bd.execQueryPromise({ sql, requestId });
  // console.log({ resp });
  ctx.body = JSON.stringify(resp);
  await next();
  idleTimeout = setTimeout(closeWebSocket, idleTimeoutMs);
});

// app.use(mount("/grid", stat(path.join(__dirname, "../src/static"))));
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(
  cors({
    origin: "*", // "http://localhost:3000/";
    headers: "*",
  })
);
app.use(router.routes()).use(router.allowedMethods());

// Listen
const httpServer = http.createServer(app.callback()).listen(HTTP_PORT, HOST, async () => {
  // BD connection
  bd = new BoilingData({
    username,
    password,
    endpointUrl: isDebug ? "wss://e4f3t7fs58.execute-api.eu-west-1.amazonaws.com/devbd/" : undefined,
    globalCallbacks: undefined,
    logLevel: "debug",
    region: "eu-west-1",
  });
  try {
    await bd.connect();
  } catch (err) {
    console.error("Failed to connect to BoilingData!");
    console.error(err?.message);
    process.exit(1);
  }
  console.log("Koa started on port", HTTP_PORT);
});
// const httpsServer = https.createServer(app.callback()).listen(HTTPS_PORT, HOST, async () => {
//   // BD connection
//   bd = new BoilingData({
//     username,
//     password,
//     globalCallbacks: undefined,
//     logLevel: "error",
//     region: "eu-west-1",
//   });
//   try {
//     await bd.connect();
//   } catch (err) {
//     console.error("Failed to connect to BoilingData!");
//     console.error(err?.message);
//     process.exit(1);
//   }
//   console.log("Koa started on port", HTTPS_PORT);
// });
