import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";

import { BoilingData } from "@boilingdata/node-boilingdata";

const app = new Koa();
const router = new Router();
let bd: BoilingData;

const username = process.env["BD_USERNAME"];
const password = process.env["BD_PASSWORD"];
if (!password || !username) throw new Error("Set BD_USERNAME and BD_PASSWORD envs");

interface IStatement {
  statement: string;
}

router.get("/healthcheck", async (ctx, next) => {
  ctx.status = 200;
  await next();
});

// Pass SQL to BD and the response back
router.post("/", async (ctx, next) => {
  console.log(ctx.request.body);
  const b = <IStatement>ctx.request.body;
  const resp = await bd.execQueryPromise({
    sql: b.statement,
    requestId: `${(Math.random() * 10000).toFixed(0)}`,
  });
  ctx.body = JSON.stringify(resp);
  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// start
app.listen(3000, async () => {
  // BD connection
  bd = new BoilingData({
    username,
    password,
    globalCallbacks: undefined,
    logLevel: "error",
    autoStatus: false,
    region: "eu-west-1",
  });
  await bd.connect();
  console.log("Koa started");
});