#!/usr/bin/env node
import Koa = require("koa");
import * as config from "./config";
import * as jwt from "./jwt";
import { join } from "path";
import sendFile from "./serve";

const gitignoreParser = require("gitignore-parser");

async function init() {
  // Make sure we have all config settings
  if (!process.env.PORT) {
    throw new Error("The port should be specified in env.PORT");
  }

  if (!process.env.CONFIG_DIR) {
    throw new Error(
      "The configuration directory should be specified in env.CONFIG_DIR"
    );
  }

  // Load all configs
  const configDir = process.env.CONFIG_DIR;
  const jwtConfig = require(join(configDir, "jwt.js"));
  const appConfig = require(join(configDir, "config.js"));

  // Init utils
  jwt.init(jwtConfig);
  config.init(appConfig);

  // Start app
  var app = new Koa();
  app.use(sendFile);

  const port = process.env.PORT;
  app.listen(parseInt(port));

  console.log(`listening on port ${port}`);
}

init();
