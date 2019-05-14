import { Context } from "koa";
import { verify } from "./jwt";
import { get as getConfig } from "./config";
import { join } from "path";

function invalidPath(ctx: Context) {
  ctx.status = 400;
  ctx.body = "Invalid path.";
}

export default async function sendFile(ctx: Context) {
  return ctx.path.indexOf("..") !== -1
    ? invalidPath(ctx)
    : await (async () => {
        const config = getConfig();

        // First we gotta see if the requested path is publicly accessible
        const joinedPath = join(config.root, ctx.path);

        // Make sure the joined path falls under root.
        // It should anyway (due to prior checks), but we can't be wrong here.
        const isSafeAccess = joinedPath.startsWith(config.root);

        return !isSafeAccess
          ? invalidPath(ctx)
          : await (async () => {
              // Is this publicly accessible?
              const relativePath = joinedPath.replace(config.root, "");
              const isInRoot = relativePath.split("/").length === 1;

              // accessible resources = publicly accessible + token based
              


              // Do we have public access defined?
              return config.public && isPubliclyAccessible(ctx.path) ? 


              const token: string = ctx.header["jwt-auth-service-token"];

              if (!token) {
                ctx.status = 400;
                ctx.body = "Missing token.";
              }

              const decodedToken = verify(token);

              if (decodedToken.valid) {
                const { username, permissions } = decodedToken.value;
              } else {
                const evalArgs = {
                  username,
                  permissions,
                  root: config.root
                };
              }
            })();
      })();
}

function isPubliclyAccessible(requestedPath: string): boolean {
  return false;
}

async function processRoot() {}

async function processDirectory() {}
