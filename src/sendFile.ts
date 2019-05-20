import { Context } from "koa";
import { verify } from "./jwt";
import { get as getConfig } from "./config";
import { join } from "path";
import { lstat } from "fs";


// validate x => x < 1000, y => y < 1000
function addSmallNumbers(x: number, y: number) {
  validate(() => x.endsWith("/"));
}

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
        const isInsideRootDir = joinedPath.startsWith(config.root);

        return !isInsideRootDir
          ? invalidPath(ctx)
          : await (async () => {
              /*
                Check if this is a file directly on root.
              */
              const relativePath = joinedPath.replace(config.root, "");
              const isChildOfRoot = relativePath.split("/").length === 1;
              return isChildOfRoot
                ? await (async ctx => {
                    // Is this a file?
                    // If it's a file check if there are root privileges.
                    const stat = await lstat();
                  })()
                : 1;

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

async function isFileImmediatelyUnderRoot(path: string, currentDir: string): boolean {
  const isChildOfRoot = path.split("/").length === 1;
  return isChildOfRoot
    ? await (async () => {
      // Check if the single item we got is a file or a dir

    })()
    : 
}

function isPubliclyAccessible(requestedPath: string): boolean {
  return false;
}

async function processRoot() {}

async function processDirectory() {}
