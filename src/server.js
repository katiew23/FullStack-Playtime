import dotenv from "dotenv";
import Joi from "joi";
import Cookie from "@hapi/cookie";
import { accountsController } from "./controllers/accounts-controller.js";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-route.js";
import { db } from "./models/db.js";

const result = dotenv.config({ path: process.cwd() + "/.env" });
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({ port: 3000, host: "localhost" });

  await server.register(Vision);
  await server.register(Cookie);

  server.validator(Joi);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME || "playtime",
      password: process.env.COOKIE_PASSWORD || "12345678901234567890123456789012",
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  db.init("mongo");
  server.route(webRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
